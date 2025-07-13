-- AlterTable
ALTER TABLE "CardHolderDetails" ADD COLUMN     "country" TEXT,
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'nok',
ADD COLUMN     "receipt_link" TEXT;
