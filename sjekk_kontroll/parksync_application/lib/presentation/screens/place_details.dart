import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/screens/place_home.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import '../widgets/template/components/template_text.dart';

class PlaceDetailsScreen extends StatelessWidget {
  static const String route = 'place_details';
  // final Place place;

  @override
  Widget build(BuildContext context) {
    final placeProvider = context.read<PlaceProvider>();

    final DateFormat dateFormat = DateFormat('HH:mm:ss');
    DateTime date = DateTime.now().toLocal();
    final currentDate = dateFormat.format(date);
    final endDate = dateFormat.format(date.add(const Duration(minutes: 10)));

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                height: 24.0,
              ),
              TemplateHeaderText(
                'location_policy'.tr(),
                color: secondaryColor,
              ),
              const SizedBox(
                height: 12,
              ),
              TemplateParagraphText('from'.tr(args: [currentDate])),
              const SizedBox(
                height: 12,
              ),
              TemplateParagraphText('to'.tr(args: [endDate])),
              const Divider(
                thickness: 3,
              ),
              const SizedBox(
                height: 12,
              ),
              Text(
                placeProvider.selectedPlace!.policy,
                style: const TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 16),
              Align(
                alignment: Alignment.centerRight,
                child: NormalTemplateButton(
                  onPressed: () {
                    Provider.of<PlaceProvider>(context, listen: false).startTime = DateTime.now().toLocal();
                    if (context.mounted) {
                      Navigator.pushNamed(context, PlaceHome.route);
                    }
                  },
                  text: 'continue'.tr().toUpperCase(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
