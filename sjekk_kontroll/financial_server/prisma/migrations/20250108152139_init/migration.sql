-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payment_method" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'idle';
