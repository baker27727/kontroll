import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:iconsax/iconsax.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/extensions/sizedbox_extension.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/core/services/printer_service.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/presentation/providers/printer_provider.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/ticket_widget.dart';

import '../../providers/create_ticket_provider.dart';
import '../../providers/place_provider.dart';
import '../place_home.dart';

class PrintTicketPreview extends StatefulWidget {
  static const String route = 'print_ticket_preview';
  const PrintTicketPreview({super.key});

  @override
  State<PrintTicketPreview> createState() => _PrintTicketPreviewState();
}

class _PrintTicketPreviewState extends State<PrintTicketPreview> {
  GlobalKey globalKey = GlobalKey();
// to save image bytes of widget
Uint8List? bytes;

Future<Uint8List?> _capturePng() async {
      await Provider.of<CreateTicketProvider>(context, listen: false).getTicketPreview(
      place: Provider.of<PlaceProvider>(context, listen: false).selectedPlace!,
      placeLoginTime: DateHelper.formatDate(Provider.of<PlaceProvider>(context, listen: false).selectedPlaceLoginTime!)
    );

    String? image = await Provider.of<CreateTicketProvider>(context, listen: false).ticketPreview?.ticketLink;
    if (image != null) {
      Uint8List bytes = (await NetworkAssetBundle(Uri.parse(image))
            .load(image))
            .buffer
            .asUint8List();

            return bytes;
    }

    return null;
}

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () {
                      navigateBack(context);
                    },
                    child: Container(
                      width: 40,
                      height: 40,
                      color: primaryColor,
                      child: const Icon(Icons.arrow_back, color: Colors.white, size: 32,),
                    ),
                  ),
                  8.w,
                  GestureDetector(
                    onTap: () async{
                      if(context.read<PrinterProvider>().connectedPrinter == null) {
                        SnackbarUtils.showSnackbar(context, 'No printer connected', type: SnackBarType.failure);
                        return;
                      }

                      final bytes = await _capturePng();
                      if(bytes != null){
                        await PrinterService.instance.printViolationTicket(
                          bytes
                        );
                      }

                      ImagePicker imagePicker = ImagePicker();
                      XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
                      if (file != null) {
                        pinfo(file.path);

                        await context.read<CreateTicketProvider>().pushCarImage(file.path);

                        
                        Navigator.popUntil(context, (route) => route.settings.name == PlaceHome.route);

                        await context.read<CreateTicketProvider>().uploadViolationToServer(
                          place: context.read<PlaceProvider>().selectedPlace!,
                          placeLoginTime: DateFormat('dd.MM.yyyy HH:mm').format(context.read<PlaceProvider>().selectedPlaceLoginTime!),
                        ).then((value) {
                          if(!context.mounted){
                            SnackbarUtils.showSnackbar(context, 'Violation uploaded successfully'); 
                          }
                        }).catchError((e) {
                          if(!context.mounted){
                            SnackbarUtils.showSnackbar(context, 'Failed to upload violation');
                          }
                        });
                      }
                    },
                    child: Container(
                      height: 40,
                      padding: EdgeInsets.symmetric(horizontal: 8),
                      color: primaryColor,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.done, color: Colors.white, size: 32,),
                          8.w,
                          Text('Complete Print', style: TextStyle(color: Colors.white),)
                        ],
                      ),
                    ),
                  ),
                ],
              ),
                8.h,
              Row(
                children: [
                  Icon(Iconsax.printer, color: primaryColor, size: 32,),
                  8.w,
                  Text(context.read<PrinterProvider>().connectedPrinter?.name ?? 'Not connected')
                ],
              ),
              8.h,
              Row(
                children: [
                  Icon(Iconsax.printer, color: primaryColor, size: 32,),
                  8.w,
                  // Text(context.read<PrinterProvider>().connectedPrinter?.name ?? 'Not connected')
                ],
              ),
              8.h,
              Expanded(
                child: Container(
                  width: double.infinity,
                  child: Consumer<CreateTicketProvider>(
                    builder: (context, createTicketProvider, child) {
                      return KontrollsanksjonWidget(
                        orgNumber: 'Org: 12345678',
                        parksyncImagePath: 'assets/images/parksync.png',
                        barcodeImagePath: 'assets/images/VL-0001737311-QV4JS.png',
                        ticketNumber: 'VL12345678',
                        paperComment: 'Paper comment',
                        placeLoginTime: '2022-01-01 12:00',
                        toDate: '2022-01-01 12:00',
                        printOption: 'Print option',
                        pnid: 'Pn: 12345678',
                        rules: [
                          Rule(name: 'Rule 1', charge: 100),
                        ],
                        carInfo: CarInfo(
                          carColor: 'Color: black',
                          plateNumber: '1234 ABC',
                          carModel: 'Car model',
                          carType: 'Car type',
                          countryCode: 'Country code',
                          countryName: 'Country name',
                        ),
                        location: 'Oslo, Norway',
                        ticketInfo: TicketInfo(
                          totalCharge: 100,
                          accountNumber: '12345678',
                          kidNumber: '12345678',
                          paymentDate: '2022-01-01 12:00',
                          ibanNumber: '12345678',
                          swiftCode: '12345678',
                        ),
                        qrcodeImagePath: 'assets/images/qrcode.png',
                      );
                    }
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}