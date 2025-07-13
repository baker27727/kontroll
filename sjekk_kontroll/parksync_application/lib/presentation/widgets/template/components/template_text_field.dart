import 'package:flutter/material.dart';

import '../theme/text_field_theme.dart';

class NormalTemplateTextField extends StatelessWidget {
  Function(String)? onChanged;
  TextEditingController? controller;
  String? Function(String?)? validator;
  final String hintText;
  final int? lines;
  bool? isReadOnly;
  bool secured;
  TextInputType? keyboardType;
  TextInputAction? textInputAction;
  Widget? suffixIcon;
  String? pattern;
  TextInputType? inputType;

  NormalTemplateTextField({
    Key? key,
    this.secured = false,
    this.validator,
    this.lines,
    this.isReadOnly = false,
    this.onChanged,
    this.controller,
    required this.hintText,
    this.keyboardType,
    this.textInputAction,
    this.suffixIcon,
    this.pattern,
    this.inputType,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      readOnly: isReadOnly ?? false,
      obscureText: secured,
      validator: (value) {
        if (pattern != null) {
          final regex = RegExp(pattern!);
          if (!regex.hasMatch(value ?? '')) {
            return 'Invalid format';
          }
        }
        return validator?.call(value);
      },
      onChanged: onChanged,
      maxLines: lines,
      textAlignVertical: TextAlignVertical.center,
      keyboardType: inputType ?? keyboardType,
      textInputAction: textInputAction,
      decoration: textFieldDecorationTheme.copyWith(
        hintText: hintText,
        suffixIcon: suffixIcon,
      ),
      style: textFieldTextStyle,
    );
  }
}

class NormalTemplateTextFieldWithIcon extends StatelessWidget {
  final Function(String)? onChanged;
  final TextEditingController? controller;
  final IconData icon;
  final String hintText;
  final int? lines;
  String? Function(String?)? validator;
  bool secured;

  NormalTemplateTextFieldWithIcon(
      {super.key,
      this.lines = 1,
      this.onChanged,
      this.controller,
      required this.icon,
      required this.hintText,
      this.secured = false,
      this.validator});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      onChanged: onChanged,
      obscureText: secured,
      maxLines: lines,
      validator: validator,
      textAlignVertical: TextAlignVertical.center,
      decoration: textFieldDecorationTheme.copyWith(hintText: hintText.toUpperCase(), prefixIcon: Icon(icon)),
      style: textFieldTextStyle,
    );
  }
}

class SecondaryTemplateTextField extends StatelessWidget {
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final String hintText;
  final int? lines;

  String? Function(String?)? validator;
  bool secured;
  bool? disabled;

  Icon? prefixIcon;
  Icon? suffixIcon;

  VoidCallback? onSuffixIconTapped;
  VoidCallback? onPrefixIconTapped;

  SecondaryTemplateTextField(
      {super.key,
      this.lines,
      this.onChanged,
      this.controller,
      required this.hintText,
      this.validator,
      this.secured = false,
      this.disabled = false,
      this.prefixIcon,
      this.suffixIcon,
      this.onPrefixIconTapped,
      this.onSuffixIconTapped});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      maxLines: lines,
      textAlignVertical: TextAlignVertical.center,
      onChanged: onChanged,
      readOnly: disabled ?? false,
      decoration: anotherStyleTextFieldDecorationTheme.copyWith(
          hintText: hintText.toUpperCase(),
          isDense: true,
          isCollapsed: true,
          prefixIcon: prefixIcon != null
              ? GestureDetector(
                  onTap: onPrefixIconTapped,
                  child: prefixIcon,
                )
              : null,
          suffixIcon: suffixIcon != null
              ? GestureDetector(
                  onTap: onSuffixIconTapped,
                  child: suffixIcon,
                )
              : null),
      style: anotherStyleTextFieldTextStyle,
    );
  }
}

class SecondaryTemplateTextFieldWithIcon extends StatelessWidget {
  final TextEditingController? controller;
  final Function(String)? onChanged;
  final String hintText;
  final int? lines;
  final IconData icon;

  String? Function(String?)? validator;
  bool secured;
  bool? disabled;

  SecondaryTemplateTextFieldWithIcon(
      {super.key,
      this.lines = 1,
      this.onChanged,
      this.controller,
      required this.hintText,
      this.validator,
      this.secured = false,
      required this.icon,
      this.disabled = false});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      maxLines: lines,
      textAlignVertical: TextAlignVertical.center,
      onChanged: onChanged,
      readOnly: disabled ?? false,
      validator: validator,
      decoration:
          anotherStyleTextFieldDecorationTheme.copyWith(hintText: hintText.toUpperCase(), prefixIcon: Icon(icon)),
      style: anotherStyleTextFieldTextStyle,
    );
  }
}
