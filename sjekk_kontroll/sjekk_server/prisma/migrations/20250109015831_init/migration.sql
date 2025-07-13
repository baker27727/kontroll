-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('card', 'apple_pay', 'google_pay');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('idle', 'canceled', 'refunded', 'completed');

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

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "violation_id" INTEGER NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "kid_number" TEXT NOT NULL,
    "required_amount" DOUBLE PRECISION NOT NULL,
    "payment_method" "PaymentMethod",
    "status" "PaymentStatus" NOT NULL DEFAULT 'idle',
    "init_date" TEXT NOT NULL,
    "paid_at" TEXT,
    "plate_number" TEXT NOT NULL,
    "control_number" TEXT NOT NULL,
    "sanction_id" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardHolderDetails_payment_id_key" ON "CardHolderDetails"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_payment_id_key" ON "Refund"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_sanction_id_key" ON "Payment"("sanction_id");

-- AddForeignKey
ALTER TABLE "CardHolderDetails" ADD CONSTRAINT "CardHolderDetails_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "Violation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
