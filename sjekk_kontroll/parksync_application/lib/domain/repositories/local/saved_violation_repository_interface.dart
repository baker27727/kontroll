import 'package:parksync_application/data/models/saved_violation.dart';
import 'package:parksync_application/data/models/ticket_preview.dart';

import '../../../data/models/car_image_model.dart';
import '../../../data/models/place_model.dart';
import '../../../data/models/plate_info_model.dart';
import '../../../data/models/registered_car_model.dart';
import '../../../data/models/rule_model.dart';

abstract class ISavedViolationRepository {
  Future<List<SavedViolation>> getSavedViolations();
  Future<List<SavedViolation>> getPlaceSavedViolations({ required int placeId });
  Future<SavedViolation?> searchExistingSavedViolation({ required String plateNumber });
  Future copyViolation({ required SavedViolation violation });
  Future updateViolation({required int id, required Map<String, dynamic> data});
  Future deleteViolation({ required int violationId });

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
  });

  Future<TicketPreview> getTicketPreview(SavedViolation violation);

  Future<void> uploadViolationToServer(SavedViolation violation, TicketPreview ticketPreview);

  Future<void> clearAllSavedViolations();
}