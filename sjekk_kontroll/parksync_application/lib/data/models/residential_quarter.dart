import 'residential_car.dart';

class ResidentialQuarter {
  final int id;

  ResidentialQuarter({
    required this.id,
  });

  factory ResidentialQuarter.fromJson(Map data) {
    return ResidentialQuarter(
      id: data['id'],
    );
  }
}