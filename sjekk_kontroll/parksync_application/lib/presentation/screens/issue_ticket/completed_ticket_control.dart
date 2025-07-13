import 'package:back_button_interceptor/back_button_interceptor.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:iconsax/iconsax.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/services/printer_service.dart';
import 'package:parksync_application/core/utils/snackbar_utils.dart';
import 'package:parksync_application/presentation/providers/completed_violation_provider.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../widgets/template/components/template_image.dart';
import '../../widgets/template/components/template_text.dart';
import '../gallery_view.dart';
import '../place_home.dart';

class CompletedTicketControl extends StatefulWidget {
  static const route = '/completed_ticket_control';

  const CompletedTicketControl({super.key});
  @override
  _CompletedTicketControlState createState() => _CompletedTicketControlState();
}

class _CompletedTicketControlState extends State<CompletedTicketControl> {
  int _currentIndex = 0;
  final List<Widget> _children = [const PlateInfoScreen(), const IssueTicketPage(), const TicketImageScreen()];

  Future<bool> returnBackInterceptor(bool stopDefaultButtonEvent, RouteInfo info) async {
    context.read<CreateTicketProvider>().cancelPrintTimer();

    if (info.currentRoute(context)!.settings.name == CompletedTicketControl.route) {
      Navigator.of(context).pop();
    }
    return true;
  }

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    BackButtonInterceptor.add(returnBackInterceptor);
  }

  @override
  void dispose() {
    BackButtonInterceptor.remove(returnBackInterceptor);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final createTicketProvider = Provider.of<CreateTicketProvider>(context);

    return Scaffold(
      body: Column(
        children: [
          32.h,
          Container(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(_currentIndex != 0 ? primaryColor : Colors.black12),
                    foregroundColor: MaterialStateProperty.all(_currentIndex != 0 ? Colors.white : Colors.black54),
                    padding: MaterialStateProperty.all(const EdgeInsets.all(0.0)),
                    minimumSize: MaterialStateProperty.all(const Size(48, 32)),
                    shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)
                    ))
                  ),
                  onPressed: _currentIndex == 0 ? null : () => onTabTapped(_currentIndex - 1),
                  child: const Icon(Icons.arrow_back),
                ),
                24.w,
                Center(
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(3, (index) {
                          return Container(
                            margin: const EdgeInsets.only(right: 4),
                            height: 10,
                            width: 40,
                            decoration: BoxDecoration(
                              color: index == _currentIndex ? secondaryColor : Colors.black38,
                              borderRadius: BorderRadius.circular(10),
                            ),
                          );
                        }),
                      ),
                    ],
                  ),
                ),
                24.w,
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(_currentIndex != 2 ? primaryColor : Colors.black12),
                    foregroundColor: MaterialStateProperty.all(_currentIndex != 2 ? Colors.white : Colors.black54),
                    padding: MaterialStateProperty.all(const EdgeInsets.all(0.0)),
                    minimumSize: MaterialStateProperty.all(const Size(48, 32)),
                    shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)
                    ))
                  ),
                  onPressed: _currentIndex == 2 ? null : () => onTabTapped(_currentIndex + 1),
                  child: const Icon(Icons.arrow_forward),
                ),

                const Spacer(),
                GestureDetector(
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                elevation: 0,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                                insetPadding: const EdgeInsets.all(8),
                                titlePadding: const EdgeInsets.all(8),
                                contentPadding: const EdgeInsets.all(8),
                                actionsPadding: const EdgeInsets.all(8),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text('Are you sure you want to print this ticket?', style: TextStyle(color: Colors.black),),
                                  ],
                                ),
                                actions: [
                                  TextButton(
                                    child: const Text('No'),
                                    style: ButtonStyle(
                                      foregroundColor: MaterialStateProperty.all(dangerColor),
                                    ),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                  TextButton(
                                    child: const Text('Yes'),
                                    style: ButtonStyle(
                                      foregroundColor: MaterialStateProperty.all(primaryColor),
                                    ),
                                    onPressed: () async{
                                      final imageUrl = context.read<CompletedViolationProvider>().currentViolation!.ticketImage;
                                        Uint8List bytes = (await NetworkAssetBundle(Uri.parse(imageUrl))
                                      .load(imageUrl))
                                      .buffer
                                      .asUint8List();

                                      await PrinterService.instance.printViolationTicket(bytes);
                                      if(!context.mounted){
                                        return;
                                      }
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
                              );
                            },
                          );
                        },
                        child: Container(
                          width: 36,
                          height: 36,
                          color: primaryColor,
                          padding: const EdgeInsets.all(4),
                          child: const Icon(Iconsax.printer, color: Colors.white, size: 30,),
                        ),
                      ),
              ],
            ),
          ),
                if (createTicketProvider.isTimerActive)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TemplateHeadlineText(createTicketProvider.timePassed),
                      TemplateParagraphText('${createTicketProvider.maxTimePolicy} minutes'),
                    ],
                  ),
                ),
          Expanded(
            child: _children[_currentIndex],
          ),
        ],
      ),
    );
  }
}

class TicketImageScreen extends StatelessWidget {
  const TicketImageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(8.0),
        child: CachedNetworkImage(
          fit: BoxFit.cover,
          imageUrl: context.read<CompletedViolationProvider>().currentViolation!.ticketImage,
        ),
      ),
    );
  }
}

class PlateInfoScreen extends StatefulWidget {
  const PlateInfoScreen({super.key});

  @override
  State<PlateInfoScreen> createState() => _PlateInfoScreenState();
}

class _PlateInfoScreenState extends State<PlateInfoScreen> {

    Widget _buildInfoContainer(String title, String? value,
      {IconData? icon = Icons.info_outline}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 30,
            color: primaryColor,
          ),
                    8.w,
                          Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
                12.w,
                Text(
                  value ?? '',
                  style: const TextStyle(fontSize: 16),
                ),
        ],
      ),
    );
  }

    @override
    void initState() {
      super.initState();
    }



  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [

            Consumer<CompletedViolationProvider>(
              builder: (BuildContext context, CompletedViolationProvider completedViolationProvider, Widget? child) {
                return Column(
                  children: [
                    _buildInfoContainer(
                      'Plate Number'.tr().toUpperCase(),
                      '${completedViolationProvider.currentViolation!.plateInfo.plateNumber}',
                      icon: FontAwesome.drivers_license_o,
                    ),
                    _buildInfoContainer(
                      'land'.tr().toUpperCase(),
                      '${completedViolationProvider.currentViolation!.plateInfo.land?.country} - ${completedViolationProvider.currentViolation!.plateInfo.land?.code}',
                      icon: Iconsax.location,
                    ),

                    _buildInfoContainer(
                      'type_with_no_value'.tr().toUpperCase(), 
                      completedViolationProvider.currentViolation!.plateInfo.carType ?? 'N/A', 
                      icon: Iconsax.category,
                    ),
                    _buildInfoContainer(
                      'brand'.tr().toUpperCase(), 
                      completedViolationProvider.currentViolation!.plateInfo.carModel ?? 'N/A', 
                      icon: Iconsax.car,
                    ),

                    _buildInfoContainer(
                      'year'.tr().toUpperCase(), 
                      completedViolationProvider.currentViolation!.plateInfo.manufactureYear ?? 'N/A',
                      icon: Iconsax.calendar,
                    ),

                    _buildInfoContainer(
                      'color'.tr().toUpperCase(), 
                      completedViolationProvider.currentViolation!.plateInfo.carColor ?? 'N/A', 
                      icon: Iconsax.colorfilter
                    ),

                    _buildInfoContainer(
                      'description'.tr().toUpperCase(), 
                      completedViolationProvider.currentViolation!.plateInfo.carDescription ?? 'N/A', 
                      icon: Iconsax.text,
                    ),

                    _buildInfoContainer(
                      'Created At', 
                      completedViolationProvider.currentViolation!.createdAt, 
                      icon: Iconsax.calendar_1,
                    ),

                    const Divider(),

                    _buildInfoContainer(
                      'Registration Type', 
                      completedViolationProvider.currentViolation!.registeredCar?.registeredCarType.name ?? 'N/A', 
                      icon: Iconsax.ticket,
                    ),
                    // _buildInfoContainer(
                    //   'Start Date', 
                    //   completedViolationProvider.currentViolation!.registeredCar?.startDate ?? 'N/A', 
                    //   icon: Iconsax.calendar_1,
                    // ),
                    //                     _buildInfoContainer(
                    //   'End Date', 
                    //   completedViolationProvider.currentViolation!.registeredCar?.endDate ?? 'N/A', 
                    //   icon: Iconsax.calendar_1,
                    // ),
                    
                  ],
                );
              },
            )
          
        ],
      ),
    );
  }
}

class IssueTicketPage extends StatefulWidget {
  const IssueTicketPage({super.key});

  @override
  _IssueTicketPageState createState() => _IssueTicketPageState();
}

class _IssueTicketPageState extends State<IssueTicketPage> {
  Widget _buildRulesWidget() {
    return Column(
      children: [
        Consumer<CompletedViolationProvider>(
          builder: (BuildContext context, CompletedViolationProvider state, Widget? child) {
            if(state.currentViolation!.rules.isEmpty) {
              return const Center(
                child: Text('No rules selected'),
              );
            }
        
            return ListView.builder(
              padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  itemCount: state.currentViolation!.rules.length,
                  itemBuilder: (context, index) {
            return Column(
              children: [
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(FontAwesome.book),
                  subtitle: Text('${state.currentViolation!.rules[index].charge} Kr.'),
                  title: Text('Rule $index'),
                ),

                if(state.currentViolation!.rules[index].extras != null && state.currentViolation!.rules[index].extras!.meterReceiptNumber)
                Row(
                  children: [
                    const Text('Meter Receipt Number: '),
                    4.w,
                    Text(state.currentViolation!.rules[index].extras!.meterReceiptNumberValue ?? 'N/A'),
                    const Spacer(),
                    const Icon(Iconsax.edit, color: primaryColor)
                  ],
                ),
                if(state.currentViolation!.rules[index].extras != null && state.currentViolation!.rules[index].extras!.meterNumber)
                Row(
                  children: [
                    const Text('Meter Number: '),
                    4.w,
                    Text(state.currentViolation!.rules[index].extras!.meterNumberValue ?? 'N/A'),
                    const Spacer(),
                    const Icon(Iconsax.edit, color: primaryColor)
                  ],
                ),
                if(state.currentViolation!.rules[index].extras != null && state.currentViolation!.rules[index].extras!.expiryDate)
                Row(
                  children: [
                    const Text('Expiry Date: '),
                    4.w,
                    Text(state.currentViolation!.rules[index].extras!.expiryDateValue ?? 'N/A'),
                    const Spacer(),
                    const Icon(Iconsax.edit, color: primaryColor)
                  ],
                ),

                      if(state.currentViolation!.rules[index].extras != null && state.currentViolation!.rules[index].extras!.paidAmount)
                Row(
                  children: [
                    const Text('Paid Amount: '),
                    4.w,
                    Text(state.currentViolation!.rules[index].extras!.paidAmountValue ?? 'N/A'),
                    const Spacer(),
                    const Icon(Iconsax.edit, color: primaryColor)
                  ],
                ),
              ],
            );
                  },
                );
          },
        ),

      ],
    );
  }

  Widget _buildComments(){
    return Container(
      margin: const EdgeInsets.only(top: 8),
        child: Consumer<CompletedViolationProvider>(
          builder: (BuildContext context, CompletedViolationProvider state, Widget? child) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TemplateHeadlineText('Ticket Comment:'),
                TemplateParagraphText(state.currentViolation!.ticketComment),

                12.h,

                TemplateHeadlineText('System Comment:'),
                TemplateParagraphText(state.currentViolation!.systemComment),
              ],
            );
          },
        ),
      );
  }

  Widget _buildCarImagesWidget() {
    return Consumer(
      builder: (BuildContext context, CompletedViolationProvider state, Widget? child) {
        return Container(
      margin: const EdgeInsets.only(top: 8),
      child: GridView.builder(
        shrinkWrap: true,
        padding: EdgeInsets.zero,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3, mainAxisSpacing: 8.0, crossAxisSpacing: 8.0),
        itemCount: state.currentViolation!.carImages.length + 1,
        itemBuilder: (context, index) {
          if (index == state.currentViolation!.carImages.length) {
            return GestureDetector(
              onTap: () async{
                ImagePicker imagePicker = ImagePicker();
                  XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
                  if (file != null) {
                    state.uploadViolationImage(file.path);
                  }
              },
              child: DottedBorder(
                color: primaryColor,
                strokeWidth: 1,
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(FontAwesome.camera, color: primaryColor),
                      8.h,
                      const Text(
                        'Add image',
                        style: TextStyle(
                          fontSize: 16.0,
                          color: primaryColor,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }
          return Stack(
                        children: [
                          TemplateNetworkImageContainer(
                            path: state.currentViolation!.carImages[index].path,
                            onTap: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                  builder: (context) => TemplateGalleryViewScreen(
                                        images: state.currentViolation!.carImages,
                                        initialIndex: index,
                                        gallerySource: GallerySource.network,
                                      )));
                            },
                          ),
                          Align(
                            alignment: Alignment.bottomLeft,
                            child: Container(
                              height: 40,
                              padding: const EdgeInsets.symmetric(horizontal: 4.0),
                              alignment: Alignment.center,
                              color: Colors.black54,
                              child: Text(
                                state.currentViolation!.carImages[index].date,
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                          )
                        ],
                      );
          
          }
      ),
    );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildRulesWidget(),
            const Divider(),
            16.h,
            _buildCarImagesWidget(),
            16.h,
            const Divider(),
            16.h,
            _buildComments(),
          ],
        ),
      ),
    );
  }
}
