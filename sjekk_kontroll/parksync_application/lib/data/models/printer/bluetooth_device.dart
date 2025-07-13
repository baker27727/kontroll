class BluetoothDevice {
  final String name;
  final String address;

  BluetoothDevice({required this.name, required this.address});

  factory BluetoothDevice.fromJson(Map data) {
    return BluetoothDevice(name: data["name"], address: data["address"]);
  }
}
