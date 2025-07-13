import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/printer_constants.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/printer/bluetooth_device.dart';
import 'package:parksync_application/data/models/printer/printer_model.dart';
import 'package:parksync_application/data/models/printer/printer_status.dart';
import 'package:parksync_application/data/repositories/local/cache_repository.dart';
import 'package:parksync_application/presentation/providers/printer_provider.dart';

class PrinterService {
  static PrinterService? _instance;
  final MethodChannel _channel = const MethodChannel(PrinterConstants.nativeChannelName);

  PrinterService._();

  static PrinterService get instance {
    _instance ??= PrinterService._();
    return _instance!;
  }

  Future<void> connectToPrinter({ required Printer printer }) async {
    try{
      await _channel.invokeMethod(PrinterConstants.connectPrinterCommand, {
        'mac': printer.address
      });

      await CacheRepository.instance.set('current_connected_printer', jsonEncode(printer.toJson()));
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<void> connectToLastPairedPrinter(BuildContext context) async {
    try{
      String? currentConnectedPrinter = await CacheRepository.instance.get('current_connected_printer');

      if(currentConnectedPrinter != null){
        Printer printer = Printer.fromJson(
          jsonDecode(currentConnectedPrinter),
        );

        await _channel.invokeMethod(PrinterConstants.connectPrinterCommand, {
          'mac': printer.address
        });

        context.read<PrinterProvider>().connectedPrinter = printer;
      }

    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<void> disconnectPrinter() async {
    try{
      await _channel.invokeMethod(PrinterConstants.disconnectPrinterCommand);
    } on PlatformException catch (e) {
      perror(e.message);
    }
  }

  Future<PrinterStatus> getPrinterStatus() async {
    try{
      final Map<String, bool> data = await _channel.invokeMethod(PrinterConstants.getPrinterStatusCommand);
      return PrinterStatus.fromJson(data);
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<void> printViolationTicket(Uint8List imageBytes) async {
    try{
      await _channel.invokeMethod(PrinterConstants.printViolationTicket, {
        'bytes': imageBytes
      });
    } on PlatformException catch (e) {
      perror(e.message);

      rethrow;
    }
  }
  
  Future checkBluetoothAdapter() async {
    try{
      await _channel.invokeMethod(PrinterConstants.checkBluetoothAdapter);
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<bool> getConnectionStatus() async {
    try{
      final bool connection = await _channel.invokeMethod(PrinterConstants.getConnectionStateCommand);
      return connection;
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<List<BluetoothDevice>> searchBluetoothDevices() async {
    try{
      final List result = await _channel.invokeMethod(PrinterConstants.searchBluetoothDevices);
      final List<BluetoothDevice> bluetoothDevices = result.map((e) => BluetoothDevice.fromJson(e)).toList();
      return bluetoothDevices;
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }

  Future<List<BluetoothDevice>> getPairedBluetoothDevices() async {
    try{
      final List result = await _channel.invokeMethod(PrinterConstants.getPairedBluetoothDevices);
      final List<BluetoothDevice> bluetoothDevices = result.map((e) => BluetoothDevice.fromJson(e)).toList();

      return bluetoothDevices;
    } on PlatformException catch (e) {
      perror(e.message);
      rethrow;
    }
  }
}