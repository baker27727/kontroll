import 'package:parksync_application/data/models/shift_model.dart';

abstract class IShiftRepository {
  Future<Shift> startNewShift();
  Future<void> endShift({ required int shiftId });
}
