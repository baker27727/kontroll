import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import 'printers_settings.dart';

class SettingsScreen extends StatelessWidget {
  static const String settingsScreen = '/settings';
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: ListView(
            children: [
              ListTile(
                tileColor: accentColor,
                contentPadding: EdgeInsets.symmetric(horizontal: 8),
                leading: Icon(Iconsax.printer, color: primaryColor, size: 36,),
                title: Text('printers'.tr().toUpperCase()),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.zero,
                ),
                onTap: () {
                  Navigator.of(context).pushNamed(PrintersSettings.route);
                },
                trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
              )
            ],
          ),
        ),
      ),
    );
  }
}
