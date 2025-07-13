import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/app_images.dart';
import 'package:parksync_application/data/models/saved_violation.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/create_new_ticket.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../../../core/utils/navigation.dart';
import '../../../../core/utils/snackbar_utils.dart';
import '../../../providers/create_ticket_provider.dart';
import '../../../providers/saved_violation_provider.dart';
import '../components/template_option.dart';
import '../components/template_options_menu.dart';

class SavedViolationWidget extends StatelessWidget {
  final SavedViolation violation;
  const SavedViolationWidget({super.key, required this.violation});

    Future<void> showOptionsMenu(BuildContext context) async{
    await showDialog(
      context: context,
      builder: (context) {
        return TemplateOptionsMenu(
          headerText: 'options'.tr().toUpperCase(),
          headerColor: Colors.black.withOpacity(0.7),
          options: [
            TemplateOption(
              text: 'Edit'.tr().toUpperCase(),
              icon: Iconsax.edit,
              onTap: () async{
                final createTicketProvider = Provider.of<CreateTicketProvider>(context, listen: false);
                createTicketProvider.setCurrentUpdatingViolation(violation);
                createTicketProvider.setTicketMode(TicketMode.editing);
                navigateBack(context);
                navigateNamed(context, CreateNewTicket.route);
              },
            ),
            TemplateOption(
              text: 'copy'.tr().toUpperCase(),
              icon: Icons.copy,
              onTap: () async{
                await context.read<SavedViolationProvider>().copySavedViolation(violation: context.read<SavedViolationProvider>().currentViolation!);
                SnackbarUtils.showSnackbar(context, 'Violation was copied successfully');
                navigateBack(context);
              },
            ),
            TemplateOption(
              text: 'delete'.tr().toUpperCase(),
              icon: Icons.close,
              iconColor: dangerColor,
              textColor: dangerColor,
              onTap: () async{
                await context.read<SavedViolationProvider>().deleteSavedViolation(
                  violationId: context.read<SavedViolationProvider>().currentViolation!.id
                );

                Provider.of<CreateTicketProvider>(context, listen: false).clearAll();

                SnackbarUtils.showSnackbar(context, 'Violation was deleted successfully');
                navigateBack(context);
              },
            ),
            TemplateOption(
              text: 'back'.tr().toUpperCase(),
              icon: Icons.arrow_back,
              onTap: () {
                navigateBack(context);
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    // DateFormat formatter = DateFormat('dd.MM.yy HH:mm');
    return GestureDetector(
      onTap: () async{
        context.read<SavedViolationProvider>().setCurrentViolation(violation);
        await showOptionsMenu(context);
      },
      child: Column(
        children: [
          Align(
            alignment: Alignment.centerRight,
            child: Container(
                color: Colors.white,
                padding: EdgeInsets.symmetric(vertical:  2.0, horizontal: 4.0),
                child: Text(violation.place.location, style: TextStyle(
                  color: primaryColor
                ),),
              ),
          ),
          Container(
            color: accentColor,
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                      width: 60,
                      height: 60,
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8.0),
                        color: accentColor,
                        image: DecorationImage(
                            image: AssetImage(violation.plateInfo.carModel != null ? AppImages.cars[violation.plateInfo.carModel!.toLowerCase()] : AppImages.cars['Unknown']),
                            fit: BoxFit.cover),
                      ),
                      child: Center(
                        child: Text(
                          violation.plateInfo.carModel != null ? violation.plateInfo.carModel![0] : '?',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            TemplateParagraphText('${violation.plateInfo.plateNumber}  ${'${violation.plateInfo.carModel}'}'),
                            8.h,
                            TemplateParagraphText(
                                '${violation.plateInfo.carType}   ${violation.plateInfo.carDescription}   ${violation.plateInfo.manufactureYear}'),
                          ],
                        ),
                      ),
                    )
                  ],
                ),
                8.h,
                Align(
                  alignment: Alignment.centerRight,
                  child: TemplateParagraphText(violation.createdAt),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
