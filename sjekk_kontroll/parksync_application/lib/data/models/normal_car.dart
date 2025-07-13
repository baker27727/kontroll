import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/domain/enums/registration_source.dart';

class NormalCar {
  final int id;
  final RegisteredCar registeredCar;
  final int freeParkingHours;
  final RegistrationSource registrationSource;

  NormalCar({
    required this.id,
    required this.registeredCar,
    required this.freeParkingHours,
    required this.registrationSource
  });

  factory NormalCar.fromJson(Map data) {
    return NormalCar(
      id: data['id'],
      registeredCar: RegisteredCar.fromJson(data['registered_car']),
      freeParkingHours: data['free_parking_hours'],
      registrationSource: RegistrationSource.values.byName(data['registeration_source'].toString().toLowerCase())
    );
  }
}