import 'dart:convert';

import 'package:back_button_interceptor/back_button_interceptor.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:iconsax/iconsax.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/utils/navigation.dart';
import 'package:parksync_application/presentation/providers/create_ticket_provider.dart';
import 'package:parksync_application/presentation/providers/place_provider.dart';
import 'package:parksync_application/presentation/screens/issue_ticket/print_ticket_preview.dart';
import 'package:parksync_application/presentation/screens/place_home.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_button.dart';
import 'package:parksync_application/presentation/widgets/template/components/template_text_field.dart';
import 'package:parksync_application/presentation/widgets/template/extensions/sizedbox_extension.dart';
import 'package:parksync_application/presentation/widgets/template/theme/colors_theme.dart';

import '../../../core/utils/snackbar_utils.dart';
import '../../../data/models/land_model.dart';
import '../../../data/models/rule_model.dart';
import '../../providers/rule_provider.dart';
import '../../widgets/template/components/template_image.dart';
import '../../widgets/template/components/template_option.dart';
import '../../widgets/template/components/template_options_menu.dart';
import '../../widgets/template/components/template_text.dart';
import '../gallery_view.dart';

class CreateNewTicket extends StatefulWidget {
  static const route = '/create_new_ticket';

  const CreateNewTicket({super.key});
  @override
  _CreateNewTicketState createState() => _CreateNewTicketState();
}

class _CreateNewTicketState extends State<CreateNewTicket> {
  int _currentIndex = 0;
  final List<Widget> _children = [const EnterPlatePage(), const IssueTicketPage()];

  Future<bool> returnBackInterceptor(bool stopDefaultButtonEvent, RouteInfo info) async {
    context.read<CreateTicketProvider>().cancelPrintTimer();

    if (info.currentRoute(context)!.settings.name == CreateNewTicket.route || info.currentRoute(context)!.settings.name == PrintTicketPreview.route) {
          if(info.currentRoute(context)!.settings.name == CreateNewTicket.route){
            context.read<CreateTicketProvider>().clearAll();
          }
          return false;
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
    initializeRules();
    BackButtonInterceptor.add(returnBackInterceptor);
    
    initializeTimer();
  }

  void initializeTimer() async{
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async{
      final placeProvider = Provider.of<PlaceProvider>(context, listen: false);
      final createTicketProvider = Provider.of<CreateTicketProvider>(context, listen: false);
    

      if(placeProvider.selectedPlaceLoginTime != null){
        createTicketProvider.setSiteLoginTime(placeProvider.selectedPlaceLoginTime);
        createTicketProvider.updateTimePolicy();
      }
    });
  }

  void initializeRules() async{
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async{
      await Provider.of<RuleProvider>(context, listen: false).fetchRules();
    });
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
                        children: List.generate(2, (index) {
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
                    backgroundColor: MaterialStateProperty.all(_currentIndex != 1 ? primaryColor : Colors.black12),
                    foregroundColor: MaterialStateProperty.all(_currentIndex != 1 ? Colors.white : Colors.black54),
                    padding: MaterialStateProperty.all(const EdgeInsets.all(0.0)),
                    minimumSize: MaterialStateProperty.all(const Size(48, 32)),
                    shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0)
                    ))
                  ),
                  onPressed: _currentIndex == 1 ? null : () => onTabTapped(_currentIndex + 1),
                  child: const Icon(Icons.arrow_forward),
                ),

                const Spacer(),
                Opacity(
                   opacity: createTicketProvider.isTimerActive
                    ? 0.5
                    : (createTicketProvider.carImages.isNotEmpty &&
                            createTicketProvider.rules.isNotEmpty &&
                            createTicketProvider.plateInfo.carModel != null &&
                            createTicketProvider.plateInfo.carColor != null &&
                            createTicketProvider.plateInfo.carDescription != null &&
                            createTicketProvider.plateInfo.carType != null &&
                            createTicketProvider.plateInfo.land != null &&
                            createTicketProvider.plateInfo.manufactureYear != null
                        ? 1
                        : 0.5),
                  child: AbsorbPointer(                    
                        absorbing: createTicketProvider.isTimerActive ||
                        createTicketProvider.carImages.isEmpty ||
                        createTicketProvider.rules.isEmpty ||
                        createTicketProvider.plateInfo.carModel == null ||
                        createTicketProvider.plateInfo.carColor == null ||
                        createTicketProvider.plateInfo.carDescription == null ||
                        createTicketProvider.plateInfo.carType == null ||
                        createTicketProvider.plateInfo.land == null ||
                        createTicketProvider.plateInfo.manufactureYear == null,
                    child: GestureDetector(
                            onTap: () async{
                              await showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return AlertDialog(
                                    elevation: 0,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(0)),
                                    insetPadding: const EdgeInsets.all(8),
                                    titlePadding: const EdgeInsets.all(8),
                                    contentPadding: const EdgeInsets.all(8),
                                    actionsPadding: const EdgeInsets.all(0),
                                    title: const Text('Print'),
                                    content: const Text('Continue to print ticket?'),
                                    actions: [
                                      TextButton(
                                        child: const Text('No', style: TextStyle(color: dangerColor)),
                                        onPressed: () {
                                          Navigator.of(context).pop();
                                        },
                                      ),
                                      TextButton(
                                        child: const Text('Yes', style: TextStyle(color: primaryColor)),
                                        onPressed: () {
                                          navigateBack(context);
                                          navigateNamed(context, PrintTicketPreview.route);
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
                  ),
                ),
                      8.w,
                      if(createTicketProvider.ticketMode != TicketMode.editing)
                GestureDetector(
                        onTap: ()async {
                          await showDialog(
                            context: context,
                            builder: (BuildContext _context) {
                              return AlertDialog(
                                elevation: 0,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(0)),
                                insetPadding: const EdgeInsets.all(4),
                                titlePadding: const EdgeInsets.all(8),
                                contentPadding: const EdgeInsets.all(8),
                                actionsPadding: const EdgeInsets.all(4),
                                title: const Text('Save'),
                                content: const Text('Do you want to save this ticket?'),
                                actions: [
                                  TextButton(
                                    child: const Text('No', style: TextStyle(color: dangerColor),),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                  TextButton(
                                    child: const Text('Yes', style: TextStyle(color: primaryColor),),
                                    onPressed: () async{
                                      final placeProvider = context.read<PlaceProvider>();
                                    
                
                                      context.read<CreateTicketProvider>().saveViolation(
                                        place: placeProvider.selectedPlace!,
                                        placeLoginTime: placeProvider.selectedPlaceLoginTime.toString(),
                                      );

                                      SnackbarUtils.showSnackbar(context, 'Ticket saved successfully');
                                      Navigator.of(context).popUntil((route) => route.settings.name == PlaceHome.route);
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
                          child: const Icon(Icons.save_outlined, color: Colors.white, size: 30,),
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

class EnterPlatePage extends StatefulWidget {
  const EnterPlatePage({super.key});

  @override
  State<EnterPlatePage> createState() => _EnterPlatePageState();
}

class _EnterPlatePageState extends State<EnterPlatePage> {
  final TextEditingController _controller = TextEditingController();

    Widget _buildInfoContainer(String title, String? value,
      {IconData? icon = Icons.info_outline, required VoidCallback onTap, bool editable = false}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
                const Spacer(),
                if (editable)
                  IconButton(
                    icon: const Icon(
                      Iconsax.edit,
                      size: 24,
                      color: primaryColor,
                    ),
                    onPressed: onTap,
                  ),
        ],
      ),
    );
  }

    @override
    void initState() {
      super.initState();
      initializeCountries();
    }

  List<Land> countries = [];

    void initializeCountries() async {
      final String response = await rootBundle.loadString('assets/countries_data/countries/countries.json');
      List decoded = await jsonDecode(response);
      countries = decoded.map((c) {
        return Land.fromJsonFile(c);
      }).toList();

      countries.sort((a, b) => b.rank - a.rank);

      setState(() {});
    }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              children: [
            Expanded(
        child: NormalTemplateTextField(
                controller: _controller,
                hintText: 'Enter Car Plate Number',
              ),
            ),
            8.w,
            NormalTemplateButton(
              height: 48,
              onPressed: () async{
                await context.read<CreateTicketProvider>().getPlateInfo(_controller.text);
                await context.read<CreateTicketProvider>().checkCarRegistration(_controller.text);
              },
              text: 'Search'.toUpperCase(),
            ),
              ],
            ),
            12.h,
        
              Consumer<CreateTicketProvider>(
                builder: (BuildContext context, CreateTicketProvider createTicketProvider, Widget? child) {
                  return Column(
                    children: [
                                            _buildInfoContainer(
                        'Plate Number'.tr().toUpperCase(),
                        '${createTicketProvider.plateInfo.plateNumber}',
                        icon: FontAwesome.drivers_license_o,
                        onTap: (){

                        }
                      ),
                      _buildInfoContainer(
                        'land'.tr().toUpperCase(),
                        '${createTicketProvider.plateInfo.land?.country} - ${createTicketProvider.plateInfo.land?.code}',
                        icon: Iconsax.location,
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(0),
                                insetPadding: const EdgeInsets.all(0),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: SingleChildScrollView(
                                  child: Column(
                                    children: [
                                      ...countries.map((c) {
                                        return Container(
                                              margin: const EdgeInsets.only(bottom: 8.0),
                                              child: ListTile(
                                                onTap: () {
                                                  createTicketProvider.setLand(
                                                    c
                                                  );
                                                  Navigator.pop(context);
                                                },
                                                contentPadding: const EdgeInsets.all(8.0),
                                                leading: Image.asset(c.flag ?? ''),
                                                title: Text(c.code.toString().toUpperCase()),
                                              ),
                                            );
                                      })
                                    ],
                                  ),
                                ),
                              );
                            },
                          );
                        },
                        editable: true
                      ),
        
                      _buildInfoContainer(
                        'type_with_no_value'.tr().toUpperCase(), 
                        createTicketProvider.plateInfo.carType ?? 'N/A', 
                        icon: Iconsax.category,
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.plateInfo.carType),
                                      hintText: 'Enter Car Type',
                                      onChanged: (value){
                                        createTicketProvider.setCarType(value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 48,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        },
                        editable: true
                      ),
                      _buildInfoContainer(
                        'brand'.tr().toUpperCase(), 
                        createTicketProvider.plateInfo.carModel ?? 'N/A', 
                        icon: Iconsax.car,
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.plateInfo.carModel),
                                      hintText: 'Enter Car model',
                                      onChanged: (value) async{
                                        await createTicketProvider.setCarModel(value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 48,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        },
                        editable: true
                      ),
        
                      _buildInfoContainer(
                        'year'.tr().toUpperCase(), 
                        createTicketProvider.plateInfo.manufactureYear ?? 'N/A',
                        icon: Iconsax.calendar,
                        editable: true, 
                        onTap: () async {
                          await showDialog(
                              context: context,
                              builder: (context) {
                                return AlertDialog(
                                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
                                  elevation: 0,
                                  title: Text('select_date'.tr()),
                                  content: SizedBox(
                                    width: 300,
                                    height: 300,
                                    child: YearPicker(
                                        
                                        firstDate: DateTime(1990),
                                        lastDate: DateTime(2240),
                                        selectedDate: DateTime(2000),
                                        onChanged: (year) {
                                          createTicketProvider.changeCarManufactureYear(year.year.toString());
                                          Navigator.pop(context);
                                        }),
                                  ),
                                );
                              });
                        },
                      ),
        
                      _buildInfoContainer(
                        'color'.tr().toUpperCase(), 
                        createTicketProvider.plateInfo.carColor ?? 'N/A', 
                        icon: Iconsax.colorfilter,
                        editable: true,
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.plateInfo.carColor),
                                      hintText: 'Enter Car color',
                                      onChanged: (value){
                                        createTicketProvider.setCarColor(value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 48,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        }
                      ),
        
                      _buildInfoContainer(
                        'description'.tr().toUpperCase(), 
                        createTicketProvider.plateInfo.carDescription ?? 'N/A', 
                        icon: Iconsax.text,
                        editable: true,
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.plateInfo.carDescription),
                                      hintText: 'Enter Car description',
                                      lines: 6,
                                      onChanged: (value){
                                        createTicketProvider.setCarDescription(value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 48,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        }
                      ),
        
                      _buildInfoContainer(
                        'Created At', 
                        DateHelper.getCurrentDateTime(), 
                        icon: Iconsax.calendar_1,
                        onTap: (){
                          
                        }
                      ),
        
                      const Divider(),
        
                      _buildInfoContainer(
                        'Registration Type', 
                        createTicketProvider.registeredCar?.registeredCarType.name ?? 'N/A', 
                        icon: Iconsax.ticket,
                        onTap: (){
                          
                        }
                      ),
                      // _buildInfoContainer(
                      //   'Start Date', 
                      //   createTicketProvider.registeredCar?.startDate ?? 'N/A', 
                      //   icon: Iconsax.calendar_1,
                      //   onTap: (){
                          
                      //   }
                      // ),
                      //                     _buildInfoContainer(
                      //   'End Date', 
                      //   createTicketProvider.registeredCar?.endDate ?? 'N/A', 
                      //   icon: Iconsax.calendar_1,
                      //   onTap: (){
                          
                      //   }
                      // ),
                      
                    ],
                  );
                },
              )
            
          ],
        ),
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

  final TextEditingController _ticketCommentController = TextEditingController();
  final TextEditingController _systemCommentController = TextEditingController();

  @override
  void dispose() {
    _ticketCommentController.dispose();
    _systemCommentController.dispose();
    super.dispose();
  }

    int day = DateTime.now().day;
  int month = DateTime.now().month;
  int year = DateTime.now().year;

  int minute = DateTime.now().minute;
  int hour = DateTime.now().hour;

  Widget _buildStepper(String label, int value, ValueSetter<int> onChanged, int? max) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8.0),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                icon: Icon(Icons.arrow_upward),
                onPressed: () {
                  if (max == null || value <= max) {
                    onChanged(value + 1);
                  }
                },
              ),
              Text(
                '$value',
                style: TextStyle(fontSize: 16.0),
              ),
              IconButton(
                icon: Icon(Icons.arrow_downward),
                onPressed: () {
                  if (value > 1) {
                    onChanged(value - 1);
                  }
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRulesWidget() {
    final createTicketProvider = Provider.of<CreateTicketProvider>(context, listen: false);

    return Column(
      children: [
        Consumer<CreateTicketProvider>(
          builder: (BuildContext context, CreateTicketProvider state, Widget? child) {
            if(state.rules.isEmpty) {
              return const Center(
                child: Text('No rules selected'),
              );
            }
        
            return ListView.builder(
              padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: state.rules.length,
                  itemBuilder: (context, index) {
            return Column(
              children: [
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(FontAwesome.book),
                  subtitle: Text('${state.rules[index].charge} Kr.'),
                  trailing: GestureDetector(
                    child: const Icon(FontAwesome.close, color: dangerColor),
                    onTap: () {
                      context.read<CreateTicketProvider>().removeRule(state.rules[index]);
                    },
                  ),
                  title: Text(state.rules[index].name),
                ),

                if(state.rules[index].extras != null && state.rules[index].extras!.meterReceiptNumber)
                Container(
                  margin: EdgeInsets.only(bottom: 4),
                  child: Row(
                    children: [
                      const Text('Meter Receipt Number: '),
                      4.w,
                      Text(state.rules[index].extras!.meterReceiptNumberValue ?? 'N/A'),
                      const Spacer(),
                      GestureDetector(
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.rules[index].extras!.meterReceiptNumberValue),
                                      hintText: 'Meter Receipt Number',
                                      keyboardType: TextInputType.number,
                                      onChanged: (value){
                                        createTicketProvider.setRuleMeterReceiptNumber(index: index, ruleMeterReceiptNumberValue: value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 32,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        },
                        child: const Icon(Iconsax.edit, color: primaryColor),
                      )
                    ],
                  ),
                ),
                if(state.rules[index].extras != null && state.rules[index].extras!.meterNumber)
                Container(
                  margin: EdgeInsets.only(bottom: 4),
                  child: Row(
                    children: [
                      const Text('Meter Number: '),
                      4.w,
                      Text(state.rules[index].extras!.meterNumberValue ?? 'N/A'),
                      const Spacer(),
                      GestureDetector(
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.rules[index].extras!.meterNumberValue),
                                      hintText: 'Meter = Number',
                                      keyboardType: TextInputType.number,
                                      onChanged: (value){
                                        createTicketProvider.setRuleMeterNumber(index: index, ruleMeterNumberValue: value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 32,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        },
                        child: const Icon(Iconsax.edit, color: primaryColor)
                        
                      )
                    ],
                  ),
                ),
                if(state.rules[index].extras != null && state.rules[index].extras!.expiryDate)
                Container(
                  margin: EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      const Text('Expiry Date: '),
                      4.w,
                      Text(state.rules[index].extras!.expiryDateValue ?? 'N/A'),
                      const Spacer(),
                      GestureDetector(
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return StatefulBuilder(
                                builder: (context, setState) {
                                  return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                        children: [
                                          _buildStepper('Day', day, (value) => setState(() => day = value), 31),
                                          _buildStepper('Month', month, (value) => setState(() => month = value), 12),
                                          _buildStepper('Year', year, (value) => setState(() => year = value), null),
                                        ],
                                      ),
                                      SizedBox(
                                        height: 24,
                                      ),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                        children: [
                                          _buildStepper('Hour', hour, (value) => setState(() => hour = value), 24),
                                          _buildStepper('Minute', minute, (value) => setState(() => minute = value), 60),
                                        ],
                                      )
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 32,
                                      onPressed: (){
                                        createTicketProvider.setRuleExpiryDate(index: index, ruleExpiryDateValue: '$day.$month.$year $hour:$minute');
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                                },
                              );
                          }
                          );
                        },
                        child: const Icon(Iconsax.edit, color: primaryColor)
                      )
                    ],
                  ),
                ),


                      if(state.rules[index].extras != null && state.rules[index].extras!.paidAmount)
                Container(
                  margin: EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      const Text('Paid Amount: '),
                      4.w,
                      Text(state.rules[index].extras!.paidAmountValue ?? 'N/A'),
                      const Spacer(),
                      GestureDetector(
                        onTap: () async{
                          await showDialog(
                            context: context,
                            builder: (context){
                              return AlertDialog(
                                contentPadding: const EdgeInsets.all(8),
                                insetPadding: const EdgeInsets.all(0),
                                actionsPadding: const EdgeInsets.all(8),
                                elevation: 0,
                                shape: const RoundedRectangleBorder(
                                  borderRadius: BorderRadius.zero,
                                ),
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    NormalTemplateTextField(
                                      controller: TextEditingController(text: createTicketProvider.rules[index].extras!.paidAmountValue),
                                      hintText: 'Paid Amount = Number',
                                      keyboardType: TextInputType.number,
                                      onChanged: (value){
                                        createTicketProvider.setRulePaidAmount(index: index, rulePaidAmountValue: value);
                                      },
                                    ),
                                    
                                  ]
                                ),
                                actions: [
                                                                    NormalTemplateButton(
                                      height: 32,
                                      onPressed: (){
                                        Navigator.pop(context);
                                      },
                                      text: 'save'.tr().toUpperCase(),
                                    )
                                ],
                            );
                          }
                          );
                        },
                        child: const Icon(Iconsax.edit, color: primaryColor))
                    ],
                  ),
                ),
              ],
            );
                  },
                );
          },
        ),

        GestureDetector(
          onTap: () async{
            await showDialog(
                                context: context,
                                builder: (context) {
                                  return AlertDialog(
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4.0)),
                                    contentPadding: const EdgeInsets.all(12.0),
                                    insetPadding: EdgeInsets.zero,
                                    actionsPadding: EdgeInsets.zero,
                                    elevation: 0,
                                    backgroundColor: const Color.fromARGB(255, 241, 241, 241),
                                    content: Container(
                                      width: 300,
                                      height: 600,
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(4.0),
                                      ),
                                      child: ListView.builder(
                                        itemCount: context.read<RuleProvider>().rules.length,
                                        itemBuilder: (context, index) {
                                          final rule = context.read<RuleProvider>().rules[index];
                                          return Container(
                                            margin: index == context.read<RuleProvider>().rules.length - 1 ? EdgeInsets.zero : EdgeInsets.only(bottom: 12),
                                            child: ListTile(
                                                tileColor: primaryColor,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(4.0),
                                                ),
                                                leading: const Icon(FontAwesome.book, color: Colors.white),  
                                                onTap: () {
                                                  context.read<CreateTicketProvider>().pushRule(rule);
                                                  Navigator.of(context).pop();
                                                },
                                                title: Text(rule.name, style: const TextStyle(color: Colors.white)),
                                                subtitle: Text('${rule.charge} Kr.', style: const TextStyle(color: Colors.white)),
                                              ),
                                          );
                                        },
                                      ),
                                    ),
                                  );
                                });
          },
          child: Container(
            margin: const EdgeInsets.only(top: 8),
            child: DottedBorder(
                  color: primaryColor,
                  strokeWidth: 1,
                  child: Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.add, color: primaryColor),
                        8.w,
                        const Text(
                          'Add more rules',
                          style: TextStyle(
                            fontSize: 16.0,
                            color: primaryColor,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
          ),
        )
      ],
    );
  }

  Widget _buildComments(){
    return Container(
      margin: const EdgeInsets.only(top: 8),
      child: Column(
        children: [
          NormalTemplateTextField(
            hintText: 'Ticket Comment',
            controller: _ticketCommentController..text = context.read<CreateTicketProvider>().ticketComment,
            lines: 3,
            onChanged: (state) => context.read<CreateTicketProvider>().setTicketComment(state),
          ),

          12.h,
        
      NormalTemplateTextField(
        hintText: 'System Comment',
        controller: _systemCommentController..text = context.read<CreateTicketProvider>().systemComment,
        lines: 3,
        onChanged: (state) => context.read<CreateTicketProvider>().setSystemComment(state),
      )
        ],
      ),
    );
  }

  Widget _buildCarImagesWidget() {
    return Consumer(
      builder: (BuildContext context, CreateTicketProvider state, Widget? child) {
        return Container(
      margin: const EdgeInsets.only(top: 8),
      child: GridView.builder(
        shrinkWrap: true,
        padding: EdgeInsets.zero,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3, mainAxisSpacing: 8.0, crossAxisSpacing: 8.0),
        itemCount: state.carImages.length + 1,
        itemBuilder: (context, index) {
          if (index == state.carImages.length) {
            return GestureDetector(
              onTap: () async{
                ImagePicker imagePicker = ImagePicker();
                  XFile? file = await imagePicker.pickImage(source: ImageSource.camera);
                  if (file != null) {
                    state.pushCarImage(file.path);
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
          return GestureDetector(
            onLongPress: () async{
              await showDialog(
                context: context,
                barrierDismissible: false,
                builder: (context) {
                  return TemplateOptionsMenu(
                            headerText: 'options'.tr().toUpperCase(),
                            headerColor: primaryColor,
                            options: [
                              TemplateOption(
                                text: 'delete'.tr().toUpperCase(),
                                icon: Icons.close,
                                backgroundColor: dangerColor,
                                iconColor: Colors.white,
                                textColor: Colors.white,
                                onTap: () async {
                                  state.removeCarImage(state.carImages[index]);
                                  Navigator.of(context).pop();
                                },
                              ),
                              TemplateOption(
                                  text: 'back'.tr().toUpperCase(),
                                  icon: Icons.redo,
                                  backgroundColor: Colors.black12,
                                  iconColor: Colors.white,
                                  textColor: Colors.white,
                                  onTap: () async {
                                    Navigator.of(context).pop();
                                  }),
                            ],
                          );
                }
              );
            },
            child: Stack(
                          children: [
                            TemplateFileImageContainer(
                              path: state.carImages[index].path,
                              onTap: () {
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context) => TemplateGalleryViewScreen(
                                          images: state.carImages,
                                          initialIndex: index,
                                          gallerySource: GallerySource.file,
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
                                  state.carImages[index].date,
                                  style: const TextStyle(color: Colors.white),
                                ),
                              ),
                            )
                          ],
                        ),
          );
          
          }
      ),
    );
      }
    );
  }


    

  Widget _buildPrintOptions() {
    final createTicketProvider = context.watch<CreateTicketProvider>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Print option',
          style: TextStyle(
            fontSize: 16.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        8.h,
        ...List.generate(createTicketProvider.printOptions.length, (index) {
          return Row(
            children: [
              Radio(
                value: index,
                groupValue: createTicketProvider.printOptionIndex,
                onChanged: (value) {
                  createTicketProvider.setPrintOptionIndex(index);
                },
              ),
              Text(createTicketProvider.printOptions[index])
            ],
          );
        })
      ],
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
            16.h,
            const Divider(),
            16.h,
            _buildCarImagesWidget(),
            16.h,
            const Divider(),
            16.h,
            _buildComments(),
            16.h,
            _buildPrintOptions()

          ],
        ),
      ),
    );
  }
}
