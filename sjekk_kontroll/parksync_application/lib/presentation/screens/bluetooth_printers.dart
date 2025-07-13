// import 'dart:async';


// import 'package:flutter/material.dart';

// class BluetoothPrinters extends StatefulWidget {
//   const BluetoothPrinters({super.key});

//   @override
//   State<BluetoothPrinters> createState() => _BluetoothPrintersState();
// }

// class _BluetoothPrintersState extends State<BluetoothPrinters> {
//   BluetoothPrint bluetoothPrint = BluetoothPrint.instance;
//   BluetoothDevice? _device;

//   @override
//   void initState() {
//     super.initState();
//     bluetoothPrint.startScan(timeout: Duration(seconds: 4));
//   }

//   @override
//   void dispose() {
//     _disconnect();
//     super.dispose();
//   }

//   Future<void> _disconnect() async {
//     if (_device != null) {
//       await bluetoothPrint.disconnect();
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Expanded(
//           child: StreamBuilder<List<BluetoothDevice>>(
//             stream: bluetoothPrint.scanResults,
//             initialData: [],
//             builder: (c, snapshot) => Column(
//               children: snapshot.data!
//                   .map((d) => ListTile(
//                         title: Text(d.name ?? ''),
//                         subtitle: Text(d.address.toString()),
//                         onTap: () async {
//                           setState(() {
//                             _device = d;
//                           });

//                           await bluetoothPrint.connect(_device!);
//                         },
//                         trailing: _device != null && _device?.address.toString() == d.address
//                             ? Icon(
//                                 Icons.check,
//                                 color: Colors.green,
//                               )
//                             : null,
//                       ))
//                   .toList(),
//             ),
//           ),
//         ),
//         ElevatedButton(
//           onPressed: _device != null
//               ? () async {


//                 }
//               : null,
//           child: Text('PPrint'),
//         ),
//       ],
//     );
//   }
// }
