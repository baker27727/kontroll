import 'package:flutter/material.dart';
import 'package:parksync_application/data/repositories/remote/place_repository_impl.dart';

import '../../data/models/place_model.dart';

class PlaceProvider extends ChangeNotifier {
  List<Place> places = [];
  List<Place> originalPlaces = [];
  bool errorState = false;
  String errorMessage = "";
  // bool loadingState = false;

  Place? selectedPlace;
  DateTime? selectedPlaceLoginTime;
  DateTime? startTime;

  restartStartTime() {
    startTime = DateTime.now().toLocal();
    notifyListeners();
  }

  setSelectedPlace(Place place) {
    selectedPlace = place;
    notifyListeners();
  }

  setSelectedPlaceLoginTime() {
    selectedPlaceLoginTime = DateTime.now();
  }

  logoutFromCurrentPlace() {
    selectedPlace = null;
    selectedPlaceLoginTime = null;
    startTime = null;
  }

  clearErrors() {
    errorState = false;
    errorMessage = "";
  }

  fetchPlaces() async {
    try {
      // loadingState = true;
      // notifyListeners();

      PlaceRepository placeRepositoryImpl = PlaceRepository();
      List<Place> fetchedPlaces = await placeRepositoryImpl.getAllPlaces();
      places = fetchedPlaces;
      originalPlaces = fetchedPlaces;
      clearErrors();
    } catch (error) {
      errorState = true;
      errorMessage = error.toString();
    }

    // loadingState = false;
    notifyListeners();
    // clearErrors();
  }

  searchPlaces(String query) {
    places = originalPlaces.where((place) {
      return place.location.toLowerCase().contains(query.toLowerCase()) ||
          place.code.toLowerCase().contains(query.toLowerCase());
    }).toList();

    notifyListeners();
  }

  @override
  void dispose() {
    errorMessage = "";
    errorState = false;
    selectedPlace = null;
    selectedPlaceLoginTime = null;
    places.clear();
    originalPlaces.clear();
    startTime = null;
    super.dispose();
  }
}
