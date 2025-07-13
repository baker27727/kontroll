import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/presentation/screens/printers_settings.dart';
import 'package:parksync_application/presentation/screens/qrcode_scanner.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'about_screen.dart';

class MoreScreen extends StatefulWidget {
  const MoreScreen({Key? key}) : super(key: key);

  @override
  State<MoreScreen> createState() => _MoreScreenState();
}

class _MoreScreenState extends State<MoreScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: ListView(
                  children: [
                    ListTile(
                      tileColor: accentColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                      leading: Icon(Icons.qr_code_scanner, color: primaryColor, size: 36,),
                      title: Text('scan_qr'.tr().toUpperCase()),
                      onTap: () {
                        Navigator.pushNamed(context, QrCodeScanner.route);
                      },
                      trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
                    ),
                    12.h,
                    ListTile(
                      tileColor: accentColor,
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                      leading: Icon(Iconsax.information, color: primaryColor, size: 36,),
                      title: Text('about_sjekk'.tr().toUpperCase()),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                      onTap: () {
                        Navigator.pushNamed(context, AboutScreen.route);
                      },
                      trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
                    ),
                    12.h,
                    ListTile(
                      tileColor: accentColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                      leading: Icon(Iconsax.printer, color: primaryColor, size: 36,), 
                      title: Text('printers'.tr().toUpperCase()),
                      onTap: () async {
                        navigateNamed(context, PrintersSettings.route);
                      },
                      trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
                    ),
                    12.h,
                    ListTile(
                      tileColor: accentColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                      leading: Icon(Iconsax.language_square, color: primaryColor, size: 36,), 
                      title: Text('Change Language'.tr().toUpperCase()),
                      onTap: () async {
                        await showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.zero,
                            ),
                            insetPadding: EdgeInsets.zero,
                            contentPadding: EdgeInsets.all(4),
                            titlePadding: EdgeInsets.zero,

                            content: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                GestureDetector(
                                  onTap: (){
                                    context.setLocale(const Locale('nb', 'NO'));
                                    Navigator.pop(context);
                                  },
                                  child: Container(
                                    color: accentColor,
                                    height: 60,
                                    width: double.infinity,
                                    child: Center(
                                      child: Text('Norwegian'.tr()),
                                    ),
                                  ),
                                ),
                                4.h,
                                GestureDetector(
                                  onTap: (){
                                    context.setLocale(const Locale('en', 'US'));
                                    Navigator.pop(context);
                                  },
                                  child: Container(
                                    color: accentColor,
                                    height: 60,
                                    width: double.infinity,
                                    child: Center(
                                      child: Text('English'.tr()),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                      trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
