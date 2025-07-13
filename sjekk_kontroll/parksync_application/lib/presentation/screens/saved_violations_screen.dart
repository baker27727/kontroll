import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/data/models/saved_violation.dart';
import 'package:parksync_application/presentation/providers/saved_violation_provider.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/empty_data_container.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/saved_violation.dart';


class SavedViolationScreen extends StatefulWidget {
  static const String route = 'saved_violations';
  @override
  State<SavedViolationScreen> createState() => _SavedViolationsScreenState();
}

class _SavedViolationsScreenState extends State<SavedViolationScreen> {
  @override
  void initState() {
    super.initState();
    initializeSavedViolations();
  }

  void initializeSavedViolations() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      await context.read<SavedViolationProvider>().getSavedViolations();
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Consumer<SavedViolationProvider>(
          builder: (context, provider, child) {
            if (provider.errorMessage != null) {
              return Center(
                child: Text(provider.errorMessage!),
              );
            }
      
            if (provider.violations.isEmpty) {
                return EmptyDataContainer(
                  text: 'no_saved_vls'.tr(),
                );
              }
      
              return ListView.separated(
                padding: const EdgeInsets.all(12.0),
                separatorBuilder: (context, index) => const SizedBox(height: 12.0),
                itemCount: provider.violations.length,
                itemBuilder: (context, index) {
                  SavedViolation violation = provider.violations[index];
      
                  return SavedViolationWidget(violation: violation,);
                },
              );
          },
        ),
      ),
    );
  }
}
