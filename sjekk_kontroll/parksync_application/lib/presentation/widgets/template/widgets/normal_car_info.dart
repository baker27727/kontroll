import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../../../data/models/registered_car_model.dart';

class NormalCarInfo extends StatelessWidget {
  final RegisteredCar registeredCar;
  const NormalCarInfo({super.key, required this.registeredCar});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: primaryColor,
        borderRadius: BorderRadius.circular(4.0),
      ),
      padding: const EdgeInsets.all(4.0),
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              4.h,
              Column(
                crossAxisAlignment:   CrossAxisAlignment.start,
                children: [
                  TemplateParagraphText(registeredCar?.registrationDate ?? '' , color: Colors.white,),
                  Icon(Icons.arrow_downward, color: Colors.white,),
              TemplateParagraphText(registeredCar.expireDate, color: Colors.white,),
                ],
              ),
              4.h,
              TemplateParagraphText('pl'.tr(args: [registeredCar.plateNumber]), color: Colors.white,),
              4.h,
              TemplateParagraphText('${context.read<PlaceProvider>().selectedPlace?.location} - ${context.read<PlaceProvider>().selectedPlace?.code}', color: Colors.white,),
            ],
          ),
    
          Align(
            alignment: Alignment.topRight,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 4, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text('Public', style: TextStyle(color: primaryColor)),
            ),
          )
        ],
      ),
    );
  }
}
