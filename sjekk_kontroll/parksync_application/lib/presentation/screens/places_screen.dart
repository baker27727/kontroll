import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/empty_data_container.dart';

import '../../data/models/place_model.dart';
import '../widgets/template/components/template_text.dart';
import 'place_home.dart';

class PlacesScreen extends StatefulWidget {
  static const String route = 'places_screen';

  const PlacesScreen({super.key});
  @override
  State<PlacesScreen> createState() => _PlacesScreenState();
}

class _PlacesScreenState extends State<PlacesScreen> {
  @override
  void initState() {
    super.initState();
    initializePlaces();
  }

  void initializePlaces() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final placeProvider = Provider.of<PlaceProvider>(context, listen: false);
      await placeProvider.fetchPlaces();

      if (placeProvider.errorState) {
        if (mounted) {
          SnackbarUtils.showSnackbar(context, placeProvider.errorMessage, type: SnackBarType.failure);
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            20.h,
            NormalTemplateTextFieldWithIcon(
                onChanged: (val) {
                  context.read<PlaceProvider>().searchPlaces(val);
                },
                icon: Icons.search,
                hintText: 'search'.tr()),
            12.h,
            Consumer<PlaceProvider>(
              builder: (BuildContext context, PlaceProvider value, Widget? child) {
                if (value.errorState) {
                  return Center(
                    child: Text(value.errorMessage),
                  );
                }

                List<Place> places = value.places;

                if (places.isEmpty) {
                  return Expanded(
                    child: EmptyDataContainer(
                      text: 'no_places'.tr(),
                    ),
                  );
                }

                return Column(
                  children: [
                    ListView.separated(
                      padding: EdgeInsets.zero,
                      separatorBuilder: ((context, index) {
                        return 6.h;
                      }),
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: places.length,
                      itemBuilder: (context, index) {
                        Place place = places[index];

                        return                     ListTile(
                      tileColor: accentColor,
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                      leading: Icon(Iconsax.location, color: primaryColor, size: 36,),
                      title: Text('${place.location} - ${place.code}\n',),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.zero,
                      ),
                      onTap: () async {
                            value.setSelectedPlace(place);
                            value.setSelectedPlaceLoginTime();

                            await showDialog(
                                context: context,
                                barrierDismissible: false,
                                builder: (context) {
                                  return AlertDialog(
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(0.0)),
                                    contentPadding: const EdgeInsets.all(12.0),
                                    insetPadding: EdgeInsets.zero,
                                    actionsPadding: EdgeInsets.zero,
                                    backgroundColor: const Color.fromARGB(255, 241, 241, 241),
                                    content: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        TemplateHeadlineText(
                                          'location_policy'.tr(),
                                          color: secondaryColor,
                                        ),
                                        const SizedBox(
                                          height: 12,
                                        ),
                                        TemplateParagraphText('from'.tr(args: [
                                          DateHelper.getCurrentDateTime()
                                        ])),
                                        const SizedBox(
                                          height: 12,
                                        ),
                                        TemplateParagraphText('to'
                                            .tr(args: [
                                              DateHelper.addMinutes(DateHelper.now(), 10)
                                            ])),
                                        const Divider(
                                          thickness: 3,
                                        ),
                                        const SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          place.policy,
                                          style: const TextStyle(fontSize: 16),
                                        ),
                                      ],
                                    ),
                                    actions: [
                                      TextButton(
                                        child: const Text('Agree', style: TextStyle(color: primaryColor)),
                                        onPressed: () {
                                          Navigator.of(context).pop();
                                        },
                                      ),
                                    ],
                                  );
                                });
                            Provider.of<PlaceProvider>(context, listen: false).startTime = DateTime.now().toLocal();
                            Navigator.pushNamed(context, PlaceHome.route);
                          },
                      trailing: Icon(Iconsax.arrow_right, color: primaryColor, size: 28,),
                    );
                      },
                    ),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
