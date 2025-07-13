class PrinterStatus {
  final bool isOffline;
  final bool isCoverOpen;
  final bool isReceiptPaperEmpty;
  final bool isReceiptPaperNearEmpty;
  final bool hasError;

  const PrinterStatus({
    required this.isOffline,
    required this.isCoverOpen,
    required this.isReceiptPaperEmpty,
    required this.isReceiptPaperNearEmpty,
    required this.hasError,
  });

  factory PrinterStatus.fromJson(Map<String, dynamic> json) {
    return PrinterStatus(
      isOffline: json['is_offline'],
      isCoverOpen: json['is_cover_open'],
      isReceiptPaperEmpty: json['is_receipt_paper_empty'],
      isReceiptPaperNearEmpty: json['is_receipt_paper_near_empty'],
      hasError: json['has_error'],
    );
  }
}