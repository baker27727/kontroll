// import 'package:http/http.dart' as http;
// import 'package:camera/camera.dart';
// import 'package:flutter/foundation.dart';
// import 'package:flutter/material.dart';

// class AnprCamera extends StatefulWidget {
//   const AnprCamera({Key? key}) : super(key: key);

//   @override
//   State<AnprCamera> createState() => _AnprCameraState();
// }

// class _AnprCameraState extends State<AnprCamera> {
//   CameraController? _camera;
//   bool _isDetecting = false;
//   CameraLensDirection _direction = CameraLensDirection.back;
//   int _frameCounter = 0;

//   Future<CameraDescription> _getCamera(CameraLensDirection dir) async {
//     return (await availableCameras()).firstWhere((camera) => camera.lensDirection == dir);
//   }

//   Future<void> _sendImage(CameraImage image) async {
//     try {
//       var uri = Uri.parse('http://localhost:5000/anpr');
//       var request = http.MultipartRequest('POST', uri);
//       request.files.add(http.MultipartFile.fromBytes('image', image.planes.first.bytes, filename: 'image.jpg'));

//       // Send the request
//       var response = await request.send();

//       // Handle response
//       if (response.statusCode == 200) {
//         String plate = await response.stream.bytesToString();
//         ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//           content: Text(plate),
//         ));
//       } else {
//         // Error sending image
//         ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//           content: Text('Failed To Recognize Plate'),
//         ));
//       }
//     } catch (error) {
//       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//         content: Text('Error: ${error.toString()}'),
//       ));
//     }
//   }

// // CameraImage YUV420_888 -> PNG -> Image (compresion:0, filter: none)
// // Black
// // imglib.Image _convertYUV420(CameraImage image) {
// //   var img = imglib.Image(
// //     width: image.width,
// //     height: image.height
// //   ); // Create Image buffer

// //   Plane plane = image.planes[0];
// //   const int shift = (0xFF << 24);

// //   // Fill image buffer with plane[0] from YUV420_888
// // for (int x = 0; x < image.width; x++) {
// //   for (int planeOffset = 0; planeOffset < image.height * image.width; planeOffset += image.width) {
// //     final int pixelValue = plane.bytes[planeOffset + x];
// //     final imglib.Color pixelColor = imglib.Color(pixelValue); // Convert pixel value to Color

// //     // Calculate pixel coordinates
// //     int pixelX = x;
// //     int pixelY = planeOffset ~/ image.width;

// //     // Set pixel color in ImageData
// //     img.setPixel(pixelX, pixelY, pixelColor);
// //   }
// // }

// //   return img;
// // }

//   void _initializeCamera() async {
//     _camera = CameraController(await _getCamera(_direction),
//         defaultTargetPlatform == TargetPlatform.iOS ? ResolutionPreset.low : ResolutionPreset.high,
//         imageFormatGroup: ImageFormatGroup.jpeg);
//     await _camera!.initialize();
//     setState(() {});
//     _camera!.startImageStream((CameraImage image) {
//       if (_isDetecting || (_frameCounter++ % 200 != 0)) return;
//       _isDetecting = true;

//       try {
//         _sendImage(image);
//         print('Processing frame...');
//       } catch (e) {
//         // Handle exception
//       } finally {
//         _isDetecting = false;
//       }
//     });
//   }

//   @override
//   void initState() {
//     super.initState();
//     _initializeCamera();
//   }

//   @override
//   void dispose() {
//     _camera?.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Center(
//       child: Container(
//         width: double.infinity,
//         height: 540,
//         child: _camera?.buildPreview() ??
//             const Center(
//               child: CircularProgressIndicator(),
//             ),
//       ),
//     );
//   }
// }
