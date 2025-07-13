import 'dart:convert';

import 'package:parksync_application/core/constants/app_constants.dart';
import 'package:parksync_application/data/models/plate_info_model.dart';
import 'package:parksync_application/domain/repositories/autosys_repository.dart';
import 'package:http/http.dart' as http;

class AutosysRepository implements IAutosysRepository {
  @override
  Future<PlateInfo> getCarInfo(String plate) async {
    try {
      final uri = Uri.parse('$apiUrl/autosys/$plate');
      final response = await http.get(uri);
      if (response.statusCode == 200) {
        Map decoded = jsonDecode(response.body);
        PlateInfo plateInfo = PlateInfo.fromJson(decoded);
        return plateInfo;
      } else {
        PlateInfo plateInfo = PlateInfo.unknown(plate);
        return plateInfo;
      }
    } catch (error) {
      rethrow;
    }
  }
}
