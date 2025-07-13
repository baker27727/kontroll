import 'package:parksync_application/data/models/printer/printer_model.dart';

abstract class IPrinterRepository {
  Future<Printer> createPrinter({ required String address, required String name });
  Future<List<Printer>> getAllPrinters();
  Future<Printer> getPrinter(int id);
  Future<bool> updatePrinter(int id, Map<String, dynamic> data);
  Future<bool> deletePrinter(int id);
}
