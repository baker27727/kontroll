import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:parksync_application/core/helpers/api_helper.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/utils/logger.dart';
import 'package:parksync_application/data/models/car_image_model.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/plate_info_model.dart';
import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/data/models/rule_model.dart';
import 'package:parksync_application/data/models/saved_violation.dart';
import 'package:parksync_application/data/models/ticket_preview.dart';
import 'package:parksync_application/domain/entities/upload_file.dart';
import 'package:parksync_application/domain/enums/response_type.dart';
import 'package:parksync_application/domain/repositories/local/saved_violation_repository_interface.dart';

import '../../../core/helpers/sqflite_helper.dart';

class SavedViolationRepository implements ISavedViolationRepository {
  @override
  Future copyViolation({required SavedViolation violation}) async{
    try {
      violation.createdAt = DateHelper.getCurrentDateTime();
      await DatabaseHelper.instance.insertData('violations', violation.toJson());
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future deleteViolation({required int violationId}) async{
    try {
      await DatabaseHelper.instance.removeDataById('violations', violationId);
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<List<SavedViolation>> getPlaceSavedViolations({required int placeId}) async{
    try {
      List decoded = await DatabaseHelper.instance.getAllData('violations');

      List<SavedViolation> violations = decoded.map((e) {
        return SavedViolation.fromJson(e);
      }).toList();

      violations = violations.where((element) => element.place.id == placeId).toList().reversed.toList();

      return violations;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<List<SavedViolation>> getSavedViolations() async{
    try {
      pinfo(await DatabaseHelper.instance.getAllData('violations'));
      List allSavedViolations = await DatabaseHelper.instance.getAllData('violations');
      List<SavedViolation> violations = allSavedViolations
          .map((e) {
            return SavedViolation.fromJson(e);
          })
          .toList()
          .reversed
          .toList();

      return violations;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<SavedViolation?> searchExistingSavedViolation({required String plateNumber}) async{
    try {
      List allSavedViolations = await DatabaseHelper.instance.getAllData('violations');

      if (allSavedViolations.isEmpty) {
        return null;
      }

      List<SavedViolation?> violations = allSavedViolations
          .map((e) {
            return SavedViolation.fromJson(e);
          })
          .toList();

      SavedViolation? violation = violations.firstWhere((element) => element?.plateInfo.plateNumber == plateNumber, orElse: () => null);

      return violation;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future updateViolation({required int id, required Map<String, dynamic> data}) {
    try {
      return DatabaseHelper.instance.updateData('violations', id, data);
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<void> saveViolation({
    required PlateInfo plateInfo, 
    required List<Rule> rules, 
    required String ticketComment, 
    required String systemComment,
    required Place place, 
    required List<CarImage> carImages, 
    RegisteredCar? registeredCar, 
    required String placeLoginTime,
    required String printOption
  }) async{
    await DatabaseHelper.instance.insertData('violations', {
      'plate_info': jsonEncode(plateInfo.toJson()),
      'rules': jsonEncode(rules),
      'ticket_comment': ticketComment,
      'system_comment': systemComment,
      'place': jsonEncode(place.toJson()),
      'car_images': jsonEncode(carImages),
      'registered_car_info': jsonEncode(registeredCar?.toJson()),
      'is_car_registered': registeredCar != null ? 'true' : 'false',
      'place_login_time': placeLoginTime,
      'print_option': printOption,
      'created_at': DateHelper.getCurrentDateTime()
    });
  }

  @override
  Future<TicketPreview> getTicketPreview(SavedViolation violation) async{
    try {
      final response = await ApiHelper.postData<Map<String, dynamic>>(
        '/violations/ticket-preview', 
        {
        'plate_info': violation.plateInfo.toJson(),
        'rules': violation.rules.map((e) => e.toJson()).toList(),
        'place': violation.place.toJson(),
        'ticket_comment': violation.ticketComment,
        'created_at': violation.createdAt,
        'system_comment': violation.systemComment,
        'place_login_time': violation.placeLoginTime,
        'print_option': violation.printOption
      }, responseType: ResponseType.json);
      
      return TicketPreview.fromJson(response);
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<void> uploadViolationToServer(SavedViolation violation, TicketPreview ticketPreview) async {
    try {
      final response = await ApiHelper.postMultipartRequest(
        endpoint: '/violations', 
        data: {
        'plate_info': jsonEncode(violation.plateInfo.toJson()),
        'registered_car': jsonEncode(violation.registeredCar == null ? 'null' : violation.registeredCar!.toJson()),
        'rules': jsonEncode(violation.rules.map((e) => e.toJson()).toList()),
        'place': jsonEncode(violation.place.toJson()),
        'ticket_comment': violation.ticketComment,
        'created_at': violation.createdAt,
        'system_comment': violation.systemComment,
        'is_car_registered': jsonEncode(violation.isCarRegistered),
        'place_login_time': violation.placeLoginTime,
        'print_option': violation.printOption,
        'serial_number': ticketPreview.serialNumber, 
        'barcode_image': ticketPreview.barcodeLink, 
        'ticket_image': ticketPreview.ticketLink,
        'ticket_number': ticketPreview.ticketNumber,
        "kid_number": ticketPreview.kidNumber
      }, 
        files: [
          ...violation.carImages.map((e) => UploadFile(name: e.date, path: e.path)).toList(),
        ]
      );
      pinfo(response);
    } catch (error) {
      rethrow;
    }
  }
  
  @override
  Future<void> clearAllSavedViolations() async{
    try {
      await DatabaseHelper.instance.clearTable('violations');
    } catch (error) {
      rethrow;
    }
  }
}