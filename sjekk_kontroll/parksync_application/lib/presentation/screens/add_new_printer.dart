import 'package:bluetooth_print_plus/bluetooth_print_plus.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import 'package:bluetooth_print/bluetooth_print.dart';
// import 'package:bluetooth_print/bluetooth_print_model.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/presentation/providers/printer_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'dart:async';

class AddPrinterScreen extends StatefulWidget {
  const AddPrinterScreen({Key? key}) : super(key: key);

  @override
  _AddPrinterScreenState createState() => _AddPrinterScreenState();
}

class _AddPrinterScreenState extends State<AddPrinterScreen> {
  // BluetoothPrintPlus bluetoothPrint = BluetoothPrintPlus.;
  List<BluetoothDevice> scanResults = [];
  StreamSubscription<List<BluetoothDevice>>? _scanSubscription;

  @override
  void initState() {
    super.initState();
    startScan();
  }

  void startScan() async {
    try {
      BluetoothPrintPlus.startScan(timeout: Duration(seconds: 4));
      
      _scanSubscription = BluetoothPrintPlus.scanResults.listen((results) {
        setState(() {
          scanResults = results.where((r) => !context.read<PrinterProvider>().printers.map((printer) => printer.address).toList().contains(r.address)).toList();
        });
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  void dispose() {
    _scanSubscription?.cancel();
    BluetoothPrintPlus.stopScan();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Printer'.tr()),
      ),
      body: Column(
        children: [
          Expanded(
            child: scanResults.isEmpty
                ? Center(child: Text('No new printers found'.tr()))
                : ListView.builder(
                    itemCount: scanResults.length,
                    itemBuilder: (context, index) {
                      final result = scanResults[index];
                      return ListTile(
                        title: Text(result.name ?? 'Unknown Device'),
                        subtitle: Text(result.address ?? ''),
                        onTap: () async {
                          try {
                            if (result.address != null && result.name != null) {
                              await context.read<PrinterProvider>().createPrinter(
                                address: result.address!,
                                name: result.name!,
                              );
                              SnackbarUtils.showSnackbar(context, 'Printer added: ${result.name}'.tr());
                              Navigator.pop(context);
                            }
                          } catch (e) {
                            SnackbarUtils.showSnackbar(context, 'Failed to add printer'.tr(), type: SnackBarType.failure);
                          }
                        },
                      );
                    },
                  ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: NormalTemplateButton(
              onPressed: startScan,
              text: 'Rescan'.tr(),
              backgroundColor: primaryColor,
            ),
          ),
        ],
      ),
    );
  }
}
