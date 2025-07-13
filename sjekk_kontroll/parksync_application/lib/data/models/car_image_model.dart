import 'package:intl/intl.dart';

class CarImage {
  final String path;
  final String date;
  int? id;

  CarImage({required this.path, required this.date, required this.id});

  factory CarImage.fromString(String path) {
    return CarImage(
      path: path,
      date: DateFormat('dd.MM.yyyy HH:mm', 'no_NO').format(DateTime.now()),
      id: null,
    );
  }

  factory CarImage.fromJson(Map data) {
    return CarImage(
      path: data['path'],
      date: data['date'],
      id: data['id'],
    );
  }

  Map toJson() {
    return {'path': path, 'date': date, 'id': id};
  }
}
