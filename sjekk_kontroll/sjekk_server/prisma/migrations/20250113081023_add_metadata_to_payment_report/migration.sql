/*
  Warnings:

  - Added the required column `end_date` to the `PaymentReportMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `PaymentReportMetadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statistics` to the `PaymentReportMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentReportMetadata" ADD COLUMN     "end_date" TEXT NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL,
ADD COLUMN     "statistics" JSONB NOT NULL;
