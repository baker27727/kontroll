-- CreateEnum
CREATE TYPE "DebtStatus" AS ENUM ('paid', 'not_paid', 'sent_to_debt_collect');

-- CreateEnum
CREATE TYPE "SanctionFileType" AS ENUM ('image', 'document');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('pdf', 'image');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('collected', 'pending');

-- CreateEnum
CREATE TYPE "ManagerRole" AS ENUM ('admin', 'supervisor', 'reader');

-- CreateTable
CREATE TABLE "SanctionRule" (
    "id" SERIAL NOT NULL,
    "sanction_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "charge" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SanctionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanction" (
    "id" SERIAL NOT NULL,
    "control_number" TEXT NOT NULL,
    "kid_number" TEXT NOT NULL,
    "total_charge" DOUBLE PRECISION NOT NULL,
    "due_date" TEXT NOT NULL,
    "employee_pnid" TEXT NOT NULL,
    "status" "DebtStatus" NOT NULL DEFAULT 'not_paid',
    "deleted_at" TEXT,
    "created_at" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Sanction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanctionFile" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" "SanctionFileType" NOT NULL,
    "file_extension" TEXT NOT NULL,
    "file_size" DOUBLE PRECISION NOT NULL,
    "file_path" TEXT NOT NULL,
    "uploaded_at" TEXT NOT NULL,
    "uploaded_by_id" INTEGER NOT NULL,
    "sanction_id" INTEGER NOT NULL,

    CONSTRAINT "SanctionFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialReport" (
    "id" SERIAL NOT NULL,
    "report_file" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_income" DOUBLE PRECISION NOT NULL,
    "tax_deducted" DOUBLE PRECISION NOT NULL,
    "report_title" TEXT NOT NULL,
    "report_file_size" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "deleted_at" TEXT,

    CONSTRAINT "FinancialReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "charged_at" TEXT NOT NULL,
    "paid_at" TEXT NOT NULL,
    "paid_amount" DOUBLE PRECISION NOT NULL,
    "control_number" TEXT NOT NULL,
    "sanction_id" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "invoice_file" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "sanction_id" INTEGER,
    "deleted_at" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "linked_email" TEXT NOT NULL,
    "role" "ManagerRole" NOT NULL,
    "created_at" TEXT NOT NULL,
    "last_login_time" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Login" (
    "id" SERIAL NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "login_time" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_sanction_id_key" ON "Payment"("sanction_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_sanction_id_key" ON "Invoice"("sanction_id");

-- AddForeignKey
ALTER TABLE "SanctionRule" ADD CONSTRAINT "SanctionRule_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "Sanction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanctionFile" ADD CONSTRAINT "SanctionFile_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanctionFile" ADD CONSTRAINT "SanctionFile_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "Sanction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "Sanction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_sanction_id_fkey" FOREIGN KEY ("sanction_id") REFERENCES "Sanction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
