
class Rule {
  final String name;
  final int charge;
  final int id;
  int policyTime;
  final Extras? extras;

  Rule({required this.name, required this.charge, required this.id, this.policyTime = 0, this.extras});

  factory Rule.fromJson(Map data) {
    return Rule(
      name: data['name'],
      charge: data['charge'],
      id: data['id'],
      policyTime: data['policy_time'] ?? 0,
      extras: data['extras'] != null ? Extras.fromJson(data['extras']) : null,
    );
  }

  Map toJson() {
    return {
      'name': name,
      'charge': charge,
      'id': id,
      'policy_time': policyTime,
      'extras': extras?.toJson(),
      'extras_values': extras?.valuesToJson(),
    };
  }

  clone() {
    return Rule.fromJson(toJson());
  }
}

class Extras {
  final bool meterReceiptNumber;
  final bool meterNumber;
  final bool expiryDate;
  final bool paidAmount;

  String? meterReceiptNumberValue;
  String? meterNumberValue;
  String? expiryDateValue;
  String? paidAmountValue;

  Extras(
      {required this.meterReceiptNumber,
      required this.meterNumber,
      required this.expiryDate,
      required this.paidAmount,
      this.expiryDateValue,
      this.paidAmountValue,
      this.meterNumberValue,
      this.meterReceiptNumberValue});

  factory Extras.fromJson(Map data) {
    return Extras(
      meterReceiptNumber: data['meter_receipt_number'] ?? false,
      meterNumber: data['meter_number'] ?? false,
      expiryDate: data['expiry_date'] ?? false,
      paidAmount: data['paid_amount'] ?? false,
    );
  }

  Map valuesToJson() {
    return {
      'meter_receipt_number': meterReceiptNumberValue,
      'meter_number': meterNumberValue,
      'expiry_date': expiryDateValue,
      'paid_amount': paidAmountValue,
    };
  }

  Map toJson() {
    return {
      'meter_receipt_number': meterReceiptNumber,
      'meter_number': meterNumber,
      'expiry_date': expiryDate,
      'paid_amount': paidAmount,
    };
  }
}
