// import 'package:bluetooth_manager/models/bluetooth_models.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/core/services/bluetooth_service.dart';
import 'package:parksync_application/core/services/printer_service.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/presentation/providers/printer_provider.dart';
import 'package:parksync_application/presentation/screens/add_new_printer.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_dialog.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
import 'package:parksync_application/presentation/widgets/template/widgets/empty_data_container.dart';




class PrintersSettings extends StatefulWidget {
  static const String route = 'printers_list';
  const PrintersSettings({Key? key}) : super(key: key);

  @override
  State<PrintersSettings> createState() => _PrintersSettingsState();
}

class _PrintersSettingsState extends State<PrintersSettings> {
  @override
  void initState() {
    super.initState();
    initializePrinters();
  }

  void initializePrinters() async {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      final printerProvider = Provider.of<PrinterProvider>(context, listen: false);
      await printerProvider.getAllPrinters();
    });
  }


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Consumer<PrinterProvider>(
          builder: (BuildContext context, PrinterProvider value, Widget? child) {
            if (value.errorState) {
              return Center(
                child: Text(value.errorMessage),
              );
            }

            return Container(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      StreamBuilder(
                        // stream: BluetoothService.bluetoothManager!.getBluetoothStateStream(), 
                        stream: Stream.empty(), 
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return Row(
                              children: [
                                // Icon(snapshot.data == BluetoothState.on ? Icons.bluetooth : Icons.bluetooth_disabled, color: primaryColor, size: 32,),
                                // Text(snapshot.data == BluetoothState.on ? 'bluetooth_on'.tr() : 'bluetooth_off'.tr())
                              ],
                            );
                          }

                          return const Text('');
                        }
                      ),
                      TemplateButtonWithIcon(
                        onPressed: () async{  
                          // await PrinterService.instance.checkBluetoothAdapter();


                          Navigator.of(context).push(
                            MaterialPageRoute(builder: (context) => AddPrinterScreen()),
                          );
                        },
                        backgroundColor: accentColor,
                        icon: Icons.add,
                        iconColor: Colors.black,
                        text: 'add'.tr().toUpperCase(),
                        textColor: Colors.black,
                      ),
                    ],
                  ),
                                8.h,
              Row(
                children: [
                  Icon(Iconsax.printer, color: primaryColor, size: 32,),
                  8.w,
                  Text(context.read<PrinterProvider>().connectedPrinter?.name ?? 'Not connected'.tr()),
                  Spacer(),

                  if(context.read<PrinterProvider>().connectedPrinter != null)
                    IconButton(
                      icon: Icon(Iconsax.close_square, color: Colors.red, size: 32,),
                      onPressed: () async{
                        await context.read<PrinterProvider>().disconnectPrinter();
                      },
                    ),
                ],
              ),
                  12.h,
                  if (value.printers.isEmpty)
                    Expanded(
                      child: EmptyDataContainer(
                        text: 'no_printers'.tr(),
                      ),
                    ),

                    
                  ListView.builder(
                    shrinkWrap: true,
                    padding: EdgeInsets.zero,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: value.printers.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        contentPadding: EdgeInsets.symmetric(horizontal: 4),
                        tileColor: accentColor,
                        leading: Icon(Iconsax.printer, color: primaryColor, size: 30,),
                        title: Text('${value.printers[index].name}\n${value.printers[index].address}'),
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4.0)),
                              elevation: 0,
                              actionsPadding: EdgeInsets.all(4),
                              contentPadding: EdgeInsets.all(4),
                              content: Text('Connect to ${value.printers[index].name}?'.tr()),
                              actions: [
                                TextButton(
                                  onPressed: (){
                                    Navigator.pop(context);
                                  }, 
                                  child: Text('cancel'.tr(), style: TextStyle(
                                    color: primaryColor
                                  ),)
                                ),
                                TextButton(
                                  onPressed: () async{
                                    try{
                                      await value.setConnectedPrinter(value.printers[index]);
                                      SnackbarUtils.showSnackbar(context, 'Connected to ${value.printers[index].name}'.tr());
                                    }catch(e){
                                      SnackbarUtils.showSnackbar(context, e.toString(), type: SnackBarType.failure);
                                    }
                                    Navigator.pop(context);
                                  },
                                  child: Text('Connect'.tr(), style: TextStyle(
                                    color: primaryColor
                                  ))
                                ),
                              ],
                            ),
                          );
                        },
                        trailing: IconButton(
                          icon: Icon(
                            FontAwesome.close,
                            color: dangerColor,
                          ),
                          onPressed: () async {
                            showDialog(
                              context: context,
                              builder: (context) => TemplateConfirmationDialog(
                                title: 'Delete printer',
                                message: 'Are you sure you want to delete this printer?',
                                onConfirmation: () {
                                  value.deletePrinter(value.printers[index].id);
                                  Navigator.of(context).pop();
                                },
                                onCancel: () => Navigator.of(context).pop(),
                              ),
                            );
                          },
                        ),
                      );
                    },
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
