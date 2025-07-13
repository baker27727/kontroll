/*
  Warnings:

  - Added the required column `stripe_refund_id` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "stripe_refund_id" TEXT NOT NULL;
