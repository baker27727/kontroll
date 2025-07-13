import 'package:back_button_interceptor/back_button_interceptor.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/data/models/place_login_model.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/domain/enums/registered_car_type.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/providers/shift_provider.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/place_completed_violations.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/place_saved_violations.dart';
import 'package:parksync_application/presentation/screens/places_screen.dart';
import 'package:parksync_application/presentation/screens/plate_keyboard_input.dart';
import 'package:parksync_application/presentation/screens/qrcode_scanner.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_dialog.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/normal_car_info.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/residential_car_info.dart';

import '../../data/models/registered_car_model.dart';
import '../providers/car_provider.dart';
import '../widgets/template/components/template_text_field.dart';
import '../widgets/template/widgets/empty_data_container.dart';

class PlaceHome extends StatefulWidget {
  static const String route = 'place_home';
  const PlaceHome({super.key});

  @override
  State<PlaceHome> createState() => _PlaceHomeState();
}

class _PlaceHomeState extends State<PlaceHome> {
  @override
  void initState() {
    super.initState();
    BackButtonInterceptor.add(myInterceptor);
    initializeRegisteredCars();
  }

  void initializeRegisteredCars() async {
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CarProvider>().fetchCarsByPlace(
        context.read<PlaceProvider>().selectedPlace!
      );
    });
  }

  @override
  void dispose() {
    BackButtonInterceptor.remove(myInterceptor);
    super.dispose();
  }

  Future<bool> myInterceptor(bool stopDefaultButtonEvent, RouteInfo info) async {
    if (info.currentRoute(context)!.settings.name != PlaceHome.route) {
      return false;
    }

    bool? shouldLeave = await showDialog(
        context: context,
        builder: (context) {
          return TemplateConfirmationDialog(
              onConfirmation: () async {
                Navigator.pop(context, true);
              },
              title: 'signout'.tr().toUpperCase(),
              message: 'signout_message_with_no_place'.tr());
        });
        
    if (shouldLeave != null && shouldLeave) {
      final placeProvider = context.read<PlaceProvider>();
      PlaceLogin placeLogin = PlaceLogin(
          placeName: placeProvider.selectedPlace!.location,
          placeId: placeProvider.selectedPlace!.id.toString(),
          loginTime: placeProvider.selectedPlaceLoginTime!.toLocal().toString(),
          logoutTime: DateHelper.getCurrentDateTime()
        );

      await context.read<ShiftProvider>().storePlaceLogin(placeLogin);
      Provider.of<PlaceProvider>(context, listen: false).logoutFromCurrentPlace();
      Navigator.of(context).popUntil((route) => route.settings.name == PlacesScreen.route);
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    final PlaceProvider placeProvider = Provider.of<PlaceProvider>(context);
    Place place = placeProvider.selectedPlace!;
    DateFormat format = DateFormat('HH:mm');
    return SafeArea(
      child: Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(12.0),
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        place.location,
                        style: const TextStyle(fontSize: 18, color: textColor),
                      ),
                                    Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Text(
                  format.format(placeProvider.startTime!),
                  style: const TextStyle(fontSize: 18.0, color: textColor),
                                    ),
                                    12.w,
                                    GestureDetector(
                  onTap: () {
                    Provider.of<PlaceProvider>(context, listen: false).restartStartTime();
                  },
                  child: const Icon(
                    Icons.restart_alt,
                    size: 24,
                  ),
                                    )
                                  ],
                                ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: (){
                          Navigator.of(context).pushNamed(QrCodeScanner.route);
                        },
                        child: Container(
                          width: 48,
                          height: 48,
                          color: primaryColor,
                          padding: EdgeInsets.all(4),
                          child: Icon(Icons.qr_code_scanner_outlined, color: Colors.white, size: 30,),
                        ),
                      ),
                      4.w,
                      GestureDetector(
                        onTap: (){
                          navigateNamed(context, PlaceCompletedViolations.route);
                        },
                        child: Container(
                          width: 48,
                          height: 48,
                          color: primaryColor,
                          padding: EdgeInsets.all(4),
                          child: Icon(Iconsax.verify, color: Colors.white, size: 30,),
                        ),
                      ),
                      4.w,
                      GestureDetector(
                        onTap: (){
                          navigateNamed(context, PlaceSavedViolations.route);
                        },
                        child: Container(
                          width: 48,
                          height: 48,
                          color: primaryColor,
                          padding: EdgeInsets.all(4),
                          child: Icon(Icons.archive, color: Colors.white, size: 30,),
                        ),
                      ),
                      4.w,
                      GestureDetector(
                        onTap: (){
                          context.read<CreateTicketProvider>().setTicketMode(TicketMode.creating);
                          context.read<CreateTicketProvider>().clearAll();
                          context.read<CreateTicketProvider>().setCurrentUpdatingViolation(null);
                          Navigator.of(context).pushNamed(PlateKeyboardInputScreen.route);
                        },
                        child: Container(
                          width: 48,
                          height: 48,
                          color: primaryColor,
                          padding: EdgeInsets.all(4),
                          child: Icon(Icons.add, color: Colors.white, size: 30,),
                        ),
                      ),
                      4.w,
                  
                    ],
                  )
                ],
              ),
            ),
                          8.h,
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: NormalTemplateTextFieldWithIcon(
                      onChanged: (val) {
                        Provider.of<CarProvider>(context, listen: false).searchCars(val);
                      },
                      icon: Icons.search,
                      hintText: 'search'.tr().toUpperCase()),
                    ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Consumer<CarProvider>(
                      builder: (BuildContext context, CarProvider value, Widget? child) {
                        if (value.errorState) {
                          return Center(
                            child: TemplateHeaderText(
                              value.errorMessage,
                            ),
                          );
                        }
                
                        if (value.cars.isEmpty) {
                          return EmptyDataContainer(
                            text: 'no_registered_cars'.tr(),
                          );
                        }
                
                        List<RegisteredCar> cars = value.cars;
                
                        return ListView.separated(
                          separatorBuilder: (context, index) {
                            return 12.h;
                          },
                          itemCount: cars.length,
                          itemBuilder: ((context, index) {
                            RegisteredCar car = cars[index];
                                              
                            if(car.registeredCarType == RegisteredCarType.normal) {
                              return NormalCarInfo(registeredCar: car);
                            }else{
                              return ResidentialCarInfo(registeredCar: car);
                            }
                          }),
                        );
                      },
                    ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
