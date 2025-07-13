import 'dart:convert';

import 'package:parksync_application/data/models/car_image_model.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/plate_info_model.dart';
import 'package:parksync_application/data/models/rule_model.dart';

import 'registered_car_model.dart';

class SavedViolation {
  final int id;
  String ticketComment;
  String systemComment;
  List<Rule> rules;
  List<CarImage> carImages;
  bool isCarRegistered;
  PlateInfo plateInfo;
  String createdAt;
  Place place;
  RegisteredCar? registeredCar;

  String printOption;
  String placeLoginTime;

  SavedViolation({
    required this.id,
    required this.ticketComment,
    required this.systemComment,
    required this.rules,
    required this.carImages,
    required this.isCarRegistered,
    required this.plateInfo,
    required this.createdAt,
    required this.place,
    required this.registeredCar,
    required this.printOption,
    required this.placeLoginTime
  });

  factory SavedViolation.fromJson(Map<String, dynamic> json) {
    return SavedViolation(
      id: json['id'],
      ticketComment: json['ticket_comment'],
      systemComment: json['system_comment'],
      rules: (jsonDecode(json['rules']) as List).map((e) => Rule.fromJson(e)).toList(),
      carImages: (jsonDecode(json['car_images']) as List).map((e) => CarImage.fromJson(e)).toList(),
      isCarRegistered: jsonDecode(json['is_car_registered']),
      plateInfo: PlateInfo.fromJson(
        jsonDecode(json['plate_info'])
      ),
      createdAt: json['created_at'] ?? 'N/A',
      place: Place.fromJson(jsonDecode(json['place'])),
      printOption: json['print_option'],
      placeLoginTime: json['place_login_time'],
      registeredCar: jsonDecode(json['registered_car_info']) == null ? null : RegisteredCar.fromJson(jsonDecode(json['registered_car_info']))
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'ticket_comment': ticketComment,
      'system_comment': systemComment,
      'rules': jsonEncode(rules),
      'car_images': jsonEncode(carImages),
      'is_car_registered': jsonEncode(isCarRegistered),
      'plate_info': jsonEncode(plateInfo.toJson()),
      'created_at': createdAt,
      'place': jsonEncode(place.toJson()),
      'print_option': printOption,
      'place_login_time': placeLoginTime,
      'registered_car_info': jsonEncode(registeredCar?.toJson())
    };
  }
}