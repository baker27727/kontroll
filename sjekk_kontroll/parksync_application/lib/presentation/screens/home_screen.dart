
import 'dart:typed_data';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/app_images.dart';
import 'package:parksync_application/core/extensions/sizedbox_extension.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/core/services/printer_service.dart';
import 'package:parksync_application/presentation/providers/completed_violation_provider.dart';
import 'package:parksync_application/presentation/providers/current_time_provider.dart';
import 'package:parksync_application/presentation/providers/saved_violation_provider.dart';
import 'package:parksync_application/presentation/providers/shift_provider.dart';
import 'package:parksync_application/presentation/screens/completed_violations_screen.dart';
import 'package:parksync_application/presentation/screens/places_screen.dart';
import 'package:parksync_application/presentation/screens/saved_violations_screen.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/template_workspace.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../core/utils/navigation.dart';
import '../cubits/auth_cubit/auth_cubit.dart';
import '../cubits/auth_cubit/auth_state.dart';

class HomeScreen extends StatefulWidget {
  static const String route = 'home_route';
  const HomeScreen({Key? key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      final currentTimeProvider = Provider.of<CurrentTimeProvider>(context, listen: false);
      currentTimeProvider.startTimer();
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = (AuthCubit.get(context).state as Authenticated).user;
    return Scaffold(
      floatingActionButton: Ink(
        decoration: ShapeDecoration(
          color: dangerColor,
          shape: CircleBorder(),
        ),
        child: IconButton(
          icon: Icon(
            Icons.logout,
            color: Colors.white,
          ),
          onPressed: () async{
            await showDialog(
            context: context,
            barrierDismissible: false,
            builder: (context) => AlertDialog(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.zero,
              ),
              contentPadding: EdgeInsets.all(8),
              titlePadding:   EdgeInsets.all(8),
              insetPadding: EdgeInsets.all(8),
              actionsPadding: EdgeInsets.all(8),
              title: Text('End Shift'.tr(),),
              content: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Are you sure you want to end your shift?'.tr(), style: TextStyle(color: primaryColor),),
                  Divider(),
                  Text('Total completed violations: ${context.watch<CompletedViolationProvider>().violations.length}'.tr(), style: TextStyle(color: primaryColor),),
                  Text('Current date: ${context.watch<CurrentTimeProvider>().currentTime}'.tr(), style: TextStyle(color: primaryColor),),
                  Divider(),
                  Text('Start Date: ${context.watch<ShiftProvider>().shift?.startDate}'.tr(), style: TextStyle(color: primaryColor),),
                  Text('End Date: ${DateHelper.getCurrentDateTime()}'.tr(), style: TextStyle(color: primaryColor),),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('Cancel'.tr(), style: TextStyle(color: primaryColor),),
                ),
                TextButton(
                  onPressed: () async{
                    await context.read<ShiftProvider>().endShift();
                    await context.read<SavedViolationProvider>().clearAllSavedViolations();
                    await AuthCubit.get(context).logout();
                    navigateBack(context);
                  },
                  child: Text('End'.tr(), style: TextStyle(color: dangerColor),),
                ),
              ],
            ),
          );
          },
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            TemplateHeadlineText('welcome_user'.tr(args: [user.name.toString()])),
            8.h,
            TemplateParagraphText('Shift Start Time: ${context.watch<ShiftProvider>().shift?.startDate}'),
            const SizedBox(height: 20),
            _buildImageBanner(context),
            const SizedBox(height: 20),
            _buildInteractiveSections(context),
            Spacer(),
            TemplateParagraphText('total completed vl: ${context.watch<CompletedViolationProvider>().violations.length.toString()}'),
            SizedBox(height: 20),
            Consumer<CurrentTimeProvider>(
              builder: (context, value, child) {
                return TemplateParagraphText('current date: ${value.currentTime}');
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildImageBanner(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Text.rich(
        TextSpan(
          text: 'Gensolv | ',
          style: TextStyle(color: Colors.black, fontSize: 24),
          children: [
            TextSpan(
              text: 'Parksync As',
              style: TextStyle(color: primaryColor, fontSize: 24),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInteractiveSections(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Align(
          alignment: Alignment.center,
          child: _buildSection(
            context: context,
            icon: Icons.place,
            onTap: () => Navigator.pushNamed(context, PlacesScreen.route),
            backgroundColor: primaryColor,
          ),
        ),
        const SizedBox(height: 96),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildSection(
              context: context,
              icon: Icons.downloading,
              onTap: () => Navigator.pushNamed(context, SavedViolationScreen.route),
              backgroundColor: secondaryColor,
            ),
            const SizedBox(height: 16),
            _buildSection(
              context: context,
              icon: Icons.done_all,
              onTap: () => Navigator.pushNamed(context, CompletedViolationsScreen.route),
              backgroundColor: accentColor,
            ),
          ],
        )
      ],
    );
  }

  Widget _buildSection({
    required BuildContext context,
    required IconData icon,
    required VoidCallback onTap,
    required Color backgroundColor,
    double width = 100,
    double height = 100,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(100),
        ),
        child: Icon(icon, size: 36, color: Colors.white),
      ),
    );
  }
}
