

import 'dart:math';

import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/normal_car.dart';
import 'package:parksync_application/data/models/residential_car.dart';
import 'package:parksync_application/domain/enums/registered_car_type.dart';

import 'place_model.dart';

class RegisteredCar {
  final int id;
  final String plateNumber;
  final String carModel;
  final String carType;
  final String carDescription;
  final String carColor;
  final String manufactureYear;
  final RegisteredCarType registeredCarType;

  final NormalCar? normalCar;
  final ResidentialCar? residentialCar;

  final String registrationDate;
  final String expireDate;


  RegisteredCar({
    required this.plateNumber,
    required this.carModel,
    required this.carType,
    required this.carDescription,
    required this.carColor,
    required this.manufactureYear,
    required this.registeredCarType,
    required this.id,

    required this.normalCar,
    required this.residentialCar,

    required this.registrationDate,
    required this.expireDate
  });

  factory RegisteredCar.fromJson(Map json) {
    pinfo(json);
    return RegisteredCar(
      id: json['id'] ?? Random().nextInt(1000),
      plateNumber: json['plate_number'],
      carModel: json['car_model'],
      carType: json['car_type'],
      carDescription: json['car_description'],
      carColor: json['car_color'],
      manufactureYear: json['manufacture_year'],
      registeredCarType: RegisteredCarType.values.byName(json['registration_type'].toString().toLowerCase()),

      normalCar: json['normal_car'] != null ? NormalCar.fromJson(json['normal_car']) : null,
      residentialCar: json['residential_car'] != null ? ResidentialCar.fromJson(json['residential_car']) : null,

      registrationDate: json['registration_date'] ?? '',
      expireDate: json['expire_date'] ?? '',
    );
  }

  Map toJson() {
    return {
      'plate_number': plateNumber,
      'car_model': carModel,
      'car_type': carType,
      'car_description': carDescription,
      'car_color': carColor,
      'manufacture_year': manufactureYear,
      'registration_type': registeredCarType.name,
      'id': id,
      'registrationDate' : registrationDate,
      'expireDate' : expireDate,
      
    };
  }
}
