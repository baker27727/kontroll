import 'land_model.dart';

class PlateInfo {
  String? carType;
  String plateNumber;
  String? manufactureYear;
  String? carDescription;
  String? carModel;
  String? carColor;
  Land? land;

  PlateInfo({
    this.carType,
    required this.plateNumber,
    this.manufactureYear,
    this.carDescription,
    this.carModel,
    this.carColor,
    this.land
    
  });

  factory PlateInfo.fromJson(Map json) {
    return PlateInfo(
      carType: json['car_type'],
      plateNumber: json['plate_number'],
      manufactureYear: json['manufacture_year'],
      carDescription: json['car_description'],
      carModel: json['car_model'],
      carColor: json['car_color'],
      land: Land(
        code: json['country_code'] ?? 'NO', 
        country: json['country_name'] ?? 'Norway', 
        flag: json['country_flag'] ?? 'assets/countries_data/flags/no.png', 
        rank: 1
      )
    );
  }


  factory PlateInfo.unknown(String plate) {
    return PlateInfo(
      plateNumber: plate,
      land: Land(code: 'NO', country: 'Norway', flag: 'assets/countries_data/flags/no.png', rank: 1)
    );
  }

  PlateInfo copyWith({
    String? carType,
    String? plateNumber,
    String? manufactureYear,
    String? carDescription,
    String? carModel,
    String? carColor,
    Land? land
  }) {
    return PlateInfo(
      carType: carType ?? this.carType,
      plateNumber: plateNumber ?? this.plateNumber,
      manufactureYear: manufactureYear ?? this.manufactureYear,
      carDescription: carDescription ?? this.carDescription,
      carModel: carModel ?? this.carModel,
      carColor: carColor ?? this.carColor,
      land: land ?? this.land
    );
  }

  Map toJson() {
    return {
      'car_type': carType,
      'plate_number': plateNumber,
      'manufacture_year': manufactureYear,
      'car_description': carDescription,
      'car_model': carModel,
      'car_color': carColor,
      'country_name': land?.country,
      'country_code': land?.code,
    };
  }
}
