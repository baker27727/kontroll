import 'package:flutter/material.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';

import '../../../../core/constants/app_images.dart';

class EmptyDataContainer extends StatelessWidget {
  final String text;

  EmptyDataContainer({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Image.asset(
            AppImages.noData,
            width: 160,
            height: 160,
            fit: BoxFit.cover,
          ),
          12.h,
          TemplateHeaderText(text)
        ],
      ),
    );
  }
}
