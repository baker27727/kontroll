/*
  Warnings:

  - You are about to drop the column `init_date` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `kid_number` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `required_amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `violation_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `CardHolderDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Refund` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kid_number]` on the table `Sanction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `charged_at` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid_amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `paid_at` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CardHolderDetails" DROP CONSTRAINT "CardHolderDetails_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_payment_id_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "init_date",
DROP COLUMN "kid_number",
DROP COLUMN "payment_method",
DROP COLUMN "required_amount",
DROP COLUMN "status",
DROP COLUMN "transaction_id",
DROP COLUMN "violation_id",
ADD COLUMN     "charged_at" TEXT NOT NULL,
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "paid_amount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "paid_at" SET NOT NULL;

-- DropTable
DROP TABLE "CardHolderDetails";

-- DropTable
DROP TABLE "Refund";

-- DropEnum
DROP TYPE "FileType";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Sanction_kid_number_key" ON "Sanction"("kid_number");
