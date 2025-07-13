import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/presentation/providers/completed_violation_provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';

import '../../../data/models/completed_violation.dart';
import '../../widgets/template/widgets/completed_violation.dart';
import '../../widgets/template/widgets/empty_data_container.dart';

class PlaceCompletedViolations extends StatefulWidget {
  static const String route = 'place_completed_violations';
  const PlaceCompletedViolations({super.key});

  @override
  State<PlaceCompletedViolations> createState() => _PlaceCompletedViolationsState();
}

class _PlaceCompletedViolationsState extends State<PlaceCompletedViolations> {
  @override
  void initState() {
    super.initState();
    initializeCompletedViolations();
  }

  void initializeCompletedViolations() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final placeId = context.read<PlaceProvider>().selectedPlace!.id;
      await context.read<CompletedViolationProvider>().getCompletedViolationsByPlace(placeId: placeId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<CompletedViolationProvider>(
        builder: (context, provider, child) {
          if(provider.errorMessage != null){
            return Center(
              child: TemplateHeadlineText(provider.errorMessage!),
            );
          }

          if(provider.violations.isEmpty){
              return EmptyDataContainer(
                text: 'No completed violations',
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
                  CompletedViolation violation = provider.violations[index];

                  return GestureDetector(
                    child: CompletedViolationWidget(violation: violation));
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