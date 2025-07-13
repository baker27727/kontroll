import 'package:parksync_application/domain/enums/residential_registeration_type.dart';

class ResidentialCar {
  final int id;
  final ResidentialRegisterationType parkingType;
  final int subscriptionPlanDays;

  ResidentialCar({
    required this.id,
    required this.parkingType,
    required this.subscriptionPlanDays
  });

  factory ResidentialCar.fromJson(Map data) {
    return ResidentialCar(
      id: data['id'],
      parkingType: ResidentialRegisterationType.values.byName(data['parking_type'].toString().toLowerCase()),
      subscriptionPlanDays: data['subscription_plan_days']
    );
  }
  
}