// Show the exit confirmation dialog
import 'dart:ui';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../presentation/widgets/template/components/template_button.dart';

PageRouteBuilder buildCustomBuilder(Widget screen, RouteSettings? settings) {
  return PageRouteBuilder(
    pageBuilder: (_context, animation, ___) {
      return screen;
    },
    settings: settings,
    transitionDuration: Duration.zero,
    reverseTransitionDuration: Duration.zero,
  );
}

Future<void> showExitConfirmationDialog(BuildContext context) async {
  await showDialog(
      context: context,
      builder: (context) {
        return BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
          child: Container(
            alignment: Alignment.center,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.exit_to_app,
                  size: 80,
                  color: Colors.red,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.0),
                  child: Material(
                    type: MaterialType.transparency,
                    child: AutoSizeText(
                      "confirm_exit_message".tr(),
                      style: TextStyle(fontSize: 20, color: Colors.white),
                      maxLines: 1,
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    InfoTemplateButton(
                      onPressed: () {
                        Navigator.of(context).pop(); // Close the dialog
                      },
                      text: "cancel".tr().toUpperCase(),
                    ),
                    SizedBox(width: 16),
                    DangerTemplateButton(
                      onPressed: () {
                        Navigator.of(context).pop(); // Close the dialog
                        SystemNavigator.pop(); // Exit the app
                      },
                      text: 'exit'.tr().toUpperCase(),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      });
}
