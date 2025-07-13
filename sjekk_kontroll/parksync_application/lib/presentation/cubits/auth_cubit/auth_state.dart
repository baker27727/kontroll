import 'dart:math';
import 'package:equatable/equatable.dart';

import '../../../data/models/user_model.dart';

abstract class AuthState extends Equatable {}

class Authenticated extends AuthState {
  final String token;
  final User user;

  Authenticated({required this.token, required this.user});

  @override
  List<Object> get props => [token, user];
}

class Unauthenticated extends AuthState {
  @override
  List<Object> get props => [];
}

class AuthSessionEndedState extends AuthState {
  @override
  List<Object> get props => [];
}

class AuthError extends AuthState {
  final String message;
  final int id = Random().nextInt(100000);

  AuthError({required this.message});

  @override
  List<Object> get props => [message, id];
}
