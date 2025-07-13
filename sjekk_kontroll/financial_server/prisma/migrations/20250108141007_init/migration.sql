/*
  Warnings:

  - You are about to drop the column `charged_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paid_amount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `init_date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kid_number` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required_amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `violation_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('card', 'apple_pay', 'google_pay');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('idle', 'canceled', 'refunded', 'completed');

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "charged_at",
DROP COLUMN "client_name",
DROP COLUMN "paid_amount",
ADD COLUMN     "init_date" TEXT NOT NULL,
ADD COLUMN     "kid_number" TEXT NOT NULL,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "required_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL,
ADD COLUMN     "violation_id" INTEGER NOT NULL,
ALTER COLUMN "paid_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CardHolderDetails" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "payment_id" INTEGER,

    CONSTRAINT "CardHolderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardHolderDetails_payment_id_key" ON "CardHolderDetails"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_payment_id_key" ON "Refund"("payment_id");

-- AddForeignKey
ALTER TABLE "CardHolderDetails" ADD CONSTRAINT "CardHolderDetails_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
