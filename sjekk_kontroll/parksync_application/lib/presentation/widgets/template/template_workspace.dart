import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:parksync_application/core/constants/printer_constants.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/data/models/car_image_model.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_dialog.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_container.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_list_tile.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_slots_holder.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_icon.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/screens/gallery_view.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import './extensions/sizedbox_extension.dart';

class TemplateWorkspace extends StatefulWidget {
  static const String route = 'workspace_template';

  @override
  State<TemplateWorkspace> createState() => _TemplateWorkspaceState();
}

class _TemplateWorkspaceState extends State<TemplateWorkspace> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      initialIndex: 0,
      child: SafeArea(
        child: Scaffold(
          body: Padding(
            padding: EdgeInsets.all(12.0),
            child: Column(
              children: [
                TabBar(
                  tabs: [
                    Tab(
                      text: 'Components',
                    ),
                    Tab(
                      text: 'Logic',
                    ),
                    Tab(
                      text: 'Printer',
                    ),
                  ],
                ),
                12.h,
                Expanded(
                  child: TabBarView(
                    children: [ComponentsWidget(), LogicWidget(), PrinterLogicWidget()],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }



  @override
  void dispose() {
    super.dispose();
  }

  Widget PrinterLogicWidget() {
    MethodChannel _channel = const MethodChannel('sjekk_printer_channel');
    return ListView(
      children: [
        NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.getPrinterStatusCommand);
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'get printer Status',
        ),
        NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.getConnectionStateCommand);
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'get connectuin Status',
        ),
        NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.connectPrinterCommand, {
              'mac': 'DC:0D:30:63:D6:C8'
            });
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'Connect',
        ),
        NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.printViolationTicket);
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'Test Ticket Print',
        ),
                NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.checkBluetoothAdapter);
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'get bluetooth devices',
        ),
        NormalTemplateButton(
          onPressed: () async{
            final result = await _channel.invokeMethod(PrinterConstants.disconnectPrinterCommand);
            SnackbarUtils.showSnackbar(context, result.toString());
            pinfo(result);
          },
          text: 'Disconnect',
        ),
      ],
    );
  }

  Widget LogicWidget() {
    return ListView(
      children: [
        TemplateContainerCard(
          title: 'METHOD CHANNEL GET BATTERY LEVEL',
          onTap: () async {
          },
        ),
        12.h,
        TemplateContainerCard(
          title: 'METHOD CHANNEL OPEN CAMERA',
          onTap: () async {

          },
        ),
        12.h,
        TemplateContainerCard(
          title: 'METHOD CHANNEL GET UNIQUE ID',
          onTap: () async {
          },
        ),
      ],
    );
  }

  Widget ComponentsWidget() {
    return ListView(
      children: [
        TemplateHeadlineText('Button Components'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: NormalTemplateButton(onPressed: () {}, text: 'Normal'),
            ),
            12.w,
            Expanded(
              child: InfoTemplateButton(onPressed: () {}, text: 'Info'),
            )
          ],
        ),
        6.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: LightTemplateButton(onPressed: () {}, text: 'Light'),
            ),
            12.w,
            Expanded(
              child: DangerTemplateButton(onPressed: () {}, text: 'Danger'),
            )
          ],
        ),
        12.h,
        TemplateHeadlineText('Outline Buttons'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: TemplateOutlinedButton(
                onPressed: () {},
                text: 'Normal',
              ),
            ),
            12.w,
            Expanded(
              child: TemplateOutlinedDangerButton(
                onPressed: () {},
                text: 'Danger',
              ),
            ),
          ],
        ),
        12.h,
        TemplateHeadlineText('Text Field'),
        12.h,
        NormalTemplateTextField(controller: TextEditingController(), hintText: 'Text Field'),
        12.h,
        SecondaryTemplateTextField(
          controller: TextEditingController(),
          hintText: 'Another',
          lines: 3,
        ),
        12.h,
        TemplateHeadlineText('Containers'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: TemplateContainerCard(title: 'Settings'),
            ),
            12.w,
            Expanded(
              child: TemplateContainerCard(
                title: 'Settings',
                backgroundColor: secondaryColor,
              ),
            )
          ],
        ),
        12.h,
        TemplateHeadlineText('Containers With Icons'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: TemplateContainerCardWithIcon(icon: Icons.settings, title: 'Settings'),
            ),
            12.w,
            Expanded(
              child: TemplateContainerCardWithIcon(
                icon: Icons.settings,
                title: 'Settings',
                backgroundColor: secondaryColor,
              ),
            )
          ],
        ),
        12.h,
        TemplateHeadlineText('Alerts'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: NormalTemplateButton(
                  onPressed: () async {
                    await showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return TemplateSuccessDialog(title: 'Success', message: 'Task is completed');
                      },
                    );
                  },
                  text: 'Success'),
            ),
            12.w,
            Expanded(
              child: DangerTemplateButton(
                  onPressed: () async {
                    await showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return TemplateFailureDialog(title: 'Failure', message: 'Task Failed');
                      },
                    );
                  },
                  text: 'Failure'),
            ),
            12.w,
            Expanded(
              child: InfoTemplateButton(
                  onPressed: () async {
                    await showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return TemplateInfoDialog(title: 'Info', message: 'Info About Task');
                      },
                    );
                  },
                  text: 'Info'),
            ),
          ],
        ),
        12.h,
        TemplateHeadlineText('Snackbars'),
        12.h,
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: NormalTemplateButton(
                  onPressed: () {
                    SnackbarUtils.showSnackbar(context, 'Success Snackbar', type: SnackBarType.success);
                  },
                  text: 'Success'),
            ),
            12.w,
            Expanded(
              child: DangerTemplateButton(
                  onPressed: () async {
                    SnackbarUtils.showSnackbar(context, 'Error Snackbar', type: SnackBarType.failure);
                  },
                  text: 'Failure'),
            ),
            12.w,
            Expanded(
              child: InfoTemplateButton(
                  onPressed: () async {
                    SnackbarUtils.showSnackbar(context, 'Info Snackbar', type: SnackBarType.info);
                  },
                  text: 'Info'),
            ),
          ],
        ),
        12.h,
        TemplateHeadlineText('Gallery View'),
        12.h,
        NormalTemplateButton(
            onPressed: () {
              final List<CarImage> images = [
                // CarImage(path: 'assets/cars/BMW.png'),
                // CarImage(path: 'assets/cars/Peugeot.png'),
                // CarImage(path: 'assets/cars/Porsche.png'),
                // CarImage(path: 'assets/cars/Toyota.png'),
                // CarImage(path: 'assets/images/gensolv.png'),
                // CarImage(path: 'assets/images/kontroll.png'),
              ];

              Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => TemplateGalleryViewScreen(
                        images: images,
                        gallerySource: GallerySource.asset,
                      )));
            },
            text: 'View Gallery Effect'),
        12.h,
        TemplateHeadlineText('List Tile'),
        12.h,
        TemplateListTile(
          title: 'Tile Title',
          subtitle: 'Tile Description',
          icon: Icons.print,
        ),
        12.h,
        TemplateListTile(
          title: 'Tile Title',
          icon: Icons.print,
        ),
        12.h,
        TemplateHeadlineText('Icon'),
        TemplateIcon(Icons.check),
        12.h,
        TemplateHeadlineText('License Slots Holder'),
        12.h,
        TemplateSlotsHolder(
          length: 6,
          type: SlotType.rule,
        ),
        12.h,
        TemplateHeadlineText('License Slots Holder With Boxes'),
        12.h,
        TemplateSlotsHolder(
          length: 6,
          type: SlotType.square,
        )
      ],
    );
  }
}
