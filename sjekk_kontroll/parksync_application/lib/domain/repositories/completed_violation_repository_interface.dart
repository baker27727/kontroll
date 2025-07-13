import '../../data/models/completed_violation.dart';

abstract class ICompletedViolationRepository {
  Future<List<CompletedViolation>> getCompletedViolations({ required int userId });
  Future<List<CompletedViolation>> getCompletedViolationsByPlace({ required int placeId });
  Future<String> uploadImage({ required int completedViolationId, required String violationImage });
  Future copyViolation({ required CompletedViolation violation });
}