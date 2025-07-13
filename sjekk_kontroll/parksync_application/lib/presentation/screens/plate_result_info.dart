import 'package:back_button_interceptor/back_button_interceptor.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/constants/app_images.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/data/models/plate_info_model.dart';
import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/create_new_ticket.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/string_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import '../widgets/template/components/template_text.dart';

class PlateResultInfo extends StatefulWidget {
  static const String route = 'plate_result_info';

  @override
  State<PlateResultInfo> createState() => _PlateResultInfoState();
}

class _PlateResultInfoState extends State<PlateResultInfo> {
  @override
  void initState() {
    super.initState();
    BackButtonInterceptor.add(myInterceptor);
  }

  @override
  void dispose() {
    BackButtonInterceptor.remove(myInterceptor);
    super.dispose();
  }

  Future<bool> myInterceptor(bool stopDefaultButtonEvent, RouteInfo info) async {
    // context.read<CreateViolationProvider>().clearAll();
    return false;
  }

  DateFormat formatter = DateFormat('DD.MM.yy HH:mm');

  @override
  Widget build(BuildContext context) {
    final PlateInfo plateInfo = context.read<CreateTicketProvider>().plateInfo;
    final RegisteredCar? registeredCar = context.read<CreateTicketProvider>().registeredCar;
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            const SizedBox(
              height: 36,
            ),
            Container(
              color: accentColor,
              padding: const EdgeInsets.all(8.0),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    color: Colors.black45,
                    height: 130,
                    padding: const EdgeInsets.all(12.0),
                    child: const Icon(
                      FontAwesome.car,
                      size: 30,
                      color: Colors.white,
                    ),
                  ),
                  12.w,
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        TemplateHeadlineText('car_info'.tr(), color: primaryColor,),
                        const Divider(
                          thickness: 2,
                          color: primaryColor,
                        ),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  plateInfo.plateNumber.toParagraph(),
                                  (plateInfo.carType ?? '').toParagraph(),
                                  (plateInfo.carDescription ?? '').toParagraph(),
                                ],
                              ),
                            ),
                            12.w,
                            if (plateInfo.carModel != null)
                              Image.asset(
                                AppImages.cars[plateInfo.carModel!.toLowerCase()] ?? AppImages.cars['Unknown'],
                                width: 80,
                                height: 80,
                              )
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
            12.h,
            Container(
              color: accentColor,
              padding: const EdgeInsets.all(8.0),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    color: dangerColor,
                    height: 130,
                    padding: const EdgeInsets.all(8.0),
                    child: const Icon(
                      FontAwesome.close,
                      size: 36,
                      color: Colors.white,
                    ),
                  ),
                  12.w,
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        TemplateHeadlineText('no_valid_parking'.tr(), color: primaryColor,),
                        const Divider(
                          thickness: 2,
                          color: primaryColor,
                        ),
                        Wrap(
                          children: [
                            TemplateParagraphText('no_valid_parking_message'.tr()),
                            4.h,
                            TemplateParagraphText('sjekk_team'.tr()),
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
            12.h,
            if (registeredCar != null)
              Container(
                padding: const EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                  color: accentColor,

                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      color: primaryColor,
                      height: 120,
                      padding: const EdgeInsets.all(8.0),
                      child: const Icon(FontAwesome.registered, size: 36, color: Colors.white),
                    ),
                    12.w,
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              TemplateParagraphText('registered_car_info'.tr().toUpperCase(), color: primaryColor,),
                              TemplateParagraphText(registeredCar.registeredCarType.name, color: primaryColor,),
                            ],
                          ),
                          const Divider(thickness: 2, color: primaryColor,),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              TemplateParagraphText(registeredCar.registrationDate),
                              4.h,
                              Icon(Icons.arrow_downward),
                              4.h,
                              TemplateParagraphText(registeredCar.expireDate),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            12.h,
//             if (context.read<CreateTicketProvider>().ch != null)
//               GestureDetector(
//                 onTap: () async {
//                   Provider.of<ViolationDetailsProvider>(context, listen: false)
//                       .setViolation(c
//                   Navigator.of(context).push(Materialontext.read<CreateTicketProvider>().existingSavedViolation!);
// PageRoute(builder: (context) => ViolationDetailsScreen()));
//                 },
//                 child: Container(
//                   color: Colors.black12.withOpacity(0.1),
//                   padding: const EdgeInsets.all(8.0),
//                   child: Row(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Container(
//                         color: primaryColor,
//                         height: 130,
//                         padding: const EdgeInsets.all(8.0),
//                         child: const Icon(
//                           Icons.saved_search,
//                           size: 36,
//                           color: Colors.white,
//                         ),
//                       ),
//                       12.w,
//                       Expanded(
//                         child: Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           mainAxisAlignment: MainAxisAlignment.start,
//                           children: [
//                             'saved_vl_exists'.tr().toHeadline(),
//                             const Divider(
//                               thickness: 2,
//                             ),
//                             Row(
//                               crossAxisAlignment: CrossAxisAlignment.end,
//                               children: [
//                                 Expanded(
//                                   child: TemplateParagraphText(
//                                       context.read<CreateTicketProvider>().existingSavedViolation!.createdAt),
//                                 ),
//                                 Align(
//                                   alignment: Alignment.bottomRight,
//                                   child: Icon(
//                                     Icons.chevron_right,
//                                     size: 30,
//                                     color: Colors.black45,
//                                   ),
//                                 )
//                               ],
//                             )
//                           ],
//                         ),
//                       )
//                     ],
//                   ),
//                 ),
//               ),
            const Spacer(),
            InfoTemplateButton(
              width: double.infinity,
              onPressed: () async {
                navigateReplacementNamed(context, CreateNewTicket.route);
              },
              text: 'continue'.tr().toUpperCase(),
            )
          ],
        ),
      ),
    );
  }
}
