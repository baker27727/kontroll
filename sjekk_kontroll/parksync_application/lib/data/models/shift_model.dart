import 'place_login_model.dart';

class Shift {
  final int id;
  final String startDate;
  final String sessionId;
  final List<PlaceLogin> logins;

  Shift({required this.id, required this.startDate, required this.logins, required this.sessionId});

  factory Shift.fromJson(Map json) {
    return Shift(
      id: json["id"],
      startDate: json["start_date"],
      sessionId: json["session_id"],
      logins: (json['logins'] as List).map((e) {
        return PlaceLogin.fromJson(e);
      }).toList()
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "start_date": startDate,
      "session_id": sessionId,
      "logins": logins
    };
  }
}
