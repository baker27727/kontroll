import 'dart:convert';

import 'package:parksync_application/core/utils/logger.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/domain/repositories/car_repository.dart';
import 'package:http/http.dart' as http;

import '../../../core/constants/app_constants.dart';
import '../local/cache_repository.dart';

class CarRepository implements ICarRepository {
  @override
  Future<List<RegisteredCar>> getAllCars() async {
    try {
      final uri = Uri.parse('$apiUrl/cars');
      String? token = await CacheRepository.instance.get('token');

      final response = await http.get(
        uri,
        headers: {'token': token.toString()},
      );

      if (response.statusCode == 200) {
        List decoded = jsonDecode(response.body);

        List<RegisteredCar> cars = decoded.map((el) {
          return RegisteredCar.fromJson(el);
        }).toList();

        return cars;
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

  @override
  Future<List<RegisteredCar>> getAllCarsByPlace(Place place) async {
    try {
      final uri = Uri.parse('$apiUrl/cars/place/${place.id}');
      String? token = await CacheRepository.instance.get('token');

      final response = await http.get(
        uri,
        headers: {'token': token.toString()},
      );

      if (response.statusCode == 200) {
        List decoded = jsonDecode(response.body);

        List<RegisteredCar> cars = decoded.map((el) {
          return RegisteredCar.fromJson(el);
        }).toList();

        return cars;
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

  @override
  Future<RegisteredCar?> getCarByPlate(String? plate) async {
    try {
      final uri = Uri.parse('$apiUrl/cars/plate/$plate');
      String? token = await CacheRepository.instance.get('token');

      final response = await http.get(
        uri,
        headers: {'token': token.toString()},
      );

      if (response.statusCode == 200) {
        Map car = jsonDecode(response.body);

        pwarnings(car);

        return RegisteredCar.fromJson(car);
      } else {
        return null;
      }
    } catch (error) {
      rethrow;
    }
  }
}
