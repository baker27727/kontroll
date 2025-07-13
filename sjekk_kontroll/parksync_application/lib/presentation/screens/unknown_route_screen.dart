import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

class UnknownRouteScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/unknown_route.png',
              width: 200,
            ),
            SizedBox(height: 16),
            Text(
              'unknown_route_message'.tr(),
              style: TextStyle(fontSize: 18),
              maxLines: 1,
            ),
          ],
        ),
      ),
    );
  }
}
