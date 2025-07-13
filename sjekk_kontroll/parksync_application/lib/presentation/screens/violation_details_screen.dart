// import 'dart:async';

// import 'package:back_button_interceptor/back_button_interceptor.dart';
// import 'package:easy_localization/easy_localization.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:flutter_vector_icons/flutter_vector_icons.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:intl/intl.dart';
// import 'package:provider/provider.dart';
// import 'package:parksync_application/core/constants/app_constants.dart';
// // import 'package:scanbot_sdk/scanbot_sdk.dart';
// import 'package:parksync_application/core/utils/logger.dart';
// import 'package:parksync_application/core/utils/snackbar_utils.dart';
// import 'package:parksync_application/presentation/providers/place_provider.dart';
// import 'package:parksync_application/presentation/providers/violation_details_provider.dart';
// import 'package:parksync_application/presentation/screens/bottom_navigator_screen.dart';
// import 'package:parksync_application/presentation/screens/pick_country_screen.dart';
// import 'package:parksync_application/presentation/screens/rules_extras_screen.dart';
// import 'package:parksync_application/presentation/screens/select_brand_screen.dart';
// import 'package:parksync_application/presentation/screens/select_car_type_screen.dart';
// import 'package:parksync_application/presentation/screens/select_color_screen.dart';
// import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
// import 'package:parksync_application/presentation/widgets/template/components/template_container.dart';
// import 'package:parksync_application/presentation/widgets/template/components/template_text.dart';
// import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
// import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
// import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';
// import '../../data/models/rule_model.dart';
// import '../../data/repositories/remote/violation_repository.dart';
// import '../providers/create_violation_provider.dart';
// import '../providers/rule_provider.dart';
// import '../widgets/template/components/template_dialog.dart';
// import '../widgets/template/components/template_image.dart';
// import '../widgets/template/components/template_option.dart';
// import '../widgets/template/components/template_options_menu.dart';
// import 'gallery_view.dart';
// import 'place_home.dart';

// class ViolationDetailsScreen extends StatefulWidget {
//   static const String route = 'violation_details_screen';
//   const ViolationDetailsScreen({Key? key}) : super(key: key);

//   @override
//   State<ViolationDetailsScreen> createState() => _ViolationDetailsScreenState();
// }

// class _ViolationDetailsScreenState extends State<ViolationDetailsScreen> with SingleTickerProviderStateMixin {
//   final TextEditingController innerController = TextEditingController();
//   final TextEditingController outterController = TextEditingController();

//   final TextEditingController descriptionController = TextEditingController();

//   final TextEditingController plateController = TextEditingController();

//   Future<bool> violationDetailsBack(bool stopDefaultButtonEvent, RouteInfo info) async {
//     context.read<ViolationDetailsProvider>().cancelPrintTimer();
//     // context.read<ViolationDetailsProvider>().cancelSavedVlTimer();
//     context.read<CreateViolationProvider>().clearAll();
//     if (info.currentRoute(context)!.settings.name != ViolationDetailsScreen.route) {
//       return false;
//     }

//     return true;
//   }

//   void initializeRules() async {
//     await Provider.of<RuleProvider>(context, listen: false).fetchRules();
//   }

//   @override
//   void initState() {
//     super.initState();
//     WidgetsBinding.instance.addPostFrameCallback((timeStamp) async{
//       await initializeRules();

//       BackButtonInterceptor.add(violationDetailsBack);

//       if (context.read<PlaceProvider>().selectedPlaceLoginTime != null) {
//         context.read<ViolationDetailsProvider>().setSiteLoginTime(context.read<PlaceProvider>().selectedPlaceLoginTime);
//       } else {
//         if (context.read<ViolationDetailsProvider>().violation.placeStartTime != null) {
//           context
//               .read<ViolationDetailsProvider>()
//               .setSiteLoginTime(DateTime.parse(context.read<ViolationDetailsProvider>().violation.placeStartTime!));
//         } else {
//           SnackbarUtils.showSnackbar(context, 'failed_to_start_timer'.tr());
//         }
//       }
//       Provider.of<ViolationDetailsProvider>(context, listen: false).updateTimePolicy();
//     });

//     final violationDetailsProvider = Provider.of<ViolationDetailsProvider>(context, listen: false);
//     innerController.text = violationDetailsProvider.violation.paperComment;
//     outterController.text = violationDetailsProvider.violation.outComment;
//   }

//   @override
//   void dispose() {
//     BackButtonInterceptor.remove(violationDetailsBack);
//     descriptionController.dispose();
//     innerController.dispose();
//     outterController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return DefaultTabController(
//       initialIndex: 0,
//       length: 5,
//       child: Scaffold(
//         body: Column(
//           children: [
//             24.h,
//             TabBar(
//               tabs: <Widget>[
//                 Tab(
//                   icon: Icon(Icons.info_outline),
//                 ),
//                 Tab(
//                   icon: Icon(Icons.image),
//                 ),
//                 Tab(
//                   icon: Icon(Icons.rule),
//                 ),
//                 Tab(
//                   icon: Icon(Icons.comment),
//                 ),
//                 Tab(
//                   icon: Icon(Icons.print),
//                 ),
//               ],
//             ),
//             12.h,
//             Expanded(
//               child: TabBarView(
//                 children: [
//                   CarInfoWidget(),
//                   ImagesWidget(),
//                   RulesWidget(),
//                   CommentsWidget(),
//                   PrintWidget(),
//                 ],
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget CommentsWidget() {
//     return Consumer<ViolationDetailsProvider>(
//       builder: (BuildContext context, ViolationDetailsProvider violationDetailsProvider, Widget? child) {
//         return Padding(
//           padding: EdgeInsets.all(12.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               NormalTemplateTextField(
//                 hintText: 'system_comment'.tr(),
//                 lines: 5,
//                 controller: innerController,
//                 onChanged: (val) async {
//                   await violationDetailsProvider.changePaperComment(innerController.text);
//                 },
//               ),
//               12.h,
//               NormalTemplateTextField(
//                 hintText: 'client_comment'.tr(),
//                 lines: 5,
//                 controller: outterController,
//                 onChanged: (val) async {
//                   await violationDetailsProvider.changeOutComment(outterController.text);
//                 },
//               ),
//             ],
//           ),
//         );
//       },
//     );
//   }

//   Widget CarInfoWidget() {
//     final detailsProvider = context.read<ViolationDetailsProvider>();
//     OverlayEntry? entry;

//     return Consumer<ViolationDetailsProvider>(
//       builder: (BuildContext context, ViolationDetailsProvider violationDetailsProvider, Widget? child) {
//         return GestureDetector(
//           onTap: () {
//             if (entry != null) {
//               entry?.remove();
//               entry = null;
//             }
//           },
//           child: Padding(
//             padding: const EdgeInsets.all(12.0),
//             child: SingleChildScrollView(
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Row(
//                     children: [
//                       Expanded(
//                         child: GestureDetector(
//                           onTap: () async {
//                             await showDialog(
//                                 context: context,
//                                 builder: (context) {
//                                   return AlertDialog(
//                                     title: Row(
//                                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                                       children: [
//                                         Text('enter_plate'.tr()),
//                                         GestureDetector(
//                                           onTap: () async {
//                                             Navigator.pop(context);
//                                           },
//                                           child: Icon(
//                                             Icons.camera,
//                                             color: secondaryColor,
//                                           ),
//                                         )
//                                       ],
//                                     ),
//                                     shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
//                                     content: Container(
//                                       width: 300,
//                                       child: Column(
//                                         mainAxisSize: MainAxisSize.min,
//                                         children: [
//                                           SecondaryTemplateTextFieldWithIcon(
//                                             hintText: 'plate'.tr().toUpperCase(),
//                                             icon: Icons.search,
//                                             controller: plateController,
//                                           ),
//                                           12.h,
//                                           Align(
//                                             alignment: Alignment.centerRight,
//                                             child: NormalTemplateButton(
//                                               text: 'ok'.tr().toUpperCase(),
//                                               onPressed: () async {
//                                                 final createViolationProvider = context.read<CreateViolationProvider>();

//                                                 await createViolationProvider.getCarInfo(plateController.text);
//                                                 await createViolationProvider.getSystemCar(plateController.text);

//                                                 await violationDetailsProvider
//                                                     .changePlateInfo(createViolationProvider.plateInfo);

//                                                 await violationDetailsProvider
//                                                     .changeRegisterdCarData(createViolationProvider.registeredCar);

//                                                 plateController.clear();

//                                                 Navigator.pop(context);
//                                               },
//                                             ),
//                                           )
//                                         ],
//                                       ),
//                                     ),
//                                   );
//                                 });
//                           },
//                           child: TemplateContainerCard(
//                             title: detailsProvider.violation.plateInfo.plate.isEmpty
//                                 ? 'N/A'
//                                 : detailsProvider.violation.plateInfo.plate,
//                             height: 40,
//                             backgroundColor: detailsProvider.violation.is_car_registered ? Colors.blue : dangerColor,
//                           ),
//                         ),
//                       ),
//                       12.w,
//                       DangerTemplateIconButton(onPressed: () async {
//                         entry = OverlayEntry(builder: (context) {
//                           return TemplateConfirmationDialog(
//                               onConfirmation: () async {
//                                 ViolationRepositoryImpl vil = ViolationRepositoryImpl();
//                                 await vil.deleteViolation(context.read<ViolationDetailsProvider>().violation);

//                                 entry?.remove();
//                                 entry = null;

//                                 Navigator.popUntil(context, (route) => route.settings.name == PlaceHome.route);
//                               },
//                               onCancel: () {
//                                 entry?.remove();
//                               },
//                               title: 'deleteing_vl'.tr(),
//                               message: 'deleting_vl_message'.tr());
//                         });

//                         Overlay.of(context).insert(entry!);
//                       }),
//                     ],
//                   ),
//                   12.h,
//                   _buildInfoContainer('land'.tr().toUpperCase(),
//                       '${detailsProvider.violation.plateInfo.land?.country ?? 'Country'} - ${detailsProvider.violation.plateInfo.land?.code ?? 'Code'}',
//                       icon: Icons.location_city, editable: true, route: PickCountryScreen.route),
//                   _buildInfoContainer('type_with_no_value'.tr().toUpperCase(), detailsProvider.violation.plateInfo.type,
//                       icon: Icons.category, editable: true, route: SelectCarTypeScreen.route),
//                   _buildInfoContainer('status'.tr().toUpperCase(), detailsProvider.violation.status.toUpperCase(),
//                       icon: FontAwesome.exclamation),
//                   _buildInfoContainer('brand'.tr().toUpperCase(), detailsProvider.violation.plateInfo.brand,
//                       icon: FontAwesome.car, editable: true, route: SelectCarBrandScreen.route),
//                   GestureDetector(
//                       onTap: () async {
//                         await showDialog(
//                             context: context,
//                             builder: (context) {
//                               return AlertDialog(
//                                 title: Text('select_date'.tr()),
//                                 content: Container(
//                                   width: 300,
//                                   height: 300,
//                                   child: YearPicker(
//                                       firstDate: DateTime(1990),
//                                       lastDate: DateTime(2240),
//                                       selectedDate: DateTime(2000),
//                                       onChanged: (year) async {
//                                         await violationDetailsProvider.changeViolationYear(year.year.toString());
//                                         Navigator.pop(context);
//                                       }),
//                                 ),
//                               );
//                             });
//                       },
//                       child: _buildInfoContainer('year'.tr().toUpperCase(), detailsProvider.violation.plateInfo.year,
//                           icon: Icons.calendar_month, editable: true)),
//                   GestureDetector(
//                       onTap: () async {
//                         await showDialog(
//                             context: context,
//                             builder: (context) {
//                               return AlertDialog(
//                                 title: Text('enter_description'.tr()),
//                                 shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
//                                 content: Container(
//                                   width: 300,
//                                   child: Column(
//                                     mainAxisSize: MainAxisSize.min,
//                                     children: [
//                                       NormalTemplateTextField(
//                                         lines: 5,
//                                         controller: descriptionController,
//                                         hintText: 'description'.tr().toUpperCase(),
//                                       ),
//                                       12.h,
//                                       Align(
//                                         alignment: Alignment.centerRight,
//                                         child: NormalTemplateButton(
//                                             onPressed: () async {
//                                               await violationDetailsProvider
//                                                   .changeViolationDescription(descriptionController.text);
//                                               Navigator.pop(context);
//                                             },
//                                             text: 'ok'.tr().toUpperCase()),
//                                       )
//                                     ],
//                                   ),
//                                 ),
//                               );
//                             });
//                       },
//                       child: _buildInfoContainer(
//                           'description'.tr().toUpperCase(), detailsProvider.violation.plateInfo.description,
//                           icon: Icons.text_fields, editable: true)),
//                   _buildInfoContainer('color'.tr().toUpperCase(), detailsProvider.violation.plateInfo.color,
//                       icon: Icons.color_lens, editable: true, route: SelectCarColorScreen.route),
//                   _buildInfoContainer('created_at'.tr().toUpperCase(), detailsProvider.violation.createdAt,
//                       icon: Icons.date_range),
//                   if (detailsProvider.violation.is_car_registered && detailsProvider.violation.registeredCar != null)
//                     Column(
//                       children: [
//                         TemplateHeadlineText('more_informations'.tr().toUpperCase()),
//                         12.h,
//                         _buildInfoContainer('registeration_type'.tr().toUpperCase(),
//                             detailsProvider.violation.registeredCar!.registerationType,
//                             icon: Icons.app_registration),
//                         _buildInfoContainer(
//                             'from_with_no_value'.tr().toUpperCase(), detailsProvider.violation.registeredCar!.startDate,
//                             icon: Icons.start),
//                         _buildInfoContainer(
//                             'to_with_no_value'.tr().toUpperCase(), detailsProvider.violation.registeredCar!.endDate,
//                             icon: Icons.start)
//                       ],
//                     )
//                 ],
//               ),
//             ),
//           ),
//         );
//       },
//     );
//   }

//   Widget _buildInfoContainer(String title, String? value,
//       {IconData? icon = Icons.info_outline, bool editable = false, String? route}) {
//     return GestureDetector(
//       onTap: editable && route != null
//           ? () async {
//               Navigator.of(context).pushNamed(route);
//             }
//           : null,
//       child: Container(
//         margin: EdgeInsets.only(bottom: 12),
//         decoration: BoxDecoration(
//           color: Colors.black12,
//         ),
//         child: Row(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Container(
//               padding: EdgeInsets.all(12.0),
//               alignment: Alignment.center,
//               child: Icon(
//                 icon,
//                 size: 30,
//                 color: Colors.white,
//               ),
//               color: primaryColor,
//               height: 60,
//               width: 60,
//             ),
//             12.w,
//             Expanded(
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   6.h,
//                   Text(
//                     title,
//                     style: TextStyle(
//                       fontSize: 16,
//                       fontWeight: FontWeight.bold,
//                     ),
//                   ),
//                   SizedBox(height: 8),
//                   Text(
//                     value ?? '',
//                     style: TextStyle(fontSize: 16),
//                   ),
//                 ],
//               ),
//             ),
//             if (editable)
//               Padding(
//                 padding: const EdgeInsets.all(8.0),
//                 child: Align(
//                   alignment: Alignment.topRight,
//                   child: Icon(Icons.swap_horiz),
//                 ),
//               )
//           ],
//         ),
//       ),
//     );
//   }

//   OverlayEntry? entry;

//   Widget ImagesWidget() {
//     DateFormat format = DateFormat('HH:mm');

//     return Consumer<ViolationDetailsProvider>(
//       builder: (BuildContext context, ViolationDetailsProvider violationDetailsProvider, Widget? child) {
//         return Padding(
//           padding: const EdgeInsets.all(12.0),
//           child: Column(
//             children: [
//               Expanded(
//                 child: GridView.builder(
//                   padding: EdgeInsets.zero,
//                   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
//                       crossAxisCount: 2, mainAxisSpacing: 8.0, crossAxisSpacing: 8.0),
//                   itemCount: violationDetailsProvider.violation.carImages.length,
//                   itemBuilder: (context, index) {
//                     return GestureDetector(
//                       onLongPress: () async {
//                         if (entry?.mounted ?? false) {
//                           entry?.remove();
//                         }

//                         entry = OverlayEntry(builder: (context) {
//                           return TemplateOptionsMenu(
//                             headerText: 'options'.tr().toUpperCase(),
//                             headerColor: Colors.black.withOpacity(0.7),
//                             options: [
//                               TemplateOption(
//                                 text: 'delete'.tr().toUpperCase(),
//                                 icon: Icons.close,
//                                 backgroundColor: dangerColor,
//                                 iconColor: Colors.white,
//                                 textColor: Colors.white,
//                                 onTap: () async {
//                                   await violationDetailsProvider
//                                       .removeImage(violationDetailsProvider.violation.carImages[index]);
//                                   // ViolationRepositoryImpl vil = ViolationRepositoryImpl();
//                                   // await vil.deleteViolation(violation);

//                                   entry?.remove();
//                                   entry = null;
//                                 },
//                               ),
//                               TemplateOption(
//                                   text: 'back'.tr().toUpperCase(),
//                                   icon: Icons.redo,
//                                   backgroundColor: Colors.black12,
//                                   iconColor: Colors.white,
//                                   textColor: Colors.white,
//                                   onTap: () async {
//                                     entry?.remove();
//                                     entry = null;
//                                   }),
//                             ],
//                           );
//                         });

//                         Overlay.of(context).insert(entry!);
//                       },
//                       child: Stack(
//                         children: [
//                           TemplateFileImageContainer(
//                             path: violationDetailsProvider.violation.carImages[index].path,
//                             onTap: () {
//                               Navigator.of(context).push(MaterialPageRoute(
//                                   builder: (context) => TemplateGalleryViewScreen(
//                                         images: violationDetailsProvider.violation.carImages,
//                                         initialIndex: index,
//                                         gallerySource: GallerySource.file,
//                                       )));
//                             },
//                           ),
//                           Align(
//                             alignment: Alignment.bottomLeft,
//                             child: Container(
//                               height: 40,
//                               alignment: Alignment.center,
//                               color: Colors.black54,
//                               child: Text(
//                                 format.format(DateTime.parse(violationDetailsProvider.violation.carImages[index].date)),
//                                 style: TextStyle(color: Colors.white),
//                               ),
//                             ),
//                           )
//                         ],
//                       ),
//                     );
//                   },
//                 ),
//               ),
//               12.h,
//               NormalTemplateButton(
//                 text: 'add_image'.tr().toUpperCase(),
//                 width: double.infinity,
//                 backgroundColor: secondaryColor,
//                 onPressed: () async {
//                   ImagePicker imagePicker = ImagePicker();
//                   XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
//                   if (file != null) {
//                     await violationDetailsProvider.storeImage(file.path);
//                   }
//                 },
//               )
//             ],
//           ),
//         );
//       },
//     );
//   }

//   OverlayEntry? rulesOverlay;
//   Widget RulesWidget() {
//     return Consumer<ViolationDetailsProvider>(
//       builder: (BuildContext context, ViolationDetailsProvider violationDetailsProvider, Widget? child) {
//         final ruleProvider = context.read<RuleProvider>();

//         return Padding(
//           padding: const EdgeInsets.all(12.0),
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.start,
//             children: [
//               Expanded(
//                 child: ListView.separated(
//                   padding: EdgeInsets.zero,
//                   // itemCount: violationDetailsProvider.violation.rules.length,
//                   itemCount: ruleProvider.rules.length,
//                   separatorBuilder: ((context, index) {
//                     return 12.h;
//                   }),
//                   itemBuilder: ((context, index) {
//                     Rule rule = ruleProvider.rules[index];
//                     return GestureDetector(
//                       onTap: () async {
//                         if (violationDetailsProvider.violation.rules.any((element) => element.id == rule.id)) {
//                           await violationDetailsProvider.deattachRuleToViolation(rule);
//                         } else {
//                           // await violationDetailsProvider.attachRuleToViolation(rule);
//                           if (rule.extras?.toJson().entries.any((element) => element.value == true) ?? false) {
//                             Navigator.of(context).push(MaterialPageRoute(
//                                 builder: (context) => ExtrasScreen(
//                                       rule: rule,
//                                       status: ExtraStatus.saved,
//                                     )));
//                           } else {
//                             await context.read<ViolationDetailsProvider>().attachRuleToViolation(rule);
//                           }
//                         }
//                       },
//                       child: TemplateContainerCard(
//                         backgroundColor:
//                             violationDetailsProvider.violation.rules.any((element) => element.id == rule.id)
//                                 ? primaryColor
//                                 : Colors.black12,
//                         textColor: violationDetailsProvider.violation.rules.any((element) => element.id == rule.id)
//                             ? null
//                             : Colors.black,
//                         title: '${rule.name} (${rule.charge} kr)',
//                         // icon: Icons.euro,
//                       ),
//                     );
//                   }),
//                 ),
//               ),
//             ],
//           ),
//         );
//       },
//     );
//   }

//   Widget PrintWidget() {
//     final media = MediaQuery.of(context).size;

//     return Consumer<ViolationDetailsProvider>(
//       builder: (BuildContext context, ViolationDetailsProvider violationDetailsProvider, Widget? child) {
//         final provider = Provider.of<ViolationDetailsProvider>(context, listen: false);
//         return Padding(
//           padding: const EdgeInsets.all(12.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               if (provider.isTimerActive)
//                 Column(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   children: [
//                     TemplateParagraphText('wait_time_message'.tr(args: [provider.maxTimePolicy.toString()])),
//                     12.h,
//                     TemplateHeadlineText('time_passed'.tr(args: [provider.timePassed])),
//                   ],
//                 ),
//               if (provider.isTimerActive) 24.h,
//               Expanded(
//                 child: ListView.separated(
//                   padding: EdgeInsets.zero,
//                   shrinkWrap: true,
//                   physics: const NeverScrollableScrollPhysics(),
//                   itemCount: violationDetailsProvider.printOptions.length,
//                   itemBuilder: (context, index) {
//                     return GestureDetector(
//                       onTap: () async {
//                         await violationDetailsProvider.setSelectedPrintOptionIndex(index);
//                       },
//                       child: Container(
//                         width: media.width * 0.7,
//                         height: 40,
//                         alignment: Alignment.center,
//                         decoration: BoxDecoration(
//                             color: violationDetailsProvider.selectedPrintOptionIndex == index
//                                 ? Colors.blue
//                                 : Colors.black12),
//                         child: Text(
//                           violationDetailsProvider.printOptions[index].name.tr().toUpperCase(),
//                           style: TextStyle(
//                               color: violationDetailsProvider.selectedPrintOptionIndex == index
//                                   ? Colors.white
//                                   : Colors.black),
//                         ),
//                       ),
//                     );
//                   },
//                   separatorBuilder: (context, index) {
//                     return SizedBox(
//                       height: 12,
//                     );
//                   },
//                 ),
//               ),
//               Opacity(
//                 opacity: provider.isTimerActive
//                     ? 0.5
//                     : (provider.violation.carImages.isNotEmpty &&
//                             provider.violation.rules.isNotEmpty &&
//                             provider.violation.plateInfo.brand != null &&
//                             violationDetailsProvider.violation.plateInfo.brand != null &&
//                             violationDetailsProvider.violation.plateInfo.color != null &&
//                             violationDetailsProvider.violation.plateInfo.description != null &&
//                             violationDetailsProvider.violation.plateInfo.type != null &&
//                             violationDetailsProvider.violation.plateInfo.land != null &&
//                             violationDetailsProvider.violation.plateInfo.year != null
//                         ? 1
//                         : 0.5),
//                 child: AbsorbPointer(
//                   absorbing: provider.isTimerActive ||
//                       provider.violation.carImages.isEmpty ||
//                       provider.violation.rules.isEmpty ||
//                       violationDetailsProvider.violation.plateInfo.brand == null ||
//                       violationDetailsProvider.violation.plateInfo.color == null ||
//                       violationDetailsProvider.violation.plateInfo.description == null ||
//                       violationDetailsProvider.violation.plateInfo.type == null ||
//                       violationDetailsProvider.violation.plateInfo.land == null ||
//                       violationDetailsProvider.violation.plateInfo.year == null,
//                   child: NormalTemplateButton(
//                     width: double.infinity,
//                     backgroundColor: secondaryColor,
//                     onPressed: () async {
//                       print(violationDetailsProvider.violation.rules.first.extras?.valuesToJson());

//                       ImagePicker imagePicker = ImagePicker();
//                       XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
//                       if (file != null) {
//                         await violationDetailsProvider.storeImage(file.path);
//                         SnackbarUtils.showSnackbar(context, 'vl_is_completed'.tr());
//                         Navigator.popUntil(
//                             context,
//                             (route) =>
//                                 route.settings.name == PlaceHome.route ||
//                                 route.settings.name == BottomScreenNavigator.route);
//                         await Provider.of<ViolationDetailsProvider>(context, listen: false).uploadViolationToServer();

//                         ViolationRepositoryImpl vil = ViolationRepositoryImpl();
//                         await vil.deleteViolation(violationDetailsProvider.violation);
//                       }

//                       await context.read<CreateViolationProvider>().clearAll();
//                     },
//                     text: 'print'.tr().toUpperCase(),
//                   ),
//                 ),
//               ),
//             ],
//           ),
//         );
//       },
//     );
//   }
// }
