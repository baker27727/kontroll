import 'package:flutter/material.dart';

import 'colors_theme.dart';

ButtonStyle normalButtonStyle = ElevatedButton.styleFrom(
  backgroundColor: accentColor,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
  elevation: 0,
);

ButtonStyle fullWidthButtonStyle =
    normalButtonStyle.copyWith(minimumSize: MaterialStatePropertyAll(Size(double.infinity, 40)));

ButtonStyle lightButtonStyle = normalButtonStyle.copyWith(backgroundColor: MaterialStatePropertyAll(Colors.white));

ButtonStyle dangerButtonStyle = normalButtonStyle.copyWith(backgroundColor: MaterialStatePropertyAll(dangerColor));

ButtonStyle infoButtonStyle = normalButtonStyle.copyWith(backgroundColor: MaterialStatePropertyAll(secondaryColor));

TextStyle normalButtonTextStyle = TextStyle(fontSize: 18, color: Colors.white);

TextStyle lighteButtonTextStyle = TextStyle(fontSize: 18, color: accentColor);

/* ================= Outlined Button Style ================= */

final ButtonStyle outlinedButtonStyle = OutlinedButton.styleFrom(
  backgroundColor: primaryColor,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.zero,
  ),
  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
  side: BorderSide(color: primaryColor),
);

final ButtonStyle outlinedDangerButtonStyle = OutlinedButton.styleFrom(
  backgroundColor: dangerColor,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.zero,
  ),
  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
  side: BorderSide(color: dangerColor),
);

/* ================== Text Button Theme ======================*/

final ButtonStyle textButtonStyle = TextButton.styleFrom(
  backgroundColor: Colors.transparent,
  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
  textStyle: TextStyle(fontSize: 16),
);
