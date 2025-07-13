package no.parksync.parksync_application

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothManager
import android.content.BroadcastReceiver
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.ServiceConnection
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.util.Log
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import io.flutter.embedding.android.FlutterActivity
import io.flutter.plugin.common.MethodCall
import io.flutter.plugin.common.MethodChannel
import net.posprinter.posprinterface.IMyBinder
import net.posprinter.posprinterface.ProcessData
import net.posprinter.posprinterface.TaskCallback
import net.posprinter.service.PosprinterService
import net.posprinter.utils.BitmapProcess
import net.posprinter.utils.BitmapToByteData
import net.posprinter.utils.DataForSendToPrinterPos80
import net.posprinter.utils.StringUtils


class MainActivity: FlutterActivity() {
    private lateinit var binder: IMyBinder
    private var mBound: Boolean = false
    private var isConnected: Boolean = false
    private var bluetoothAdapter: BluetoothAdapter? = null

    private val btList: MutableList<Map<String, String>> = mutableListOf()
    private val btFoundList: MutableList<String> = mutableListOf()
    private val REQUEST_BLUETOOTH_PERMISSIONS = 1




    var conn: ServiceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName, service: IBinder) {
            Log.d("posprinter", "Binder started")
            binder = service as IMyBinder
            mBound = true
            Log.d("posprinter", "Binder was set")
        }

        override fun onServiceDisconnected(name: ComponentName) {
            Log.d("posprinter", "Binder disconnected")
            mBound = false
            isConnected = false
        }
    }

    override fun onStart() {
        super.onStart()
        Intent(this, PosprinterService::class.java).also { intent ->
            bindService(intent, conn, Context.BIND_AUTO_CREATE)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        MethodChannel(flutterEngine!!.dartExecutor.binaryMessenger, PrinterConstants.channel)
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    PrinterConstants.printerConnectCommand -> connectPrinter(call, result)
                    PrinterConstants.getPrinterStatusCommand -> getPrinterStatus(result)
                    PrinterConstants.printerDisconnectCommand -> disconnectPrinter(result)
                    PrinterConstants.getConnectionState -> getConnectionState(result)
                    PrinterConstants.printViolationTicket -> printViolationTicket(call,result)
                    PrinterConstants.checkBluetoothAdapter -> checkBluetoothAdapter(result)
                    PrinterConstants.searchBluetoothDevices -> searchBluetoothDevices(result)
                    PrinterConstants.getPairedBluetoothDevices -> getPairedBluetoothDevices(result)
                    else -> result.notImplemented()
                }
            }
    }

    private fun connectPrinter(call: MethodCall, result: MethodChannel.Result) {
        val mac = call.argument<String?>("mac")
        if (mac.equals(null) || mac.equals("")){
            Toast.makeText(applicationContext, "Mac Address cannot be null or empty", Toast.LENGTH_SHORT).show();
            result.error("mac_address_error", "Invalid Mac Address", "")
        }

        checkBluetoothAdapter(result)

        binder.ConnectBtPort(
            mac,
            object: TaskCallback{
                override fun OnFailed() {
                    result.error("x", "Failed to connect", "")
                }

                override fun OnSucceed() {
                    result.success("Connected")
                    isConnected = true
                }
            }
        )
    }


    private fun getPrinterStatus(result: MethodChannel.Result) {
        val printerStatus = binder.GetPrinterStatus()
        result.success(
            mapOf(
                "is_offline" to printerStatus.offline,
                "is_cover_open" to printerStatus.coverOpen,
                "is_receipt_paper_empty" to printerStatus.receiptPaperEmpty,
                "is_receipt_paper_near_empty" to printerStatus.receiptPaperNearEmptyInner,
                "has_error" to printerStatus.error
            )
        )
    }

    private fun disconnectPrinter(result: MethodChannel.Result) {
        if(!isConnected){
            result.error("not_connected_error", "No Connected printer to disconnect from", "")
        }

        binder.DisconnectCurrentPort(
            object: TaskCallback{
                override fun OnFailed() {

                }

                override fun OnSucceed() {

                }
            }
        )

    }

    private fun getConnectionState(result: MethodChannel.Result) {
        result.success(isConnected)
    }

    private fun printViolationTicket(call: MethodCall, result: MethodChannel.Result) {
        if (!isConnected) {
            result.error("connection_error", "No Printer is connected", "")
            return
        }

        val bytes = call.argument<ByteArray>("bytes")

        if(bytes == null){
            result.error("bytes_missing", "Image Bytes is required", "")
            return
        }

        val originalBitmap = BitmapProcess.compressBmpByYourWidth(
            BitmapFactory.decodeByteArray(
                bytes,
                0,
                bytes.size
            ), 360
        )
        val bitmapList: MutableList<Bitmap> = BitmapProcess.cutBitmap(120, originalBitmap)




        binder.WriteSendData(
            object : TaskCallback {
                override fun OnFailed() {
                    result.error("print_error", "Failed to print", "")
                }

                override fun OnSucceed() {
                    result.success("Printed Successfully")
                }
            },
            object : ProcessData {
                override fun processDataBeforeSend(): MutableList<ByteArray> {
                    val list: MutableList<ByteArray> = mutableListOf()

                    list.add(DataForSendToPrinterPos80.initializePrinter())

                    for (bitmap in bitmapList) {
                        list.add(
                            DataForSendToPrinterPos80.printRasterBmp(
                                0,
                                bitmap,
                                BitmapToByteData.BmpType.Dithering,
                                BitmapToByteData.AlignType.Center,
                                360
                            )
                        )
                    }
                    list.add(DataForSendToPrinterPos80.printAndFeedForward(4))

                    return list
                }
            }
        )
    }


    private fun checkBluetoothAdapter(result: MethodChannel.Result) {
        bluetoothAdapter = (this.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager).adapter
        if (!bluetoothAdapter?.isEnabled!!) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (ActivityCompat.checkSelfPermission(
                        this,
                        Manifest.permission.BLUETOOTH_CONNECT
                    ) != PackageManager.PERMISSION_GRANTED
                ) {

                    return
                }
            }
            //request grant
            val intent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
            startActivityForResult(intent, 1)
        }
    }

    private fun getPairedBluetoothDevices(result: MethodChannel.Result) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.BLUETOOTH_CONNECT
                ) != PackageManager.PERMISSION_GRANTED
            ) {

                return
            }
        }
        val device = bluetoothAdapter!!.getBondedDevices()
        btList.clear();

        if (device.size > 0) {
            //There are already paired Bluetooth devices
            val it: Iterator<BluetoothDevice> = device.iterator()
            while (it.hasNext()) {
                val btd = it.next()
                btList.add(
                    mapOf(
                        "name" to btd.name,
                        "address" to btd.address
                    )
                )
            }
        }

        result.success(btList)
    }

    private fun searchBluetoothDevices(result: MethodChannel.Result) {
        bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
        if (bluetoothAdapter == null) {
            result.error("NO_BLUETOOTH", "Device does not support Bluetooth", null)
            return
        }

        if (!bluetoothAdapter!!.isEnabled) {
            result.error("BLUETOOTH_DISABLED", "Bluetooth is disabled", null)
            return
        }

        // Check permissions
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.BLUETOOTH_CONNECT, Manifest.permission.BLUETOOTH_SCAN), REQUEST_BLUETOOTH_PERMISSIONS)
                return
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), REQUEST_BLUETOOTH_PERMISSIONS)
                return
            }
        }



        val foundDevices = mutableListOf<Map<String, String>>()
        val receiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                if (BluetoothDevice.ACTION_FOUND == intent.action) {
                    val device: BluetoothDevice? = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)
                    device?.let {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                            // only for gingerbread and newer versions
                            if (ActivityCompat.checkSelfPermission(applicationContext, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
                                return;
                            }
                        }

                        val deviceInfo = mapOf("name" to (it.name ?: "Unknown"), "address" to it.address)
                        foundDevices.add(deviceInfo)
                    }
                }
            }
        }

        val filter = IntentFilter(BluetoothDevice.ACTION_FOUND)
        registerReceiver(receiver, filter)

        if(bluetoothAdapter!!.isDiscovering){
            bluetoothAdapter!!.cancelDiscovery()
            bluetoothAdapter!!.startDiscovery()
        }

        // Wait for discovery to finish (12 seconds by default)
        Thread {
            try {
                Thread.sleep(4000)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            } finally {
                bluetoothAdapter!!.cancelDiscovery()
                unregisterReceiver(receiver)
                runOnUiThread {
                    result.success(foundDevices)
                }
            }
        }.start()
    }


    private fun printText(text: String) {
        binder.WriteSendData(
            object: TaskCallback{
                override fun OnFailed() {

                }

                override fun OnSucceed() {

                }
            },
            object: ProcessData{
                override fun processDataBeforeSend(): MutableList<ByteArray> {
                    val list: MutableList<ByteArray> = mutableListOf()
                    list.add(DataForSendToPrinterPos80.initializePrinter());
                    list.add(DataForSendToPrinterPos80.selectOrCancelBoldModel(1));
                    list.add(StringUtils.strTobytes(text));
                    list.add(DataForSendToPrinterPos80.printAndFeedForward(10));
                    printCut();
                    return list;
                }
            }
        )
    }

    private fun printBarcode(call: MethodCall, result: MethodChannel.Result){
        if(isConnected){
            val barcodeValue: String? = call.argument("barcode_value")

            if(barcodeValue == null){
                result.error("barcode_data_missing", "Barcode data is missing", "")
                return
            }

            binder.WriteSendData(
                object: TaskCallback{
                    override fun OnFailed() {

                    }

                    override fun OnSucceed() {

                    }
                },
                object: ProcessData {
                    override fun processDataBeforeSend(): MutableList<ByteArray> {
                        val list: MutableList<ByteArray> = mutableListOf()
                        list.add(DataForSendToPrinterPos80.initializePrinter())
                        list.add(DataForSendToPrinterPos80.selectAlignment(1))
                        list.add(DataForSendToPrinterPos80.selectHRICharacterPrintPosition(2))
                        list.add(DataForSendToPrinterPos80.setBarcodeWidth(2))
                        list.add(DataForSendToPrinterPos80.setBarcodeHeight(80))
                        list.add(DataForSendToPrinterPos80.printBarcode(73, 10, "{B12345678"))
                        list.add(DataForSendToPrinterPos80.printAndFeedLine())
                        printCut()
                        return list
                    }
                }
            )
        }
    }

    private fun printQrcode(call: MethodCall, result: MethodChannel.Result){
        if(isConnected){
            val qrcodeValue: String? = call.argument("qrcode_value")

            if(qrcodeValue == null){
                result.error("qrcode_data_missing", "Qrcode data is missing", "")
                return
            }

            binder.WriteSendData(
                object: TaskCallback{
                    override fun OnFailed() {

                    }

                    override fun OnSucceed() {

                    }
                },
                object: ProcessData{
                    override fun processDataBeforeSend(): MutableList<ByteArray> {
                        val list: MutableList<ByteArray> = mutableListOf()
                        list.add(DataForSendToPrinterPos80.initializePrinter());
                        //align type
                        list.add(DataForSendToPrinterPos80.selectAlignment(1));
                        list.add(DataForSendToPrinterPos80.printQRcode(3,48,"print test"));
                        //Log.e( "processDataBeforeSend: ", StringUtils.bytes2HexString(DataForSendToPrinterPos80.printQRcode(3,48,"print test")));
                        list.add(DataForSendToPrinterPos80.printAndFeedLine());
                        printCut();
                        return  list
                    }
                }
            )
        }
    }

    private fun printCut() {
        if(isConnected){
            binder.WriteSendData(
                object: TaskCallback {
                    override fun OnFailed() {
                        TODO("Not yet implemented")
                    }

                    override fun OnSucceed() {
                        TODO("Not yet implemented")
                    }
                },

                object: ProcessData {
                    override fun processDataBeforeSend(): MutableList<ByteArray> {
                        val list: MutableList<ByteArray> = mutableListOf()
                        list.add(DataForSendToPrinterPos80.initializePrinter())
                        list.add(DataForSendToPrinterPos80.selectCutPagerModerAndCutPager(0x42,0x66));
                        return list
                    }
                }
            )
        }
    }

    private fun printBitmap() {
        if(isConnected){

            val bitmap = BitmapProcess.compressBmpByYourWidth(
                BitmapFactory.decodeResource(resources, R.drawable.parksync), 300
            )


            binder.WriteSendData(
                object: TaskCallback{
                    override fun OnFailed() {

                    }

                    override fun OnSucceed() {

                    }
                },
                object: ProcessData {
                    override fun processDataBeforeSend(): MutableList<ByteArray> {
                        val list: MutableList<ByteArray> = mutableListOf()

                        list.add(DataForSendToPrinterPos80.initializePrinter());
                        var bitmapList: MutableList<Bitmap> = BitmapProcess.cutBitmap(150,bitmap);


                        for(i in bitmapList.indices){
                            list.add(
                                DataForSendToPrinterPos80.printRasterBmp(0,
                                    bitmapList[i], BitmapToByteData.BmpType.Dithering, BitmapToByteData.AlignType.Center,576)
                            )
                        }

                        list.add(DataForSendToPrinterPos80.printAndFeedLine())

                        return  list
                    }
                }
            )
        }
    }

    override fun onDestroy() {
        unbindService(conn)
        mBound = false
        isConnected = false
        bluetoothAdapter = null
        btList.clear()
        btFoundList.clear()
        mBound = false
        super.onDestroy()
    }
}
