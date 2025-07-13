import 'dart:async';

// import 'package:bluetooth_manager/bluetooth_manager.dart';
// import 'package:bluetooth_manager/models/bluetooth_models.dart';

class BluetoothService {
  // static BluetoothManager? bluetoothManager;
  static BluetoothService? _instance;

  // Private constructor to prevent external instantiation
  BluetoothService._();

  // Singleton instance getter
  static BluetoothService get instance {
    _instance ??= BluetoothService._();
    return _instance!;
  }


  setListener() async{
    // bluetoothManager = null;

    // bluetoothManager = BluetoothManager();
  }

  // Future<BluetoothState> getBluetoothState() async {
  //   return await bluetoothManager!.getBluetoothState();
  // }
}