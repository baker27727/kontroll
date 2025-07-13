import 'package:flutter/material.dart';
import 'package:parksync_application/core/services/socket_service.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/data/repositories/remote/car_repository_impl.dart';

class CarProvider extends ChangeNotifier {
  List<RegisteredCar> cars = [];
  List<RegisteredCar> originalCars = [];

  Place? currentPlace;

  // bool loadingState = false;
  bool errorState = false;
  String errorMessage = "";

  final CarRepository _carRepositoryImpl = CarRepository();

  searchCars(String query) {
    cars = originalCars.where((car) {
      return car.plateNumber.toLowerCase().contains(query.toLowerCase()) ||
          car.registeredCarType.name.toLowerCase().contains(query.toLowerCase());
    }).toList();

    notifyListeners();
  }

  clearErrors() {
    errorState = false;
    errorMessage = "";
  }

  fetchCarsByPlace(Place place) async {
    try {
      currentPlace = place;
      // loadingState = true;
      // notifyListeners();

      cars = await _carRepositoryImpl.getAllCarsByPlace(place);
      originalCars = cars;
      clearErrors();
    } catch (e) {
      errorState = true;
      errorMessage = e.toString();
      throw e;
    }

    // loadingState = false;
    notifyListeners();
  }

  linkWithSocket() async{
    SocketService.instance.socket.on('notify_app_with_car_registration', (data){
      fetchCarsByPlace(currentPlace!);
    });
    SocketService.instance.socket.on('notify_app_with_car_removal', (data){
      fetchCarsByPlace(currentPlace!);
    });
  }
}
