import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/data/models/place_model.dart';
import 'package:parksync_application/data/models/registered_car_model.dart';
import 'package:parksync_application/presentation/providers/car_provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/empty_data_container.dart';

import '../widgets/template/components/template_text_field.dart';

class BoardsScreen extends StatefulWidget {
  static const String route = 'boards_screen';

  @override
  State<BoardsScreen> createState() => _BoardsScreenState();
}

class _BoardsScreenState extends State<BoardsScreen> {
  @override
  void initState() {
    super.initState();
    initializeBoards();
  }

  void initializeBoards() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      Place place = Provider.of<PlaceProvider>(context, listen: false).selectedPlace!;
      await Provider.of<CarProvider>(context, listen: false).fetchCarsByPlace(place);
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              NormalTemplateTextFieldWithIcon(
                  onChanged: (val) {
                    Provider.of<CarProvider>(context, listen: false).searchCars(val);
                  },
                  icon: Icons.search,
                  hintText: 'search'.tr().toUpperCase()),
              12.h,
              Expanded(
                child: Consumer<CarProvider>(
                  builder: (BuildContext context, CarProvider value, Widget? child) {
                    // if (value.loadingState) {
                    //   return const Center(
                    //     child: CircularProgressIndicator(),
                    //   );
                    // }

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

                    return Expanded(
                      child: ListView.separated(
                        separatorBuilder: (context, index) {
                          return 12.h;
                        },
                        itemCount: cars.length,
                        itemBuilder: ((context, index) {
                          RegisteredCar car = cars[index];

                          // return RegisteredCarInfo(registeredCar: car);
                        }),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
