import 'package:parksync_application/data/models/normal_car.dart';

class NormalPlace {
  final int id;

  NormalPlace({
    required this.id,
  });

  factory NormalPlace.fromJson(Map data) {
    return NormalPlace(
      id: data['id'],
    );
  }
}