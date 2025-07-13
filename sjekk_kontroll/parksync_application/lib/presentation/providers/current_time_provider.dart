import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class CurrentTimeProvider extends ChangeNotifier{
  DateFormat formatter = DateFormat("dd.MM.yyyy HH:mm", 'no_NO');
  String currentTime = '';
  Timer? _timer;

  startTimer() {
    if(_timer != null || (_timer?.isActive ?? false)){
      return;
    }

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      currentTime = formatter.format(DateTime.now());
      notifyListeners();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _timer = null;
    super.dispose();
  }
  
}
