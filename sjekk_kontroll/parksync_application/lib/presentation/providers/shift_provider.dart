import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/place_login_model.dart';
import 'package:parksync_application/data/models/shift_model.dart';
import 'package:parksync_application/data/repositories/local/cache_repository.dart';
import 'package:parksync_application/data/repositories/remote/shift_repository_impl.dart';

class ShiftProvider extends ChangeNotifier {
  Shift? shift;
  final ShiftRepository _shiftRepository = ShiftRepository();

  static ShiftProvider? _instance;

  ShiftProvider._();

  static ShiftProvider get instance {
    _instance ??= ShiftProvider._();
    return _instance!;
  }

  Future init() async {
    
    String? encoded = await CacheRepository.instance.get('shift');
    if (encoded != null) {
      shift = Shift.fromJson(jsonDecode(encoded));
    }

    notifyListeners();
  }

  Future<void> startNewShift() async {
    try {
      shift = await _shiftRepository.startNewShift();
      notifyListeners();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> storePlaceLogin(PlaceLogin placeLogin) async {
    try {
      String encoded = await CacheRepository.instance.get('logins') ?? '[]';
      List decoded = jsonDecode(encoded);
      List<PlaceLogin> logins = decoded.map((e) => PlaceLogin.fromJson(e)).toList();
      logins.add(placeLogin);

      await CacheRepository.instance.set('logins', jsonEncode(logins));
    } catch (error) {
      rethrow;
    }
  }

  Future<void> endShift() async {
    try {
      await _shiftRepository.endShift(shiftId: shift!.id);
      shift = null;

      notifyListeners();
    } catch (error) {
      rethrow;
    }
  }
}
