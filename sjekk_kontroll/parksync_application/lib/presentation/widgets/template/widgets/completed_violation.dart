import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/app_images.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/completed_ticket_control.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../../../data/models/completed_violation.dart';
import '../../../providers/completed_violation_provider.dart';


class CompletedViolationWidget extends StatelessWidget {
  final CompletedViolation violation;
  const CompletedViolationWidget({super.key, required this.violation});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async{
        context.read<CompletedViolationProvider>().setCurrentViolation(violation);
        navigateNamed(context, CompletedTicketControl.route);
      },
      child: Column(
        children: [
          Align(
            alignment: Alignment.centerRight,
            child: Container(
                padding: EdgeInsets.symmetric(horizontal: 4.0, vertical: 2.0),
                color: Colors.white,
                child: Text(violation.place.location, style: TextStyle(
                  color: primaryColor
                )),
              ),
          ),
          Container(
            padding: const EdgeInsets.all(4.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4.0),
              color: accentColor,
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                      width: 60,
                      height: 60,
                      padding: const EdgeInsets.all(8.0),
                      decoration: BoxDecoration(
                        image: DecorationImage(
                            image: AssetImage(
                                AppImages.cars['Unknown']),
                            fit: BoxFit.cover),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(4.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            TemplateParagraphText('${violation.plateInfo.plateNumber} - ${violation.plateInfo.carModel}'),
                            8.h,
                            TemplateParagraphText(
                                '${violation.plateInfo.carType} - ${violation.plateInfo.carDescription} - ${violation.plateInfo.manufactureYear}'),
                            12.h,
                            TemplateParagraphText('${violation.place.location} - ${violation.place.code}'),
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
