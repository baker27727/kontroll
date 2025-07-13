import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:parksync_application/core/helpers/date_helper.dart';
import 'package:parksync_application/core/helpers/logger.dart';
import 'package:parksync_application/data/models/land_model.dart';
import 'package:parksync_application/data/models/ticket_preview.dart';
import 'package:parksync_application/data/repositories/local/saved_violation_repository.dart';
import 'package:parksync_application/data/repositories/remote/car_repository_impl.dart';

import '../../data/models/car_image_model.dart';
import '../../data/models/place_model.dart';
import '../../data/models/plate_info_model.dart';
import '../../data/models/registered_car_model.dart';
import '../../data/models/rule_model.dart';
import '../../data/models/saved_violation.dart';
import '../../data/repositories/remote/autosys_repository_impl.dart';

enum TicketMode {
  creating,
  editing
}

class CreateTicketProvider extends ChangeNotifier {
  List<Rule> rules = [];
  String ticketComment = '';
  String systemComment = '';
  List<CarImage> carImages = [];
  bool isCarRegistered = false;
  RegisteredCar? registeredCar;
  PlateInfo plateInfo = PlateInfo.unknown('');

  List<String> printOptions = ["Fastet på kjøretøyet", "Sendt per post", "Levert til  fører"];
  int? printOptionIndex = 0;

  TicketMode ticketMode = TicketMode.creating;

  TicketPreview? ticketPreview;

  void setPrintOptionIndex(int index) {
    printOptionIndex = index;
    notifyListeners();
  }

  void setTicketMode(TicketMode mode) {
    ticketMode = mode;
    notifyListeners();
  }


  final SavedViolationRepository _savedViolationRepository = SavedViolationRepository();
  final AutosysRepository autosysRepository = AutosysRepository();
  final CarRepository carRepository = CarRepository();

  String? currentPlateNumber;

  SavedViolation? currentUpdatingViolation;

  void setCurrentUpdatingViolation(SavedViolation? violation) {
    currentUpdatingViolation = violation;

    if (violation != null) {
      currentPlateNumber = violation.plateInfo.plateNumber;
      rules = violation.rules;
      ticketComment = violation.ticketComment;
      systemComment = violation.systemComment;
      carImages = violation.carImages;
      isCarRegistered = violation.isCarRegistered;
      registeredCar = violation.registeredCar;
      printOptionIndex = printOptions.indexOf(violation.printOption);
      plateInfo = violation.plateInfo;

      printOptionIndex = printOptions.indexOf(violation.printOption);
    }
    notifyListeners();
  }

  void setCurrentPlateNumber(String plateNumber) {
    currentPlateNumber = plateNumber;
    notifyListeners();
  }

  Future<void> pushRule(Rule rule) async{
    if(rules.any((element) => element.id == rule.id)) {
      return;
    }

    rules.add(rule);

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    if (rules.length == 1) {
      updateTimePolicy();
    }

    notifyListeners();
  }

  Future<void> removeRule(Rule rule) async{
    rules = rules.where((element) => element.id != rule.id).toList();

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    if (rules.isEmpty) {
      cancelPrintTimer();
    }

    if (rules.length == 1) {
      updateTimePolicy();
    }
    notifyListeners();
  }

  Future<void> setRuleMeterReceiptNumber({ required int index, required String ruleMeterReceiptNumberValue }) async{
    rules[index].extras?.meterReceiptNumberValue = ruleMeterReceiptNumberValue;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    notifyListeners();
  }

  Future<void> setRuleMeterNumber({ required int index, required String ruleMeterNumberValue }) async{
    rules[index].extras?.meterNumberValue = ruleMeterNumberValue;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    notifyListeners();
  }

  Future<void> setRuleExpiryDate({ required int index, required String ruleExpiryDateValue }) async{
    rules[index].extras?.expiryDateValue = ruleExpiryDateValue;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    notifyListeners();
  }

  Future<void> setRulePaidAmount({ required int index, required String rulePaidAmountValue }) async{
    rules[index].extras?.paidAmountValue = rulePaidAmountValue;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'rules': jsonEncode(rules.map((e) => e.toJson()).toList())
        }
      );
    }

    notifyListeners();
  }

  Future<void> setTicketComment(String ticketComment) async{
    this.ticketComment = ticketComment;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'ticket_comment': ticketComment
        }
      );
    }

    notifyListeners();
  }

  Future<void> setSystemComment(String systemComment) async{
    this.systemComment = systemComment;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'system_comment': systemComment
        }
      );
    }

    notifyListeners();
  }

  Future<void> pushCarImage(String imagePath) async{
    final String localPath = (await getApplicationDocumentsDirectory()).path;
    final File _file = File(imagePath);
    String cachedPath = '$localPath/${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(176676767)}.png';
    await _file.copy(cachedPath);
    CarImage carImage = CarImage.fromString(cachedPath);
    carImage.id = Random().nextInt(999999);
    carImages.add(carImage);

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'car_images': jsonEncode(carImages.map((e) => e.toJson()).toList()),
        }
      );
    }

    notifyListeners();
  }

  Future<void> removeCarImage(CarImage carImage) async{
    carImages = carImages.where((element) => element.id != carImage.id).toList();

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'car_images': jsonEncode(carImages.map((e) => e.toJson()).toList()),
        }
      );

    notifyListeners();
    }
  }

  Future<void> setLand(Land? land) async{
    plateInfo.land = land;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }

    notifyListeners();
  }

  Future<void> setCarType(String? carType) async{
    plateInfo.carType = carType;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }

    notifyListeners();
  }

  Future<void> setCarModel(String? carBrand) async{
    plateInfo.carModel = carBrand;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }

    notifyListeners();
  }

  void changeCarManufactureYear(String? carYear) {
    plateInfo.manufactureYear = carYear;
    notifyListeners();
  }

  Future<void> setCarColor(String? carColor) async{
    plateInfo.carColor = carColor;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }

    notifyListeners();
  }

  Future<void> setCarDescription(String? carDescription) async{
    plateInfo.carDescription = carDescription;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }

    notifyListeners();
  }

  Future<void> getPlateInfo(String plateNumber) async{
    if(plateNumber.isEmpty){
      PlateInfo _plateInfo = PlateInfo.unknown(plateNumber);
      plateInfo = _plateInfo;

      if(ticketMode == TicketMode.editing) {
        await _savedViolationRepository.updateViolation(
          id: currentUpdatingViolation!.id, 
          data: {
            'plate_info': jsonEncode(plateInfo.toJson()),
          }
        );
      }

      notifyListeners();
      return;
    }


    PlateInfo _plateInfo = await autosysRepository.getCarInfo(plateNumber);
    plateInfo = _plateInfo;

    
    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'plate_info': jsonEncode(plateInfo.toJson()),
        }
      );
    }
    notifyListeners();
  } 

  Future<void> checkCarRegistration(String? plateNumber) async{
    if(plateNumber?.isEmpty ?? true){
      isCarRegistered = false;
      registeredCar = null;

      if(ticketMode == TicketMode.editing) {
        await _savedViolationRepository.updateViolation(
          id: currentUpdatingViolation!.id, 
          data: {
            'is_car_registered': 'false',
            'registered_car_info': jsonEncode(null),
          }
        );
      }
      notifyListeners();
      return;
    }

    RegisteredCar? _registeredCar = await carRepository.getCarByPlate(plateNumber);
    isCarRegistered = _registeredCar != null;
    registeredCar = _registeredCar;

    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.updateViolation(
        id: currentUpdatingViolation!.id, 
        data: {
          'is_car_registered': isCarRegistered ? 'true' : 'false',
          'registered_car_info': jsonEncode(registeredCar?.toJson()),
        }
      );
    }
    notifyListeners();
  }

  void saveViolation({
    required Place place,
    required String placeLoginTime
  }) async{

    await checkCarRegistration(currentPlateNumber);

    await _savedViolationRepository.saveViolation(
      plateInfo: plateInfo,
      rules: rules,
      ticketComment: ticketComment,
      systemComment: systemComment,
      place: place,
      carImages: carImages,
      registeredCar: registeredCar,
      placeLoginTime: placeLoginTime,
      printOption: printOptions[printOptionIndex ?? 0]
    );
  }

  Future<void> uploadViolationToServer({ required Place place, required String placeLoginTime }) async{
    SavedViolation savedViolation = SavedViolation(
      id: 0,
      plateInfo: plateInfo,
      rules: rules,
      ticketComment: ticketComment,
      systemComment: systemComment,
      place: place,
      carImages: carImages,
      isCarRegistered: isCarRegistered,
      createdAt: DateHelper.getCurrentDateTime(),
      printOption: printOptions[printOptionIndex ?? 0],
      placeLoginTime: placeLoginTime,
      registeredCar: registeredCar
    );

    await _savedViolationRepository.uploadViolationToServer(savedViolation, ticketPreview!).then((value) async{
      await deleteViolation();
      await clearAll();
    });

    // await _savedViolationRepository.uploadViolationToServer(savedViolation, TicketPreview(
    //   ticketLink: 'http://localhost:3000/public/tickets/ticket.png',
    //   qrcodeLink: 'http://localhost:5174?auto_login=true&plate_number=CV89558&ticket_number=12345678',
    //   barcodeLink: 'http://localhost:3000/public/barcodes/barcode.png',
    //   ticketNumber: '12345678',
    //   serialNumber: '12345678',
    //   kidNumber: '12345678',
    // )).then((value) async{
    //   await deleteViolation();
    //   await clearAll();
    // });
  }

  Future<void> getTicketPreview({ required Place place, required String placeLoginTime }) async{
    try{
      SavedViolation savedViolation = SavedViolation(
      id: 0,
      plateInfo: plateInfo,
      rules: rules,
      ticketComment: ticketComment,
      systemComment: systemComment,
      place: place,
      carImages: carImages,
      isCarRegistered: isCarRegistered,
      createdAt: DateHelper.getCurrentDateTime(),
      printOption: printOptions[printOptionIndex ?? 0],
      placeLoginTime: placeLoginTime,
      registeredCar: registeredCar
    );

    ticketPreview =  await _savedViolationRepository.getTicketPreview(
      savedViolation
    );
    }catch(error){
      perror(error.toString());
      rethrow;
    }
  }

  Future<void> deleteViolation() async{
    if(ticketMode == TicketMode.editing) {
      await _savedViolationRepository.deleteViolation(violationId: currentUpdatingViolation!.id);

      currentUpdatingViolation = null;
      notifyListeners();
    }
  }


  // --------------------------------- Timer --------------------------------------------------------

  DateTime? siteLoginTime;

  Timer? printTimer;
  int maxTimePolicy = 0;
  String timePassed = "";
  bool isTimerActive = false;

  setSiteLoginTime(DateTime? date) {
    siteLoginTime = date;
    notifyListeners();
  }

  createPrintTimer() {
    if (rules.isEmpty || isTimerActive) {
      return;
    }
    isTimerActive = true;
    maxTimePolicy = rules.first.policyTime;
    notifyListeners();

    printTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      // DateTime parsedCreatedAt = DateTime.parse(violation.createdAt);
      DateTime parsedCreatedAt = siteLoginTime ?? DateTime.now();

      if (DateTime.now().difference(parsedCreatedAt).inMinutes < maxTimePolicy) {
        timePassed = DateFormat('mm:ss', 'no_NO')
            .format(DateTime.fromMillisecondsSinceEpoch(DateTime.now().difference(parsedCreatedAt).inMilliseconds));
        notifyListeners();
      } else {
        cancelPrintTimer();
      }
    });
  }

  updateTimePolicy() {
    if (rules.isEmpty) {
      return;
    }

    Rule rule = rules.first;

    if (rule.policyTime == 0) {
      return;
    }

    maxTimePolicy = rule.policyTime;
    if (printTimer == null || !(printTimer?.isActive ?? false)) {
      createPrintTimer();
    }

    notifyListeners();
  }

  cancelPrintTimer() {
    isTimerActive = false;
    timePassed = "";
    maxTimePolicy = 0;
    printTimer?.cancel();
    printTimer = null;

    // siteLoginTime = null;
    notifyListeners();
  }

  clearAll() {
    plateInfo = PlateInfo.unknown('');
    isCarRegistered = false;
    registeredCar = null;
    carImages = [];
    ticketComment = '';
    systemComment = '';
    plateInfo.plateNumber = '';
    rules = [];
    ticketPreview = null;
    cancelPrintTimer();
    notifyListeners();
  }

  @override
  dispose() {
    cancelPrintTimer();
    clearAll();
    super.dispose();
  }
}
