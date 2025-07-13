/*
  Warnings:

  - You are about to drop the column `payment_intent_client_secret` on the `TicketInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payment_intent_client_secret" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TicketInfo" DROP COLUMN "payment_intent_client_secret";
