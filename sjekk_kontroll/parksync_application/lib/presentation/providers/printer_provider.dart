import 'package:flutter/material.dart';
import 'package:parksync_application/data/models/printer/printer_model.dart';
import 'package:parksync_application/data/repositories/local/printer_repositories.dart';

import '../../core/services/printer_service.dart';
import '../../data/models/printer/bluetooth_device.dart';

class PrinterProvider extends ChangeNotifier {
  List<Printer> printers = [];
  bool errorState = false;
  String errorMessage = '';
  
  final PrinterRepository _printerRepository = PrinterRepository();

  
  Printer? connectedPrinter;
  List<BluetoothDevice> pairedDevices = [];
  List<BluetoothDevice> scannedDevices = [];

  Future<void> getPairedDevices() async {
    pairedDevices = await PrinterService.instance.getPairedBluetoothDevices();
    notifyListeners();
  }

  Future<void> getScannedDevices() async {
    scannedDevices = await PrinterService.instance.searchBluetoothDevices();
    notifyListeners();
  }



  Future<void> setConnectedPrinter(Printer printer) async{
    await PrinterService.instance.connectToPrinter(printer: printer);
    connectedPrinter = printer;
    notifyListeners();
  }

  Future<void> disconnectPrinter () async {
    await PrinterService.instance.disconnectPrinter();

    connectedPrinter = null;
    notifyListeners();
  }

  clear() {
    errorMessage = '';
    errorState = false;
  }

  pushPrinter(Printer printer) {
    printers.add(printer);
    notifyListeners();
  }

  createPrinter({ required String address, required String name }) async {
    try {
      Printer printer = await _printerRepository.createPrinter(address: address, name: name);
      pushPrinter(printer);
      clear();
    } catch (error) {
      errorMessage = error.toString();
      errorState = true;
    }

    notifyListeners();
  }

  getAllPrinters() async {
    try {
      printers = await _printerRepository.getAllPrinters();
    } catch (e) {
      errorState = true;
      errorMessage = e.toString();
    }

    notifyListeners();
  }

  deletePrinter(int? printer) async {
    await _printerRepository.deletePrinter(printer!);

    printers = printers.where((p) {
      return p.id != printer;
    }).toList();
    notifyListeners();
  }
  
  @override
  void dispose() {
    scannedDevices = [];
    pairedDevices = [];
    connectedPrinter = null;
    printers = [];
    errorState = false;
    errorMessage = '';
    
    super.dispose();
  }
}
