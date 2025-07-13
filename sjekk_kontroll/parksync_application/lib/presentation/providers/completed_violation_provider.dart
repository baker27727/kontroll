import 'dart:math';

import 'package:flutter/material.dart';
import 'package:parksync_application/data/models/car_image_model.dart';

import '../../core/helpers/date_helper.dart';
import '../../data/models/completed_violation.dart';
import '../../data/repositories/remote/completed_violation_repository.dart';

class CompletedViolationProvider extends ChangeNotifier{
  List<CompletedViolation> violations = [];
  CompletedViolation? currentViolation;
  String? errorMessage;

  final CompletedViolationRepository _completedViolationRepository = CompletedViolationRepository();

  void setCurrentViolation(CompletedViolation violation){
    currentViolation = violation;
    notifyListeners();
  }

  Future<void> getCompletedViolations({ required int userId }) async {
    try{
      List<CompletedViolation> violations = await _completedViolationRepository.getCompletedViolations(userId: userId);
      this.violations = violations;
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> getCompletedViolationsByPlace({ required int placeId }) async {
    try{
      List<CompletedViolation> violations = await _completedViolationRepository.getCompletedViolationsByPlace(placeId: placeId);
      this.violations = violations;
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> copyCompletedViolation({ required CompletedViolation violation }) async {
    try{
      await _completedViolationRepository.copyViolation(violation: violation);
      violations.add(violation);
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }
  
  Future<void> uploadViolationImage(String filepath) async{
    try{
      String imageLink = await _completedViolationRepository.uploadImage(
        completedViolationId: currentViolation!.id,
        violationImage: filepath
      );

      List<CarImage> carImages = currentViolation!.carImages;
      carImages.add(CarImage(
        path: imageLink, 
        date: DateHelper.getCurrentDateTime(), 
        id: Random().nextInt(9999999)
      ));


      currentViolation = currentViolation!.copyWith(carImages: carImages);
      violations = violations.where((element) => element.id != currentViolation!.id).toList();
      violations.add(currentViolation!);
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }
}