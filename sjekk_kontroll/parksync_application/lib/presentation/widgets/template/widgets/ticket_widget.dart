import 'package:flutter/material.dart';

class KontrollsanksjonWidget extends StatelessWidget {
  final String orgNumber;
  final String parksyncImagePath;
  final String barcodeImagePath;
  final String ticketNumber;
  final String paperComment;
  final String placeLoginTime;
  final String toDate;
  final String printOption;
  final String pnid;
  final List<Rule> rules;
  final CarInfo carInfo;
  final String location;
  final TicketInfo ticketInfo;
  final String qrcodeImagePath;

  const KontrollsanksjonWidget({
    Key? key,
    required this.orgNumber,
    required this.parksyncImagePath,
    required this.barcodeImagePath,
    required this.ticketNumber,
    required this.paperComment,
    required this.placeLoginTime,
    required this.toDate,
    required this.printOption,
    required this.pnid,
    required this.rules,
    required this.carInfo,
    required this.location,
    required this.ticketInfo,
    required this.qrcodeImagePath,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF9F9F9),
      body: Center(
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Color(0xFFF2D35C),
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                offset: Offset(0, 4),
                blurRadius: 8,
              ),
            ],
            border: Border.all(color: Colors.black, width: 2),
          ),
          child: ListView(
            children: [
              _buildHeader(),
              SizedBox(height: 20),
              _buildTitle("Kontrollsanksjon"),
              SizedBox(height: 20),
              _buildSection("Sanksjonsnummer:", ticketNumber),
              _buildInfoSection("Notat", Text(paperComment)),
              _buildInfoSection("Info", _buildInfoContent()),
              _buildInfoSection("Overtredelse", _buildRulesContent()),
              _buildInfoSection("Kjøretøy", _buildCarInfoContent()),
              _buildInfoSection("Sted", Text(location)),
              _buildInfoSection("Billettinformasjon", _buildTicketInfoContent()),
              _buildInfoSection("Hjemmel for håndheving", Text("Kontrollsanksjoner er utstedt med hjemmel i parkeringsforskriften (p.forskr.) § 36 for parkering i strid med skilt eller forskriftsbestemmelse slik angitt overtredelsessak(e).")),
              _buildInfoSection("Betalingsansvar", Text("Betalingsfristen er 3 uker fra datoen sanksjonen ble utstedt. Både eieren og føreren av kjøretøyet er felles ansvarlige for å betale kontrollsanksjonen, i henhold til Forskrift om vilkårsparkering av 18. mars 2016 nr. 260 § 37. Inndrivelse vil bli gjennomført i samsvar med inkassoloven og lov om tvangsfullbyrdelse.")),
              _buildInfoSection("Klage", Text("Klagefristen er 3 uker fra datoen sanksjonen ble utstedt. Både eieren og føreren, eller en person med fullmakt fra disse, har rett til å klage på sanksjonen, i henhold til parkeringsforskriften § 44. Klagen må være begrunnet og inneholde navn, adresse, sanksjonsnummer, og registreringsnummer på kjøretøyet.")),
              _buildInfoSection("Mer informasjon", Text("For mer informasjon om sanksjonen og for å registrere en klage elektronisk, besøk www.parksync.no eller bruk QR-koden nederst. Vakt telefon 21 45 64 56")),
              _buildFooter(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Image.asset(parksyncImagePath, width: double.infinity),
        Image.asset(barcodeImagePath, width: double.infinity),
        Text("Org. nr: $orgNumber", style: TextStyle(fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildTitle(String title) {
    return Center(
      child: Text(
        title,
        style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildSection(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("$title $content", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildInfoSection(String title, Widget content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 5),
        content,
      ],
    );
  }

  Widget _buildInfoContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Fra: $placeLoginTime", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Til: $toDate", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Levert: $printOption", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Betijent: $pnid", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildRulesContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: rules.map((rule) {
        return Text("${rule.name} (${rule.charge} Kr)", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold));
      }).toList(),
    );
  }

  Widget _buildCarInfoContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Land: ${carInfo.countryName} - ${carInfo.countryCode}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Merke: ${carInfo.carModel}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Skilt: ${carInfo.plateNumber}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Type: ${carInfo.carType}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Farge: ${carInfo.carColor}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildTicketInfoContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Total: ${ticketInfo.totalCharge} Kr", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Betales til: Parksync AS", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Konto: ${ticketInfo.accountNumber}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("KID: ${ticketInfo.kidNumber}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("Dato: ${ticketInfo.paymentDate}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("IBAN: ${ticketInfo.ibanNumber}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        Text("SWIFT: ${ticketInfo.swiftCode}", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
      ],
    );
  }

  Widget _buildFooter() {
    return Column(
      children: [
        Text("Parksync AS, Jacobine Ryes vei, 0987 Oslo", style: TextStyle(fontWeight: FontWeight.bold)),
        SizedBox(height: 10),
        Image.asset(qrcodeImagePath, height: 340, width: 340),
      ],
    );
  }
}

class Rule {
  final String name;
  final int charge;

  Rule({required this.name, required this.charge});
}

class CarInfo {
  final String countryName;
  final String countryCode;
  final String carModel;
  final String plateNumber;
  final String carType;
  final String carColor;

  CarInfo({
    required this.countryName,
    required this.countryCode,
    required this.carModel,
    required this.plateNumber,
    required this.carType,
    required this.carColor,
  });
}

class TicketInfo {
  final int totalCharge;
  final String accountNumber;
  final String kidNumber;
  final String paymentDate;
  final String ibanNumber;
  final String swiftCode;

  TicketInfo({
    required this.totalCharge,
    required this.accountNumber,
    required this.kidNumber,
    required this.paymentDate,
    required this.ibanNumber,
    required this.swiftCode,
  });
}
