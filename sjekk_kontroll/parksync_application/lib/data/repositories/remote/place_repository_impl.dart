import 'dart:convert';

import 'package:parksync_application/core/constants/app_constants.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/repositories/local/cache_repository.dart';
import 'package:parksync_application/domain/repositories/place_repository.dart';
import 'package:http/http.dart' as http;

class PlaceRepository implements IPlaceRepository {
  @override
  Future<List<Place>> getAllPlaces() async {
    try {
      final uri = Uri.parse('$apiUrl/places');
      String? token = await CacheRepository.instance.get('token');

      final response = await http.get(
        uri,
        headers: {'token': token.toString()},
      );

      if (response.statusCode == 200) {
        List decoded = jsonDecode(response.body);

        List<Place> places = decoded.map((el) {
          return Place.fromJson(el);
        }).toList();

        return places;
      } else if (response.statusCode == 408) {
        throw response.body;
      } else {
        Map json = jsonDecode(response.body);
        throw json['error'];
      }
    } catch (error) {
      rethrow;
    }
  }
}
