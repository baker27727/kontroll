/*
  Warnings:

  - A unique constraint covering the columns `[kid_number]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_kid_number_key" ON "Payment"("kid_number");
