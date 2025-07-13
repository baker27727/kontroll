import 'package:parksync_application/domain/enums/place_type.dart';

import 'normal_place.dart';
import 'residential_quarter.dart';

class Place {
  final int id;
  final String location;
  final String policy;
  final String code;


  final NormalPlace? normalPlace;
  final ResidentialQuarter? residentialQuarter;
  // final Apartment apartment;

  Place({
    required this.location, 
    required this.policy, 
    required this.id, 
    required this.code,

    required this.normalPlace,
    required this.residentialQuarter
  });

  factory Place.fromJson(Map data) {
    return Place(
      location: data['location'], 
      policy: data['policy'], 
      id: data['id'], 
      code: data['code'],

      normalPlace: data['normal_place'] != null ? NormalPlace.fromJson(data['normal_place']) : null,
      residentialQuarter: data['residential_quarter'] != null ? ResidentialQuarter.fromJson(data['residential_quarter']) : null
    );
  }

  Map toJson() {
    return {'location': location, 'policy': policy, 'code': code, 'id': id};
  }
}
