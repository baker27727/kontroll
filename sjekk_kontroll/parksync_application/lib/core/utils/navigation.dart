import 'package:flutter/material.dart';

navigateNamed(BuildContext context,String route, {RouteSettings? settings}) {
  Navigator.of(context).pushNamed(
    route
  );
}

void navigateReplacementNamed(BuildContext context,String route, {RouteSettings? settings}) {
  Navigator.of(context).pushReplacementNamed(
    route
  );
}

navigateBack(BuildContext context) {
  Navigator.of(context).pop();
}