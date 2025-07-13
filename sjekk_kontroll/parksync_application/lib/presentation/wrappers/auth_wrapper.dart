import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../core/utils/snackbar_utils.dart';
import '../cubits/auth_cubit/auth_cubit.dart';
import '../cubits/auth_cubit/auth_state.dart';
import '../screens/bottom_navigator_screen.dart';
import '../screens/home_screen.dart';
import '../screens/login_screen.dart';

class AuthWrapper extends StatelessWidget {
  static const route = '/auth_wrapper';
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocConsumer<AuthCubit, AuthState>(
        listener: (context, state) {
          if (state is AuthSessionEndedState) {
            SnackbarUtils.showSnackbar(context, 'Please sign in again');
          } else if (state is AuthError) {
            SnackbarUtils.showSnackbar(context, state.message, type: SnackBarType.failure);
          }
        },
        builder: (context, state) {
          if (state is Authenticated) {
            return BottomScreenNavigator();
          }

          return LoginScreen();
        },
      ),
    );
  }
}
