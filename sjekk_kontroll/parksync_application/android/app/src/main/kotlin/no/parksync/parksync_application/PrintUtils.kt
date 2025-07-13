package no.parksync.parksync_application

import android.content.res.Resources
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.media.ThumbnailUtils
import android.util.Log
import com.android.print.sdk.Barcode
import com.android.print.sdk.CanvasPrint
import com.android.print.sdk.FontProperty
import com.android.print.sdk.PrinterConstants
import com.android.print.sdk.PrinterInstance
import com.android.print.sdk.PrinterType
import com.printer.sdk.utils.Utils
import com.printer.sdk.utils.XLog
import java.io.ByteArrayOutputStream

class PrintUtils {
    fun convertGreyImgByFloyd(img: Bitmap): Bitmap {
        val width = img.getWidth()
        //获取位图的宽
        val height = img.getHeight()
        //获取位图的高 \
        val pixels = IntArray(width * height)
        //通过位图的大小创建像素点数组
        img.getPixels(pixels, 0, width, 0, 0, width, height)
        val gray = IntArray(height * width)
        for (i in 0 until height) {
            for (j in 0 until width) {
                val grey = pixels[width * i + j]
                val red = grey and 0x00FF0000 shr 16
                gray[width * i + j] = red
            }
        }
        var e = 0
        for (i in 0 until height) {
            for (j in 0 until width) {
                val g = gray[width * i + j]
                if (g >= 128) {
                    pixels[width * i + j] = -0x1
                    e = g - 255
                } else {
                    pixels[width * i + j] = -0x1000000
                    e = g - 0
                }
                if (j < width - 1 && i < height - 1) {
                    //右边像素处理
                    gray[width * i + j + 1] += 3 * e / 8
                    //下
                    gray[width * (i + 1) + j] += 3 * e / 8
                    //右下
                    gray[width * (i + 1) + j + 1] += e / 4
                } else if (j == width - 1 && i < height - 1) {
                    //靠右或靠下边的像素的情况
                    //下方像素处理
                    gray[width * (i + 1) + j] += 3 * e / 8
                } else if (j < width - 1 && i == height - 1) {
                    //右边像素处理
                    gray[width * i + j + 1] += e / 4
                }
            }
        }
        val mBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565)
        mBitmap.setPixels(pixels, 0, width, 0, 0, width, height)
        return mBitmap
    }

    companion object {
        fun printLabelText(mPrinter: PrinterInstance) {
            mPrinter.init()
            Log.e("TAG", "printLabelText:example_text ")

            try {
                val stringBuffer = StringBuffer()

                // Create the TSPL command with the specified template
                stringBuffer.append("SIZE 80 mm, 220 mm\n")
                stringBuffer.append("GAP 3 mm, 0 mm\n")
                stringBuffer.append("DIRECTION 1\n")
                stringBuffer.append("CLS\n")

                // Add barcode
                stringBuffer.append("BARCODE 20, 20, \"128\", 100, 1, 0, 2, 2, \"946446\"\n")

                // Add text fields
                stringBuffer.append("TEXT 20, 150, \"3\", 0, 1, 1, \"Org. nr: 9464646\"\n")
                stringBuffer.append("BAR 0, 180, 575, 2\n")
                stringBuffer.append("TEXT 20, 190, \"3\", 0, 1, 1, \"Sjekk Control Packet\"\n")
                stringBuffer.append("BAR 0, 220, 575, 2\n")
                stringBuffer.append("TEXT 20, 230, \"3\", 0, 1, 1, \"Blankettnr: 7168699\"\n")
                stringBuffer.append("TEXT 20, 260, \"3\", 0, 1, 1, \"Note\"\n")
                stringBuffer.append("BAR 0, 290, 575, 2\n")
                stringBuffer.append("TEXT 20, 300, \"3\", 0, 1, 1, \"This is a sample note content.\"\n")
                stringBuffer.append("TEXT 20, 330, \"3\", 0, 1, 1, \"Fra: 06.06.2024 09:27\"\n")
                stringBuffer.append("TEXT 20, 360, \"3\", 0, 1, 1, \"Til: 06.06.2024 09:37\"\n")
                stringBuffer.append("TEXT 20, 390, \"3\", 0, 1, 1, \"Levert: Hand\"\n")
                stringBuffer.append("TEXT 20, 420, \"3\", 0, 1, 1, \"Betijent: PN171\"\n")
                stringBuffer.append("TEXT 20, 450, \"3\", 0, 1, 1, \"Car Info\"\n")
                stringBuffer.append("BAR 0, 480, 575, 2\n")
                stringBuffer.append("TEXT 20, 490, \"3\", 0, 1, 1, \"land: Norway - No\"\n")
                stringBuffer.append("TEXT 20, 520, \"3\", 0, 1, 1, \"brand: BMW\"\n")
                stringBuffer.append("TEXT 20, 550, \"3\", 0, 1, 1, \"plate: CV89558\"\n")
                stringBuffer.append("TEXT 20, 580, \"3\", 0, 1, 1, \"type: KJORETOY\"\n")
                stringBuffer.append("TEXT 20, 610, \"3\", 0, 1, 1, \"color: Red\"\n")
                stringBuffer.append("TEXT 20, 640, \"3\", 0, 1, 1, \"Sted\"\n")
                stringBuffer.append("BAR 0, 670, 575, 2\n")
                stringBuffer.append("TEXT 20, 680, \"3\", 0, 1, 1, \"Oslo\"\n")
                stringBuffer.append("TEXT 20, 710, \"3\", 0, 1, 1, \"Ticket Info\"\n")
                stringBuffer.append("BAR 0, 740, 575, 2\n")
                stringBuffer.append("TEXT 20, 750, \"3\", 0, 1, 1, \"total: 660 Kr.\"\n")
                stringBuffer.append("TEXT 20, 780, \"3\", 0, 1, 1, \"paid to: Sjekk Kontroll\"\n")
                stringBuffer.append("TEXT 20, 810, \"3\", 0, 1, 1, \"account: 6005 06 02349\"\n")
                stringBuffer.append("TEXT 20, 840, \"3\", 0, 1, 1, \"KID: 0048048334\"\n")
                stringBuffer.append("TEXT 20, 870, \"3\", 0, 1, 1, \"date: 06.06.2024\"\n")
                stringBuffer.append("TEXT 20, 900, \"3\", 0, 1, 1, \"IBAN: No36 6005 06 02349\"\n")
                stringBuffer.append("TEXT 20, 930, \"3\", 0, 1, 1, \"SWIFT: NDEANOKK\"\n")
                stringBuffer.append("TEXT 20, 960, \"3\", 0, 1, 1, \"NOTIFICATION\"\n")
                stringBuffer.append("BAR 0, 990, 575, 2\n")
                stringBuffer.append("TEXT 20, 1000, \"3\", 0, 1, 1, \"lorem string with 20 words\"\n")
                stringBuffer.append("TEXT 20, 1030, \"3\", 0, 1, 1, \"Hjemmel for handheving\"\n")
                stringBuffer.append("BAR 0, 1060, 575, 2\n")
                stringBuffer.append("TEXT 20, 1070, \"3\", 0, 1, 1, \"lorem string with 20 words\"\n")
                stringBuffer.append("TEXT 20, 1100, \"3\", 0, 1, 1, \"Betalingsanvar\"\n")
                stringBuffer.append("BAR 0, 1130, 575, 2\n")
                stringBuffer.append("TEXT 20, 1140, \"3\", 0, 1, 1, \"lorem string with 20 words\"\n")
                stringBuffer.append("TEXT 20, 1170, \"3\", 0, 1, 1, \"Klage\"\n")
                stringBuffer.append("BAR 0, 1200, 575, 2\n")
                stringBuffer.append("TEXT 20, 1210, \"3\", 0, 1, 1, \"lorem string with 20 words\"\n")
                stringBuffer.append("TEXT 20, 1240, \"3\", 0, 1, 1, \"For more information, visit https://client.gensolv.no\"\n")

                // Add QR code
                stringBuffer.append("QRCODE 20, 1270, L, 5, A, 0, \"https://client.gensolv.no\"\n")
                stringBuffer.append("PRINT 1\n")

                val s = stringBuffer.toString()
                Log.e("PrintUtils", "s=\n$s")
                val tmp = s.toByteArray(charset("GBK"))
                mPrinter.sendByteData(tmp)
            } catch (e: Exception) {
                e.printStackTrace()
                Log.e("PrintUtils", "<---exiect error --->")
            }
        }


        fun printText(text: String?, mPrinter: PrinterInstance) {
            mPrinter.init()
            mPrinter.printText(text)
            // 换行
            // mPrinter.setPrinter(Command.PRINT_AND_NEWLINE);
            mPrinter.setPrinter(PrinterConstants.Command.PRINT_AND_WAKE_PAPER_BY_LINE, 2) // 换2行
        }

        fun printImage(resources: Resources?, mPrinter: PrinterInstance) {
            object : Thread() {
                override fun run() {
                    super.run()
                    try {
                        Log.e("TAG", "标签图片打印 ->")
                        val bitmap = BitmapFactory.decodeResource(
                            resources,
                            R.drawable.parksync
                        )
                        //标签图片打印
                        mPrinter.init()
                        // 拼接数据
                        val bos = ByteArrayOutputStream()
                        //打印内容整理
                        bos.write(("SIZE " + 40 + " mm," + 30 + " mm\n").toByteArray())
                        bos.write("CLS\n".toByteArray())
                        val str =
                            "BITMAP " + 20 + "," + 20 + "," + bitmap.getWidth() / 8 + "," + bitmap.getHeight() + "," + 0 + ","
                        bos.write(str.toByteArray())
                        bos.write(
                            bitmap2PrinterBytes(
                                bitmap,
                                bitmap.getWidth() / 8,
                                bitmap.getHeight(),
                                2
                            )
                        )
                        bos.write("\n".toByteArray())
                        bos.write("PRINT 1,1\n".toByteArray())

                        //整合数据
                        bos.flush()
                        val tmp = bos.toByteArray()
                        bos.reset()
                        Log.e("TAG", "标签图片打印内容 =" + String(tmp))
                        mPrinter.sendByteData(tmp)
                    } catch (e: Exception) {
                        e.printStackTrace()
                        Log.e("PrintUtils", "<---exiect error --->")
                    }
                }
            }.start()


            /*普通图片打印
		mPrinter.init();
		Bitmap bitmap = BitmapFactory.decodeResource(resources,
				R.drawable.goodwork);

		// getCanvasImage方法获得画布上所画的图像,printImage方法打印图像.
		mPrinter.printText("Print Image:\n");
		if (isStylus) {
			//针打图形,第二个参数为0倍高倍宽， 为1只倍高
			mPrinter.printImageStylus(bitmap, 1);
		} else {
			mPrinter.printImage(bitmap);
		}

		mPrinter.setPrinter(Command.PRINT_AND_WAKE_PAPER_BY_LINE, 2); // 换2行*/
        }

        fun getPrintPictureCmd(bm: Bitmap): ByteArray {
            // 获得图像的宽和高
            val width = bm.getWidth()
            val height = bm.getHeight()

            // 获得原图的像素
            var pixR = 0
            var pixG = 0
            var pixB = 0

            // 定义像素数组
            val pixels = IntArray(width * height)
            val widArray = (width - 1) / 8 + 1 // 横向字节数
            val lenArray = widArray * height // 纵向点数
            val dataArray = ByteArray(lenArray + 8) // 定义一个变换后的数据数组
            dataArray[0] = 0x1D
            dataArray[1] = 0x76
            dataArray[2] = 0x30
            dataArray[3] = 0x00
            dataArray[4] = widArray.toByte() // xL
            dataArray[5] = (widArray / 256).toByte() // xH
            dataArray[6] = height.toByte()
            dataArray[7] = (height / 256).toByte()

            // 获得原图像素
            bm.getPixels(pixels, 0, width, 0, 0, width, height)
            var indexByte = 8
            dataArray[indexByte] = 0
            var indexBit = 0
            for (i in 0 until height) {
                for (j in 0 until width) { // 每一行进行转换，转换完成后，可能最后一个字节需要将数据移到高位
                    // 获取当前像素值的r部分
                    pixR = Color.red(pixels[i * width + j])
                    // 获取当前像素值的g部分
                    pixG = Color.green(pixels[i * width + j])
                    // 获取当前像素值的b部分
                    pixB = Color.blue(pixels[i * width + j])
                    // 一个临时的变量，保存变换后的值
                    // int temp = (int)(0.299*pixR + 0.587*pixG + 0.114*pixB + 0.5);
                    if (pixR + pixG + pixB < 384) {
                        dataArray[indexByte] = (dataArray[indexByte] + 0x01).toByte()
                    }
                    ++indexBit
                    if (indexBit < 8) {
                        dataArray[indexByte] = (dataArray[indexByte] * 2).toByte() // 相当于左移一位
                    } else {
                        indexBit = 0
                        ++indexByte
                        if (indexByte < lenArray) {
                            dataArray[indexByte] = 0
                        }
                    }
                }
                if (indexBit != 0) // 存在不完整字节，1－7有效位
                {
                    while (indexBit < 8) {
                        dataArray[indexByte] = (dataArray[indexByte] * 2).toByte() // 相当于左移一位
                        ++indexBit
                    }
                    indexBit = 0
                    ++indexByte
                    if (indexByte < lenArray) {
                        dataArray[indexByte] = 0
                    }
                }
            }
            return dataArray
        }

        fun printCustomImage(
            resources: Resources?,
            mPrinter: PrinterInstance, isStylus: Boolean, is58mm: Boolean
        ) {
            mPrinter.init()
            // TODO Auto-generated method stub
            val cp = CanvasPrint()
            /*
		 * 初始化画布，画布的宽度为变量，一般有两个选择： 1、58mm型号打印机实际可用是48mm，48*8=384px
		 * 2、80mm型号打印机实际可用是72mm，72*8=576px 因为画布的高度是无限制的，但从内存分配方面考虑要小于4M比较合适，
		 * 所以预置为宽度的5倍。 初始化画笔，默认属性有： 1、消除锯齿 2、设置画笔颜色为黑色
		 */
            // init 方法包含cp.initCanvas(550)和cp.initPaint(), T9打印宽度为72mm,其他为47mm.
            if (isStylus) {
                cp.init(PrinterType.T5)
            } else {
                if (is58mm) {
                    cp.init(PrinterType.TIII)
                } else {
                    cp.init(PrinterType.T9)
                }
            }

            // 非中文使用空格分隔单词
            cp.setUseSplit(true)
            //cp.setUseSplitAndString(true, " ");
            // 阿拉伯文靠右显示
            cp.setTextAlignRight(true)
            /*
		 * 插入图片函数: drawImage(float x, float y, String path)
		 * 其中(x,y)是指插入图片的左上顶点坐标。
		 */
            val fp = FontProperty()
            fp.setFont(false, false, false, false, 25, null)
            // 通过初始化的字体属性设置画笔
            cp.setFontProperty(fp)
            cp.drawText("Contains Arabic language:")
            // pg.drawText("温度的影响主要表现在两个方面温度的影响主要表现在两个方面温度的影响主要表现在两个方面温度的影响主要表现在两个方面");
            fp.setFont(false, false, false, false, 30, null)
            cp.setFontProperty(fp)
            cp.drawText("ومن تكهناته إيمانه بإستحالة قياس السرعة اللحظية للجسيمات متناهية الصغر والتي تهتز عشوائياً في مختلف الإتجاهات بما يعرف باسم الحركة البراونية، لكن بعد قرن من الزمان، تمكن عالم يدعى مارك رايزن من تفنيد هذه المقولة عملياً بمعمل أبحاثه بجامعة تكساس وإستطاع قياس السرعة اللحظية لتلك الجسيمات، في خضم إختباراته لقانون التوزع المتساوي الذي يقرر أن طاقة حركة الجسيم تعتمد على حرارته بشكل بحت وليس على على كتلته أو حجمه، ")
            cp.drawImage(
                BitmapFactory.decodeResource(
                    resources,
                    R.drawable.parksync
                )
            )
            mPrinter.printText("Print Custom Image:\n")
            if (isStylus) {
                //针打图形,第二个参数为0倍高倍宽， 为1只倍高
                mPrinter.printImageStylus(cp.canvasImage, 1)
            } else {
                mPrinter.printImage(cp.canvasImage)
            }
            mPrinter.setPrinter(PrinterConstants.Command.PRINT_AND_WAKE_PAPER_BY_LINE, 2)
        }

        fun printBarCode(mPrinter: PrinterInstance) {
            mPrinter.init()
            mPrinter.setCharacterMultiple(0, 0)
            /**
             * 设置左边距,nL,nH 设置宽度为(nL+nH*256)* 横向移动单位. 设置左边距对打印条码的注释位置有影响.
             */
            mPrinter.setLeftMargin(15, 0)
            // mPrinter.setPrinter(BluetoothPrinter.COMM_ALIGN,BluetoothPrinter.COMM_ALIGN_LEFT);
            /**
             * 参数1: 设置条码横向宽度 2<=n<=6,默认为2 参数2: 设置条码高度 1<=n<=255,默认162 参数3:
             * 设置条码注释打印位置.0不打印,1上方,2下方,3上下方均有,默认为0 参数4:
             * 设置条码类型.BluetoothPrinter.BAR_CODE_TYPE_ 开头的常量,默认为CODE128
             */
            var barcode: Barcode
            // upc_a 123456789012
            mPrinter.printText("UPC_A\n")
            barcode = Barcode(PrinterConstants.BarcodeType.UPC_A, 2, 150, 2, "123456789012")
            mPrinter.printBarCode(barcode)

            // upc-e暂时规则不知道。。。。
            // mPrinter.printText("UPC_E\n");
            // barcode = new Barcode(BarcodeType.UPC_E, 2, 150, 2, "123456");
            // mPrinter.printBarCode(barcode);
            mPrinter.printText("JAN13(EAN13)\n")
            barcode = Barcode(PrinterConstants.BarcodeType.JAN13, 2, 150, 2, "123456789012")
            mPrinter.printBarCode(barcode)

            // JAN8(EAN8) 1234567
            mPrinter.printText("JAN8(EAN8)\n")
            barcode = Barcode(PrinterConstants.BarcodeType.JAN8, 2, 150, 2, "1234567")
            mPrinter.printBarCode(barcode)

            // "CODE39"
            mPrinter.printText("CODE39\n")
            barcode = Barcode(PrinterConstants.BarcodeType.CODE39, 2, 150, 2, "123456")
            mPrinter.printBarCode(barcode)

            // ITF
            mPrinter.printText("ITF\n")
            barcode = Barcode(PrinterConstants.BarcodeType.ITF, 2, 150, 2, "123456")
            mPrinter.printBarCode(barcode)

            // CODABAR
            mPrinter.printText("CODABAR\n")
            barcode = Barcode(PrinterConstants.BarcodeType.CODABAR, 2, 150, 2, "123456")
            mPrinter.printBarCode(barcode)
            // CODE93
            mPrinter.printText("CODE93\n")
            barcode = Barcode(PrinterConstants.BarcodeType.CODE93, 2, 150, 2, "123456")
            mPrinter.printBarCode(barcode)

            // Code128
            mPrinter.printText("CODE128\n")
            barcode = Barcode(PrinterConstants.BarcodeType.CODE128, 2, 150, 2, "No.123456")
            mPrinter.printBarCode(barcode)

            // ========
            // "PDF417"
            mPrinter.printText("PDF417\n")
            barcode = Barcode(PrinterConstants.BarcodeType.PDF417, 2, 3, 6, "No.123456")
            mPrinter.printBarCode(barcode)
            // "DATAMATRIX"
            mPrinter.printText("DATAMATRIX\n")
            barcode = Barcode(PrinterConstants.BarcodeType.DATAMATRIX, 2, 3, 6, "No.123456")
            mPrinter.printBarCode(barcode)
            // "QRCODE"
            mPrinter.printText("QRCODE\n")
            barcode = Barcode(PrinterConstants.BarcodeType.QRCODE, 2, 3, 6, "No.123456")
            mPrinter.printBarCode(barcode)
            mPrinter.setPrinter(PrinterConstants.Command.PRINT_AND_WAKE_PAPER_BY_LINE, 1)
        }

        /**
         * 将彩色图转换为黑白图
         *
         * @return 返回转换好的位图
         */
        fun convertToBlackWhite(bmp: Bitmap): Bitmap {
            val width = bmp.getWidth() // 获取位图的宽
            val height = bmp.getHeight() // 获取位图的高
            val pixels = IntArray(width * height) // 通过位图的大小创建像素点数组
            bmp.getPixels(pixels, 0, width, 0, 0, width, height)
            val alpha = 0xFF shl 24
            for (i in 0 until height) {
                for (j in 0 until width) {
                    var grey = pixels[width * i + j]
                    val red = grey and 0x00FF0000 shr 16
                    val green = grey and 0x0000FF00 shr 8
                    val blue = grey and 0x000000FF
                    grey = (red * 0.3 + green * 0.59 + blue * 0.11).toInt()
                    grey = alpha or (grey shl 16) or (grey shl 8) or grey
                    pixels[width * i + j] = grey
                }
            }
            val newBmp = Bitmap.createBitmap(
                width,
                height,
                Bitmap.Config.RGB_565
            )
            newBmp.setPixels(pixels, 0, width, 0, 0, width, height)
            return ThumbnailUtils.extractThumbnail(newBmp, 380, 460)
        }

        fun bitmap2PrinterBytes(
            bmp: Bitmap,
            bmp_size_x: Int,
            bmp_size_y: Int,
            left: Int
        ): ByteArray {
            val sb = StringBuffer("")
            val imgbuf = ByteArray(bmp_size_x * bmp_size_y)
            val bitbuf = ByteArray(bmp_size_x)
            val p = IntArray(8)
            var s = 0
            for (y in 0 until bmp_size_y) {
                var x: Int
                x = 0
                while (x < bmp_size_x) {
                    var m: Int
                    m = 0
                    while (m < 8) {
                        if (bmp.getPixel(x * 8 + m, y) == -1) {
                            p[m] = 1
                        } else {
                            p[m] = 0
                        }
                        ++m
                    }
                    m =
                        p[0] * 128 + p[1] * 64 + p[2] * 32 + p[3] * 16 + p[4] * 8 + p[5] * 4 + p[6] * 2 + p[7]
                    bitbuf[x] = m.toByte()
                    ++x
                }
                x = 0
                while (x < bmp_size_x) {
                    imgbuf[s] = bitbuf[x]
                    sb.append(imgbuf[s].toInt())
                    ++s
                    ++x
                }
            }
            XLog.d("yxz", Utils.bytesToHexString(imgbuf, imgbuf.size))
            XLog.d("yxz", "imgbuf的长度为：----------------------------" + imgbuf.size)
            return imgbuf
        }
    }
}
