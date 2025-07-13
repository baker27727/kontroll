import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:parksync_application/core/helpers/sqflite_helper.dart';
import 'package:parksync_application/core/services/bluetooth_service.dart';
import 'package:parksync_application/core/services/printer_service.dart';
import 'package:parksync_application/core/services/socket_service.dart';
import 'package:parksync_application/presentation/providers/shift_provider.dart';
import 'package:parksync_application/presentation/widgets/template/theme/app_theme.dart';
import 'package:parksync_application/presentation/wrappers/app_cubits.dart';
import 'package:parksync_application/presentation/wrappers/auth_wrapper.dart';

import 'core/routing/app_router.dart';
import 'data/repositories/local/cache_repository.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  await CacheRepository.init();
  // await ConnectivityProvider.instance.init();
  await DatabaseHelper.instance.initDatabase();
  await ShiftProvider.instance.init();
  await BluetoothService.instance.setListener();
  await SocketService.instance.initSocket();

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(statusBarColor: Colors.black12));

  runApp(EasyLocalization(
      supportedLocales: const [
        Locale('nb', 'NO'),
        Locale('en', 'US'),
      ],
      path: 'assets/translations',
      fallbackLocale: const Locale('nb', 'NO'),
      // fallbackLocale: const Locale('en','US'),
      child: AppCubits(
        child: EntryPoint(),
      )));
}

class EntryPoint extends StatefulWidget {
  const EntryPoint({super.key});

  @override
  State<EntryPoint> createState() => _EntryPointState();
}

class _EntryPointState extends State<EntryPoint> {
  @override
  void dispose() {
    PrinterService.instance.disconnectPrinter();
    SocketService.instance.disconnectSocket();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async{
        await PrinterService.instance.connectToLastPairedPrinter(context);
    });
  }

  @override
  Widget build(BuildContext context) {  
    return MaterialApp(
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      title: 'Sjekk',
      theme: appTheme,
      onGenerateRoute: AppRouter.generatedRoute,
      debugShowCheckedModeBanner: false,
      initialRoute: AuthWrapper.route,
      // home: TempTest(),
    );
  }
}
