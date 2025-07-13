// import 'dart:convert';
// import 'package:easy_localization/easy_localization.dart';
// import 'package:parksync_application/core/constants/app_constants.dart';
// import 'package:parksync_application/core/helpers/sqflite_helper.dart';
// import 'package:parksync_application/data/models/violation_model.dart';
// import 'package:parksync_application/data/repositories/local/cache_repository.dart';
// import 'package:http/http.dart' as http;
// import 'package:parksync_application/presentation/providers/shift_provider.dart';

// import '../../models/place_model.dart';
// import '../../models/print_option_model.dart';

// class ViolationRepositoryImpl {
//   @override
//   Future<List<Violation>> getCompletedViolations() async {
//     try {
//       final uri = Uri.parse('$apiUrl/violations');
//       String? token = await CacheRepository.instance.get('token');
//       ShiftProvider shiftProvider = ShiftProvider.instance;

//       final response =
//           await http.get(uri, headers: {'token': token.toString(), 'date': shiftProvider.shift!.startDate});

//       if (response.statusCode == 200) {
//         List decoded = jsonDecode(response.body);
//         List<Violation> violations = decoded.map((e) {
//           return Violation.fromJson(e);
//         }).toList();

//         return violations;
//       } else {
//         Map decoded = jsonDecode(response.body);
//         throw decoded['error'];
//       }
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future<void> createViolation(
//       {required Violation violation, required Place place, required List<String> selectedRules}) async {
//     try {
//       final cacheRepository = CacheRepository.instance;

//       final Uri uri = Uri.parse("$apiUrl/violations");
//       var request = http.MultipartRequest('POST', uri);

//       for (final image in violation.carImages) {
//         request.files.add(await http.MultipartFile.fromPath(image.path, image.path));
//       }

//       String? token = await cacheRepository.get('token');
//       request.headers.addAll({'token': token.toString()});

//       request.fields.addAll({
//         'plate_info': jsonEncode(violation.plateInfo.toJson()),
//         'registered_car_info': violation.registeredCar == null ? 'null' : jsonEncode(violation.registeredCar!.toJson()),
//         'status': 'completed',
//         'rules': jsonEncode(selectedRules),
//         'place': place.id.toString(),
//         'paper_comment': violation.paperComment,
//         'created_at': violation.createdAt,
//         'completed_at': DateTime.now().toLocal().toString(),
//         'out_comment': violation.outComment,
//         'is_car_registered': jsonEncode(violation.is_car_registered)
//       });

//       var response = await request.send();
//       if (response.statusCode == 200) {
//         // Handle success response if needed
//       } else {
//         throw await response.stream.bytesToString();
//       }
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future<String> uploadImage(String id, String image) async {
//     try {
//       final cacheRepository = CacheRepository.instance;

//       final Uri uri = Uri.parse("$apiUrl/violations/$id/images");
//       var request = http.MultipartRequest('PUT', uri);
//       request.files.add(await http.MultipartFile.fromPath('image', image));

//       String? token = await cacheRepository.get('token');
//       request.headers.addAll({'token': token.toString()});

//       var response = await request.send();

//       if (response.statusCode == 200) {
//         return await response.stream.bytesToString();
//       } else {
//         throw await response.stream.bytesToString();
//       }
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future deleteViolation(Violation violation) async {
//     try {
//       if (violation.id == null) {
//         return;
//       }
//       int result = await DatabaseHelper.instance.removeDataById('violations', violation.id);
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future<Violation?> searchExistingSavedViolation(String plateNumber) async {
//     try {
//       List decoded = await DatabaseHelper.instance.getAllData('violations');
//       List<Violation> violations = decoded.map((e) {
//         return Violation.fromEncodedJson(e);
//       }).toList();

//       violations = violations.where((element) {
//         return element.plateInfo.plate.toLowerCase().replaceAll(' ', '') ==
//             plateNumber.toLowerCase().replaceAll(' ', '');
//       }).toList();

//       return violations.firstOrNull;
//     } catch (error) {
//       return null;
//     }
//   }

//   @override
//   Future<List<Violation>> getAllSavedViolations() async {
//     try {
//       List allSavedViolations = await DatabaseHelper.instance.getAllData('violations');
//       List<Violation> violations = allSavedViolations
//           .map((e) {
//             return Violation.fromEncodedJson(e);
//           })
//           .toList()
//           .reversed
//           .toList();

//       return violations;
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future copyViolation(Violation violation, {String? placeLoginTime}) async {
//     try {
//       DateFormat formatter = DateFormat('DD.MM.yy HH:mm');
//       DateTime date = DateTime.now();
//       Violation newCopy =
//           violation.copyWithNewDate(newCreatedAt: formatter.format(date), newPlaceLoginTime: placeLoginTime);

//       int result = await DatabaseHelper.instance.insertData('violations', newCopy.toJsonEncoded());
//     } catch (error) {}
//   }

//   @override
//   Future<List<Violation>> getPlaceCompletedViolations(String id) async {
//     try {
//       final uri = Uri.parse('$apiUrl/violations/place/$id');
//       String? token = await CacheRepository.instance.get('token');
//       ShiftProvider shiftProvider = ShiftProvider.instance;

//       final response =
//           await http.get(uri, headers: {'token': token.toString(), 'date': shiftProvider.shift!.startDate});

//       if (response.statusCode == 200) {
//         List decoded = jsonDecode(response.body);
//         List<Violation> violations = decoded.map((e) {
//           return Violation.fromJson(e);
//         }).toList();

//         return violations;
//       } else {
//         Map decoded = jsonDecode(response.body);
//         throw decoded['error'];
//       }
//     } catch (e) {
//       rethrow;
//     }
//   }

//   @override
//   Future<List<Violation>> getPlaceSavedViolations(String id) async {
//     try {
//       List decoded = await DatabaseHelper.instance.getAllData('violations');

//       List<Violation> violations = decoded.map((e) {
//         return Violation.fromEncodedJson(e);
//       }).toList();

//       violations = violations.where((element) => element.place.id == id).toList().reversed.toList();

//       return violations;
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future updateViolation(int? id, Map<String, dynamic> data) async {
//     try {
//       if (id != null) {
//         await DatabaseHelper.instance.updateData('violations', id, data);
//       }

//       return;
//     } catch (error) {
//       rethrow;
//     }
//   }

//   @override
//   Future<Violation> getViolation(int? id) async {
//     List decoded = await DatabaseHelper.instance.getDataWithCondition('violations', 'id', id);

//     Map doc = decoded.firstOrNull;

//     return Violation.fromEncodedJson(doc);
//   }

//   @override
//   Future<void> uploadViolationToServer(Violation violation, PrintOption printOption) async {
//     try {
//       final cacheRepository = CacheRepository.instance;

//       final Uri uri = Uri.parse("$apiUrl/violations");
//       var request = http.MultipartRequest('POST', uri);

//       for (final image in violation.carImages) {
//         request.files.add(await http.MultipartFile.fromPath(image.date, image.path));
//       }

//       String? token = await cacheRepository.get('token');
//       request.headers.addAll({'token': token.toString()});

//       request.fields.addAll({
//         'plate_info': jsonEncode(violation.plateInfo.toJson()),
//         'registered_car_info': violation.registeredCar == null ? 'null' : jsonEncode(violation.registeredCar!.toJson()),
//         'status': 'completed',
//         'rules': jsonEncode(violation.rules.map((e) => e.toJson()).toList()),
//         'place': violation.place.id.toString(),
//         'paper_comment': violation.paperComment,
//         'created_at': violation.createdAt,
//         'out_comment': violation.outComment,
//         'print_option': printOption.name.tr(),
//         'is_car_registered': jsonEncode(violation.is_car_registered)
//       });

//       var response = await request.send();
//       if (response.statusCode == 200) {
//         return;
//       } else {
//         throw await response.stream.bytesToString();
//       }
//     } catch (error) {
//       rethrow;
//     }
//   }
// }
