import 'package:intl/intl.dart';

class DateHelper {
  static DateFormat formatter = DateFormat('dd.MM.yyyy HH:mm', 'no_NO');

  static String formatDate(DateTime date) {
    return formatter.format(date);
  }

  static String getCurrentDateTime() {
    return formatter.format(DateTime.now());
  }

  static String addMinutes(DateTime date, int minutes) {
    return formatter.format(date.add(Duration(minutes: minutes)));
  }

  static DateTime now() {
    return DateTime.now();
  }
}