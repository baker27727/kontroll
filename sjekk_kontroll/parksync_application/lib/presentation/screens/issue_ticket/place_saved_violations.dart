import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/data/models/saved_violation.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/providers/saved_violation_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/saved_violation.dart';
import '../../widgets/template/widgets/empty_data_container.dart';

class PlaceSavedViolations extends StatefulWidget {
  static const String route = 'place_saved_violations';
  const PlaceSavedViolations({super.key});

  @override
  State<PlaceSavedViolations> createState() => _PlaceSavedViolationsState();
}

class _PlaceSavedViolationsState extends State<PlaceSavedViolations> {
  @override
  void initState() {
    super.initState();
    initializeSavedViolations();
  }

  void initializeSavedViolations() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final placeId = context.read<PlaceProvider>().selectedPlace!.id;
      await context.read<SavedViolationProvider>().getSavedViolationsByPlace(placeId: placeId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<SavedViolationProvider>(
        builder: (context, provider, child) {
          if(provider.errorMessage != null){
            return Center(
              child: TemplateHeadlineText(provider.errorMessage!),
            );
          }

          if(provider.violations.isEmpty){
              return EmptyDataContainer(
                text: 'No Saved violations',
              );
            }

            return Container(
              padding: EdgeInsets.all(12.0),
              child: ListView.separated(
                separatorBuilder: (context, index) {
                  return 8.h;
                },
                itemCount: provider.violations.length,
                itemBuilder: (context, index) {
                  SavedViolation violation = provider.violations[index];

                  return GestureDetector(
                    child: SavedViolationWidget(violation: violation));
                  },
              ),
            );
        },
      )
    );
  }
}

/*


*/