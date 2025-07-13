import 'package:parksync_application/core/helpers/api_helper.dart';
import 'package:parksync_application/core/utils/logger.dart';
import 'package:parksync_application/domain/entities/upload_file.dart';
import 'package:parksync_application/domain/enums/response_type.dart';

import '../../../domain/repositories/completed_violation_repository_interface.dart';
import '../../models/completed_violation.dart';

class CompletedViolationRepository implements ICompletedViolationRepository {

  @override
  Future<List<CompletedViolation>> getCompletedViolations({ required int userId }) async {
    try{
      final response = await ApiHelper.getData<List>('users/$userId/violations');
      final List<CompletedViolation> completedViolations = response.map((e) => CompletedViolation.fromJson(e)).toList();

      return completedViolations;
    }catch(e){  
      rethrow;
    }
  }

  @override
  Future<List<CompletedViolation>> getCompletedViolationsByPlace({ required int placeId }) async{
    try{
      final response = await ApiHelper.getData<List>('places/$placeId/violations');
      pinfo(response);
      final List<CompletedViolation> completedViolations = response.map((e) => CompletedViolation.fromJson(e)).toList();

      return completedViolations;
    }catch(error){
      rethrow;
    }
  }

  @override
  Future<String> uploadImage({ required int completedViolationId, required String violationImage }) async{
    try{
      final response = await ApiHelper.postMultipartRequest<String>(
        endpoint: '/violations/$completedViolationId/images', 
        data: {}, 
        files: [
          UploadFile(name: 'image', path: violationImage)
        ],
        method: 'PUT',
        responseType: ResponseType.text
      );

      return response;
    }catch(error){
      rethrow;
    }
  }


  @override
  Future copyViolation({ required CompletedViolation violation }) async{
    try{
      await ApiHelper.postData('violations', violation.toJson());
    }catch(e){
      rethrow;
    }
  }
}