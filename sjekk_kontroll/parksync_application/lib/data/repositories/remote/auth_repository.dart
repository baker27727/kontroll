import 'dart:async';
import 'dart:convert';
import 'package:parksync_application/domain/repositories/auth_repository_interface.dart';

import '../../../core/helpers/api_helper.dart';
import '../../../domain/entities/auth_credentials.dart';
import '../../../presentation/cubits/auth_cubit/auth_state.dart';
import '../../models/user_model.dart';
import '../local/cache_repository.dart';

class AuthRepository implements IAuthRepository {
  final StreamController<AuthState> state = StreamController();
  final CacheRepository cacheRepository = CacheRepository.instance;

  @override
  Future<void> loginUser(AuthCredentials credentials) async {
    try {
      final response =
          await ApiHelper.postData<Map<String, dynamic>>('auth/users/login', {'pnid': credentials.pnid, 'password': credentials.password});



      await cacheRepository.set('token', response['token']);
      await cacheRepository.set('user', jsonEncode(response['user']));
      await cacheRepository.set('x-session-id', response['x-session-id']);

      User user = User.fromJson(response['user']);

      state.add(Authenticated(token: response['token'], user: user));

    } catch (error) {
      state.add(AuthError(message: error.toString()));
    }
  }

  @override
  Future<void> logout() async {
    await cacheRepository.remove('token');
    await cacheRepository.remove('user');
    await cacheRepository.remove('x-session-id');
    state.add(Unauthenticated());
  }

  @override
  Future<void> validateToken() async {
    String? token = await cacheRepository.get('token');
    await ApiHelper.postData('auth/validate-token', {'token': token});
  }
}
