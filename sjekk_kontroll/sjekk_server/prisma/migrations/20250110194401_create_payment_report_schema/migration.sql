-- CreateTable
CREATE TABLE "PaymentReportMetadata" (
    "id" SERIAL NOT NULL,
    "payment_report_id" INTEGER,
    "generated_by" TEXT NOT NULL,

    CONSTRAINT "PaymentReportMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentReport" (
    "id" SERIAL NOT NULL,
    "report_name" TEXT NOT NULL,
    "report_path" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "PaymentReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentReportMetadata_payment_report_id_key" ON "PaymentReportMetadata"("payment_report_id");

-- AddForeignKey
ALTER TABLE "PaymentReportMetadata" ADD CONSTRAINT "PaymentReportMetadata_payment_report_id_fkey" FOREIGN KEY ("payment_report_id") REFERENCES "PaymentReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
