import 'dart:convert';

import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/user_model.dart';

import 'car_image_model.dart';
import 'plate_info_model.dart';
import 'registered_car_model.dart';
import 'rule_model.dart';

class CompletedViolation {
  int id;
  User createdBy;
  String ticketComment;
  String systemComment;
  List<Rule> rules;
  List<CarImage> carImages;
  bool isCarRegistered;
  PlateInfo plateInfo;
  String createdAt;
  Place place;
  RegisteredCar? registeredCar;

  String sessionId;
  double totalCharge;

  String ticketNumber;
  String ticketImage;

  String printOption;
  String placeLoginTime;


  CompletedViolation({
    required this.id,
    required this.createdBy,
    required this.ticketComment,
    required this.systemComment,
    required this.rules,
    required this.carImages,
    required this.isCarRegistered,
    required this.plateInfo,
    required this.createdAt,
    required this.place,
    required this.registeredCar,
    required this.sessionId,
    required this.totalCharge,
    required this.ticketNumber,
    required this.ticketImage,
    required this.printOption,
    required this.placeLoginTime
  });

  factory CompletedViolation.fromJson(Map<String, dynamic> json) {
    pinfo(json);
    return CompletedViolation(
      id: json['id'],
      createdBy: User.fromJson(json['created_by']),
      ticketComment: json['ticket_comment'],
      systemComment: json['system_comment'],
      rules: (json['rules'] as List).map((e) => Rule.fromJson(e)).toList(),
      carImages: (json['images'] as List).map((e) => CarImage.fromJson(e)).toList(),
      isCarRegistered: json['is_car_registered'],
      plateInfo: PlateInfo.fromJson(json['plate_info']),
      createdAt: json['created_at'],
      place: Place.fromJson(json['place']),
      registeredCar: json['registered_car'] == null ? null : RegisteredCar.fromJson(json['registered_car']),
      sessionId: json['session_id'],
      totalCharge: double.parse(json['total_charge'].toString()),
      ticketNumber: json['ticket_info']['ticket_number'],
      ticketImage: json['ticket_info']['ticket_image'],
      printOption: json['print_option'],
      placeLoginTime: json['place_login_time']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'created_by': createdBy.toJson(),
      'ticket_comment': ticketComment,
      'system_comment': systemComment,
      'rules': jsonEncode(rules),
      'images': jsonEncode(carImages),
      'is_car_registered': isCarRegistered,
      'plate_info': plateInfo.toJson(),
      'created_at': createdAt,
      'place': place.toJson(),
      'registered_car': registeredCar?.toJson(),
      'session_id': sessionId,
      'total_charge': totalCharge,
      'print_option': printOption,
      'place_login_time': placeLoginTime,
      'ticket_info': {
        'ticket_number': ticketNumber,
        'ticket_image': ticketImage
      }
    };  
  }

  CompletedViolation copyWith({
    int? id,
    User? createdBy,
    String? ticketComment,
    String? systemComment,
    List<Rule>? rules,
    List<CarImage>? carImages,
    bool? isCarRegistered,
    PlateInfo? plateInfo,
    String? createdAt,
    Place? place,
    RegisteredCar? registeredCar,
    String? sessionId,
    double? totalCharge,
    String? ticketNumber,
    String? ticketImage
  }) => CompletedViolation(
    id: id ?? this.id,
    createdBy: createdBy ?? this.createdBy,
    ticketComment: ticketComment ?? this.ticketComment,
    systemComment: systemComment ?? this.systemComment,
    rules: rules ?? this.rules,
    carImages: carImages ?? this.carImages,
    isCarRegistered: isCarRegistered ?? this.isCarRegistered,
    plateInfo: plateInfo ?? this.plateInfo,
    createdAt: createdAt ?? this.createdAt,
    place: place ?? this.place,
    registeredCar: registeredCar ?? this.registeredCar,
    sessionId: sessionId ?? this.sessionId,
    totalCharge: totalCharge ?? this.totalCharge,
    ticketNumber: ticketNumber ?? this.ticketNumber,
    ticketImage: ticketImage ?? this.ticketImage,
    printOption: printOption,
    placeLoginTime: placeLoginTime
  );
}