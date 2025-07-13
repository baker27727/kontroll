import 'package:parksync_application/core/helpers/sqflite_helper.dart';
import 'package:parksync_application/data/models/printer/printer_model.dart';
import 'package:parksync_application/domain/repositories/printer_repository.dart';

class PrinterRepository implements IPrinterRepository {
  @override
  Future<Printer> createPrinter({ required String address, required String name }) async {
    try {
      int id = await DatabaseHelper.instance.insertData('printers', {
        'name': name,
        'address': address
      });
      return await getPrinter(id);
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<bool> deletePrinter(int id) async {
    try {
      return await DatabaseHelper.instance.removeDataById('printers', id) > 0;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<List<Printer>> getAllPrinters() async {
    try {
      List data = await DatabaseHelper.instance.getAllData('printers');
      List<Printer> printers = data.map((e) {
        return Printer.fromJson(e);
      }).toList();

      return printers;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<Printer> getPrinter(int id) async {
    try {
      Map data = await DatabaseHelper.instance.getPrinter('printers', id);
      Printer printer = Printer.fromJson(data);
      return printer;
    } catch (error) {
      rethrow;
    }
  }

  @override
  Future<bool> updatePrinter(int id, Map<String, dynamic> data) async {
    try {
      return await DatabaseHelper.instance.updateData('printers', id, data) > 0;
    } catch (error) {
      rethrow;
    }
  }
}
