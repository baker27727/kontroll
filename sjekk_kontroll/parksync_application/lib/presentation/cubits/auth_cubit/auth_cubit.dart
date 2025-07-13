import 'dart:async';
import 'dart:convert';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:parksync_application/data/models/user_model.dart';

import '../../../data/repositories/local/cache_repository.dart';
import '../../../data/repositories/remote/auth_repository.dart';
import '../../../domain/entities/auth_credentials.dart';
import 'auth_state.dart';

class AuthCubit extends Cubit<AuthState> {
  final AuthRepository authRepository = AuthRepository();
  final CacheRepository cacheRepository = CacheRepository.instance;

  static AuthCubit get(context) => BlocProvider.of<AuthCubit>(context);

  AuthCubit() : super(Unauthenticated());

  Future<void> initializeFromCache() async {
    String? token = await cacheRepository.get('token');

    if (token != null) {
      try {
        await authRepository.validateToken();
      } catch (error) {
        return emit(AuthSessionEndedState());
      }

      String? cachedUser = await cacheRepository.get('user');
      User user = User.fromJson(jsonDecode(cachedUser!));

      emit(Authenticated(token: token, user: user));
    }
  }

  Future<void> init() async {
    authRepository.state.stream.listen((state) {
      emit(state);
    });
  }

  Future<void> loginUser(AuthCredentials credentials) async {
    await authRepository.loginUser(credentials);
  }

  Future<void> logout() async{
    await authRepository.logout();
  }
}
