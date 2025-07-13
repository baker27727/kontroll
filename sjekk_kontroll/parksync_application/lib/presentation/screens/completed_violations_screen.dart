import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/presentation/cubits/auth_cubit/auth_cubit.dart';
import 'package:parksync_application/presentation/cubits/auth_cubit/auth_state.dart';
import 'package:parksync_application/presentation/providers/completed_violation_provider.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/completed_violation.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/empty_data_container.dart';

import '../../data/models/completed_violation.dart';

class CompletedViolationsScreen extends StatefulWidget {
  static const String route = 'completed_violations';

  const CompletedViolationsScreen({super.key});
  @override
  State<CompletedViolationsScreen> createState() => _CompletedViolationsScreenState();
}

class _CompletedViolationsScreenState extends State<CompletedViolationsScreen> {
  @override
  void initState() {
    super.initState();
    initializeCompletedViolations();
  }

  void initializeCompletedViolations() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final userId = (AuthCubit.get(context).state as Authenticated).user.id;
      await context.read<CompletedViolationProvider>().getCompletedViolations(userId: userId);
    });
  }


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Consumer<CompletedViolationProvider>(
          builder: (context, provider, child) {
            if(provider.errorMessage != null){
              return Center(
                child: Text(provider.errorMessage!),
              );
            }
      
            if (provider.violations.isEmpty) {
              return EmptyDataContainer(
                text: 'No completed violations',
              );
            }
            List<CompletedViolation> violations = provider.violations;
      
            return Padding(
              padding: const EdgeInsets.all(12.0),
              child: ListView.separated(
                itemCount: violations.length,
                itemBuilder: (_context, index) {
                  CompletedViolation violation = violations[index];
                  return CompletedViolationWidget(violation: violation);
                },
                separatorBuilder: (context, index) {
                  return SizedBox(
                    height: 12.0,
                  );
                },
              ),
            );
          }
        )
      ),
    );
  }
}
