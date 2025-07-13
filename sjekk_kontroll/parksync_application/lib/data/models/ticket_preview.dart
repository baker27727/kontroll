class TicketPreview {
  final String ticketLink;
  final String qrcodeLink;
  final String barcodeLink;
  final String ticketNumber;
  final String serialNumber;
  final String kidNumber;

  TicketPreview({
    required this.ticketLink,
    required this.qrcodeLink,
    required this.barcodeLink,
    required this.ticketNumber,
    required this.serialNumber,
    required this.kidNumber
  });

  factory TicketPreview.fromJson(Map<String, dynamic> json) {
    return TicketPreview(
      ticketLink: json['ticket_link'],
      qrcodeLink: json['qrcode_link'],
      barcodeLink: json['barcode_link'],
      ticketNumber: json['ticket_number'],
      serialNumber: json['serial_number'],
      kidNumber: json['kid_number']
    );
  }

}