import 'package:flutter/material.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../theme/snackbar_theme.dart';

SnackBar TemplateSuccessSnackbar(String message) {
  return SnackBar(
    content: Padding(
      padding: snackbarContentPadding,
      child: Text(
        message,
        style: snackbarTextStyle,
      ),
    ),
    dismissDirection: DismissDirection.horizontal,
    backgroundColor: successColor,
    behavior: SnackBarBehavior.floating,
  );
}

SnackBar TemplateErrorSnackbar(String message) {
  return SnackBar(
    content: Padding(
      padding: snackbarContentPadding,
      child: Text(
        message,
        style: snackbarTextStyle,
      ),
    ),
    dismissDirection: DismissDirection.horizontal,
    backgroundColor: dangerColor,
    behavior: SnackBarBehavior.floating,
  );
}

SnackBar TemplateInfoSnackbar(String message) {
  return SnackBar(
    content: Padding(
      padding: snackbarContentPadding,
      child: Text(
        message,
        style: snackbarTextStyle,
      ),
    ),
    dismissDirection: DismissDirection.horizontal,
    backgroundColor: accentColor,
    behavior: SnackBarBehavior.floating,
  );
}
