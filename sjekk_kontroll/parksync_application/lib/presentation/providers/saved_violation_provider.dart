import 'package:flutter/material.dart';
import 'package:parksync_application/data/models/saved_violation.dart';

import '../../data/repositories/local/saved_violation_repository.dart';

class SavedViolationProvider extends ChangeNotifier{
  List<SavedViolation> violations = [];
  SavedViolation? currentViolation;

  String? errorMessage;

  final SavedViolationRepository _savedViolationRepository = SavedViolationRepository();

  void setCurrentViolation(SavedViolation violation){
    currentViolation = violation;
    notifyListeners();
  }

  Future<void> getSavedViolations() async {
    try{
      List<SavedViolation> violations = await _savedViolationRepository.getSavedViolations();
      this.violations = violations;
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> getSavedViolationsByPlace({ required int placeId }) async {
    try{
      List<SavedViolation> violations = await _savedViolationRepository.getPlaceSavedViolations(placeId: placeId);
      this.violations = violations;
      notifyListeners();
    }catch(error){
      // errorMessage = error.toString();
      // notifyListeners();

      rethrow;
    }
  }

  Future<void> deleteSavedViolation({ required int violationId }) async {
    try{
      await _savedViolationRepository.deleteViolation(violationId: violationId);
      violations.removeWhere((element) => element.id == violationId);
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> copySavedViolation({ required SavedViolation violation }) async {
    try{
      await _savedViolationRepository.copyViolation(violation: violation);
      // violations.add(violation);
      getSavedViolations();
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> searchExistingSavedViolation({ required String plateNumber }) async {
    try{
      SavedViolation? violation = await _savedViolationRepository.searchExistingSavedViolation(plateNumber: plateNumber);
      currentViolation = violation;
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> updateViolation({required int id, required Map<String, dynamic> data}) async {
    try{
      await _savedViolationRepository.updateViolation(id: id, data: data);
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }

  Future<void> clearAllSavedViolations() async {
    try{
      await _savedViolationRepository.clearAllSavedViolations();
      violations = [];
      notifyListeners();
    }catch(error){
      errorMessage = error.toString();
      notifyListeners();
    }
  }
}