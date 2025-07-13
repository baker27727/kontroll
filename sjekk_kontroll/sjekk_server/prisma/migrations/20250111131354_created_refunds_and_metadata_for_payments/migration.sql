/*
  Warnings:

  - You are about to drop the column `payment_id` on the `CardHolderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paid_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_link` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_metadata_id]` on the table `CardHolderDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `charge_id` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kid_number` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_intent_id` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refund_amount` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('info', 'warning', 'error', 'critical');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('nok', 'usd');

-- DropForeignKey
ALTER TABLE "CardHolderDetails" DROP CONSTRAINT "CardHolderDetails_payment_id_fkey";

-- DropIndex
DROP INDEX "CardHolderDetails_payment_id_key";

-- AlterTable
ALTER TABLE "CardHolderDetails" DROP COLUMN "payment_id",
ADD COLUMN     "payment_metadata_id" INTEGER;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
DROP COLUMN "paid_at",
DROP COLUMN "payment_method",
DROP COLUMN "receipt_link",
DROP COLUMN "transaction_id";

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "charge_id" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "kid_number" TEXT NOT NULL,
ADD COLUMN     "payment_intent_id" TEXT NOT NULL,
ADD COLUMN     "refund_amount" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "PaymentLogs" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "level" "LogLevel" NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "PaymentLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMetadata" (
    "id" SERIAL NOT NULL,
    "charge_id" TEXT NOT NULL,
    "payment_id" INTEGER,
    "receipt_link" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'nok',
    "payment_method" "PaymentMethod",
    "paid_at" TEXT,

    CONSTRAINT "PaymentMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMetadata_payment_id_key" ON "PaymentMetadata"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "CardHolderDetails_payment_metadata_id_key" ON "CardHolderDetails"("payment_metadata_id");

-- AddForeignKey
ALTER TABLE "CardHolderDetails" ADD CONSTRAINT "CardHolderDetails_payment_metadata_id_fkey" FOREIGN KEY ("payment_metadata_id") REFERENCES "PaymentMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMetadata" ADD CONSTRAINT "PaymentMetadata_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
