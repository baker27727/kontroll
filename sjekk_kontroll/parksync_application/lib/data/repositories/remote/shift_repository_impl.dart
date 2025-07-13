import 'dart:convert';
import 'package:parksync_application/core/constants/app_constants.dart';
import 'package:parksync_application/core/helpers/api_helper.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/shift_model.dart';
import 'package:parksync_application/data/repositories/local/cache_repository.dart';
import 'package:parksync_application/domain/repositories/shift_repository.dart';
import 'package:http/http.dart' as http;

class ShiftRepository implements IShiftRepository {
  @override
  Future<void> endShift({ required int shiftId }) async {
    try {

      final cacheRepository = CacheRepository.instance;
      String encoded = await cacheRepository.get('logins') ?? '[]';

      await ApiHelper.postData(
        'shifts/$shiftId/submit', 
        {
          'logins': encoded
        }
      );

      await cacheRepository.remove('shift');
      await cacheRepository.remove('logins');
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<Shift> startNewShift() async {
    try {
      final uri = Uri.parse('$apiUrl/shifts');

      String? token = await CacheRepository.instance.get('token');
      String? sessionId = await CacheRepository.instance.get('x-session-id');

      final response = await http.post(
        uri,
        headers: {
          'Content-Type': 'application/json',
          'token': token!,
          'x-session-id': sessionId!,
        },
      );

      if (response.statusCode == 200) {
        Map decoded = jsonDecode(response.body);
        Shift shift = Shift.fromJson(decoded);

        await CacheRepository.instance.set('shift', jsonEncode(shift.toJson()));
        await CacheRepository.instance.set('logins', '[]');

        pinfo(shift.toJson());

        return shift;
      } else {
        Map decoded = jsonDecode(response.body);
        throw decoded['error'];
      }
    } catch (error) {
      rethrow;
    }
  }
}
