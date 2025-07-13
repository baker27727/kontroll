-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('pending', 'completed', 'rejected', 'deleted');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('pdf', 'image');

-- CreateEnum
CREATE TYPE "ManagerRole" AS ENUM ('admin', 'superuser');

-- CreateTable
CREATE TABLE "ComplaintAttachments" (
    "id" SERIAL NOT NULL,
    "file_type" "FileType" NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "complaint_id" INTEGER NOT NULL,

    CONSTRAINT "ComplaintAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "complaint_text" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'pending',
    "ticket_number" TEXT NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ManagerRole" NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_username_key" ON "Manager"("username");

-- AddForeignKey
ALTER TABLE "ComplaintAttachments" ADD CONSTRAINT "ComplaintAttachments_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
