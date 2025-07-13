import 'package:flutter/material.dart';
import 'package:parksync_application/core/utils/router_utils.dart';
import 'package:parksync_application/presentation/screens/about_screen.dart';
import 'package:parksync_application/presentation/screens/completed_violations_screen.dart';
import 'package:parksync_application/presentation/screens/home_screen.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/create_new_ticket.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/place_completed_violations.dart';
import 'package:parksync_application/presentation/screens/place_details.dart';
import 'package:parksync_application/presentation/screens/place_home.dart';
import 'package:parksync_application/presentation/screens/places_screen.dart';
import 'package:parksync_application/presentation/screens/plate_keyboard_input.dart';
import 'package:parksync_application/presentation/screens/plate_result_info.dart';
import 'package:parksync_application/presentation/screens/printers_settings.dart';
import 'package:parksync_application/presentation/screens/qrcode_scanner.dart';
import 'package:parksync_application/presentation/screens/saved_violations_screen.dart';
import 'package:parksync_application/presentation/wrappers/auth_wrapper.dart';
import '../../presentation/screens/bottom_navigator_screen.dart';
import '../../presentation/screens/issue_ticket/completed_ticket_control.dart';
import '../../presentation/screens/issue_ticket/place_saved_violations.dart';
import '../../presentation/screens/issue_ticket/print_ticket_preview.dart';
import '../../presentation/screens/unknown_route_screen.dart';
import '../../presentation/widgets/template/template_workspace.dart';

class AppRouter {
  static Route<dynamic> generatedRoute(RouteSettings settings) {
    switch (settings.name) {
      case HomeScreen.route:
        return buildCustomBuilder(HomeScreen(), settings);

      case BottomScreenNavigator.route:
        return buildCustomBuilder(BottomScreenNavigator(), settings);

      case AuthWrapper.route:
        return buildCustomBuilder(AuthWrapper(), settings);

      case PlacesScreen.route:
        return buildCustomBuilder(PlacesScreen(), settings);

      case PlaceDetailsScreen.route:
        return buildCustomBuilder(PlaceDetailsScreen(), settings);

      case PlaceHome.route:
        return buildCustomBuilder(PlaceHome(), settings);

      case PlateKeyboardInputScreen.route:
        return buildCustomBuilder(PlateKeyboardInputScreen(), settings);

      case QrCodeScanner.route:
        return buildCustomBuilder(QrCodeScanner(), settings);

      case PlateResultInfo.route:
        return buildCustomBuilder(PlateResultInfo(), settings);

      case SavedViolationScreen.route:
        return buildCustomBuilder(SavedViolationScreen(), settings);

      case CompletedViolationsScreen.route:
        return buildCustomBuilder(CompletedViolationsScreen(), settings);

      case CreateNewTicket.route:
        return buildCustomBuilder(CreateNewTicket(), settings);

      case PlaceCompletedViolations.route:
        return buildCustomBuilder(PlaceCompletedViolations(), settings);

      case PlaceSavedViolations.route:
        return buildCustomBuilder(PlaceSavedViolations(), settings);

      case AboutScreen.route:
        return buildCustomBuilder(AboutScreen(), settings);

      case PrintersSettings.route:
        return buildCustomBuilder(PrintersSettings(), settings);

      case CompletedTicketControl.route:
        return buildCustomBuilder(CompletedTicketControl(), settings);

      case PrintTicketPreview.route:
        return buildCustomBuilder(PrintTicketPreview(), settings);

      case TemplateWorkspace.route:
        return buildCustomBuilder(TemplateWorkspace(), settings);

      default:
        return buildCustomBuilder(UnknownRouteScreen(), settings);
    }
  }
}
