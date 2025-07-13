import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/presentation/providers/completed_violation_provider.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/providers/current_time_provider.dart';
import 'package:parksync_application/presentation/providers/saved_violation_provider.dart';

import '../cubits/auth_cubit/auth_cubit.dart';
import '../providers/car_provider.dart';
import '../providers/connectivity_provider.dart';
import '../providers/keyboard_input_provider.dart';
import '../providers/place_provider.dart';
import '../providers/printer_provider.dart';
import '../providers/rule_provider.dart';
import '../providers/shift_provider.dart';

class AppCubits extends StatelessWidget {
  final Widget child;
  const AppCubits({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) => AuthCubit()
            ..init()
            ..initializeFromCache(),
        ),
        ChangeNotifierProvider<CurrentTimeProvider>(
          create: (context) => CurrentTimeProvider(),
        ),
        ChangeNotifierProvider<CreateTicketProvider>(
          create: (context) => CreateTicketProvider(),
        ),
        ChangeNotifierProvider<SavedViolationProvider>(
          create: (context) => SavedViolationProvider(),
        ),
        ChangeNotifierProvider<CompletedViolationProvider>(
          create: (context) => CompletedViolationProvider(),
        ),
        ChangeNotifierProvider<PlaceProvider>(
          create: (context) => PlaceProvider(),
        ),
        // ChangeNotifierProvider<ConnectivityProvider>(
        //   create: (context) => ConnectivityProvider.instance,
        // ),
        ChangeNotifierProvider<PrinterProvider>(
          create: (context) => PrinterProvider()..getAllPrinters(),
        ),
        ChangeNotifierProvider<ShiftProvider>(
          create: (context) => ShiftProvider.instance,
        ),
        ChangeNotifierProvider<CarProvider>(
          create: (context) => CarProvider()..linkWithSocket(),
        ),
        ChangeNotifierProvider<KeyboardInputProvider>(
          create: (context) => KeyboardInputProvider(),
        ),
        ChangeNotifierProvider<RuleProvider>(
          create: (context) => RuleProvider(),
        ),
      ],
      child: child,
    );
  }
}
