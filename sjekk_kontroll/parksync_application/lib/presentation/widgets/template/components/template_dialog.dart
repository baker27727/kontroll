import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../theme/dialog_theme.dart';
import 'template_button.dart';

class TemplateSuccessDialog extends StatelessWidget {
  final String title;
  final String message;

  const TemplateSuccessDialog({super.key, required this.title, required this.message});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
      ),
      contentPadding: EdgeInsets.zero,
      content: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: successColor,
              padding: EdgeInsets.symmetric(vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Icon(
                    Icons.check,
                    color: successColor,
                    size: 50,
                  ),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            TemplateTextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog on button press
              },
              text: 'OK',
            ),
          ],
        ),
      ),
    );
  }
}

class TemplateFailureDialog extends StatelessWidget {
  final String title;
  final String message;

  const TemplateFailureDialog({super.key, required this.title, required this.message});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
      ),
      contentPadding: EdgeInsets.zero,
      content: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: dangerColor,
              padding: EdgeInsets.symmetric(vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Icon(
                    Icons.close,
                    color: dangerColor,
                    size: 50,
                  ),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            TemplateTextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog on button press
              },
              text: 'OK',
            ),
          ],
        ),
      ),
    );
  }
}

class TemplateInfoDialog extends StatelessWidget {
  final String title;
  final String message;

  const TemplateInfoDialog({super.key, required this.title, required this.message});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
      ),
      contentPadding: EdgeInsets.zero,
      content: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(0.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: primaryColor,
              padding: EdgeInsets.symmetric(vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Icon(
                    Icons.info_outline_rounded,
                    color: primaryColor,
                    size: 50,
                  ),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            TemplateTextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog on button press
              },
              text: 'OK',
            ),
          ],
        ),
      ),
    );
  }
}

class TemplateConfirmationDialog extends StatelessWidget {
  final String title;
  final String message;
  final VoidCallback onConfirmation;
  VoidCallback? onCancel;

  TemplateConfirmationDialog(
      {super.key, required this.onConfirmation, this.onCancel, required this.title, required this.message});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.zero,
      ),
      contentPadding: EdgeInsets.zero,
      content: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(0.0),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: primaryColor,
              padding: EdgeInsets.symmetric(vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Icon(
                    Icons.info_outline_rounded,
                    color: primaryColor,
                    size: 50,
                  ),
                  Text(
                    message,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TemplateTextButton(
                  onPressed: onCancel ??
                      () {
                        Navigator.of(context).pop(false); // Close the dialog on button press
                      },
                  textColor: Colors.red,
                  text: 'cancel'.tr().toUpperCase(),
                ),
                TemplateTextButton(
                  onPressed: onConfirmation,
                  textColor: primaryColor,
                  text: 'ok'.tr().toUpperCase(),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class TemplateInputDialog extends StatefulWidget {
  final String title;
  final String hintText;
  final Function(String)? onSubmitted;
  final VoidCallback? onCancel;
  final String? pattern;
  final TextInputType? inputType;

  TemplateInputDialog({
    Key? key,
    required this.title,
    required this.hintText,
    this.onSubmitted,
    this.onCancel,
    this.pattern,
    this.inputType,
  }) : super(key: key);

  @override
  _TemplateInputDialogState createState() => _TemplateInputDialogState();
}

class _TemplateInputDialogState extends State<TemplateInputDialog> {
  late TextEditingController _textController;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      contentPadding: EdgeInsets.zero,
      content: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: primaryColor,
              padding: EdgeInsets.symmetric(vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    widget.title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 12.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: NormalTemplateTextField(
                hintText: widget.hintText,
                controller: _textController,
                pattern: widget.pattern,
                inputType: widget.inputType,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TemplateTextButton(
                  onPressed: widget.onCancel ??
                      () {
                        Navigator.of(context).pop(); // Close the dialog on button press
                      },
                  textColor: Colors.red,
                  text: 'cancel'.tr().toUpperCase(),
                ),
                TemplateTextButton(
                  onPressed: () {
                    if (widget.onSubmitted != null) {
                      widget.onSubmitted!(_textController.text);
                    }
                    Navigator.of(context).pop(); // Close the dialog on button press
                  },
                  text: 'ok'.tr().toUpperCase(),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
