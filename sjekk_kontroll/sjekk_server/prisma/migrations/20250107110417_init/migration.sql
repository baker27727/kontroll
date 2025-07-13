-- CreateEnum
CREATE TYPE "RegisterationSource" AS ENUM ('normal_place_dashboard', 'system');

-- CreateEnum
CREATE TYPE "ResidentialRegisterationType" AS ENUM ('reserved', 'guest');

-- CreateEnum
CREATE TYPE "RegisteredCarType" AS ENUM ('normal', 'residential', 'apartment');

-- CreateEnum
CREATE TYPE "SystemCarRegistrationType" AS ENUM ('reserved', 'guest', 'public');

-- CreateEnum
CREATE TYPE "SystemCarType" AS ENUM ('apartment', 'residential');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('normal', 'residential', 'apartment');

-- CreateEnum
CREATE TYPE "PlaceRequestType" AS ENUM ('creation', 'deletion');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('approved', 'rejected');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('apartment', 'residential', 'public_place');

-- CreateEnum
CREATE TYPE "ManagerRole" AS ENUM ('admin', 'superuser');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pnid" TEXT NOT NULL,
    "unique_code" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalCar" (
    "id" SERIAL NOT NULL,
    "registered_car_id" INTEGER NOT NULL,
    "free_parking_hours" INTEGER NOT NULL,
    "registeration_source" "RegisterationSource" NOT NULL,
    "normal_place_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "NormalCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialCar" (
    "id" SERIAL NOT NULL,
    "parking_type" "ResidentialRegisterationType" NOT NULL,
    "subscription_plan_days" INTEGER NOT NULL,
    "registered_car_id" INTEGER NOT NULL,
    "residential_quarter_id" INTEGER NOT NULL,
    "apartment_id" INTEGER,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "ResidentialCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemCar" (
    "id" SERIAL NOT NULL,
    "plate_number" TEXT NOT NULL,
    "last_registered_date" TEXT NOT NULL,
    "registration_type" "SystemCarRegistrationType" NOT NULL,
    "car_type" "SystemCarType" NOT NULL,
    "residential_quarter_id" INTEGER NOT NULL,

    CONSTRAINT "SystemCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredCar" (
    "id" SERIAL NOT NULL,
    "plate_number" TEXT NOT NULL,
    "car_model" TEXT,
    "car_type" TEXT,
    "car_description" TEXT,
    "car_color" TEXT,
    "manufacture_year" TEXT,
    "registration_date" TEXT NOT NULL,
    "expire_date" TEXT NOT NULL,
    "registration_type" "RegisteredCarType" NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "RegisteredCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerDashboard" (
    "id" SERIAL NOT NULL,
    "access_username" TEXT NOT NULL,
    "access_code" TEXT NOT NULL,
    "partner_id" INTEGER NOT NULL,

    CONSTRAINT "PartnerDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,
    "owned_places_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicPlaceNotificationSubscription" (
    "id" SERIAL NOT NULL,
    "public_dashboard_id" INTEGER NOT NULL,
    "push_manager_subscription" VARCHAR(8000),
    "user_agent" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'public_place',
    "channel_member_id" INTEGER NOT NULL,

    CONSTRAINT "PublicPlaceNotificationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalPlaceDashboard" (
    "id" SERIAL NOT NULL,
    "access_username" TEXT NOT NULL,
    "access_code" TEXT NOT NULL,
    "profile_image" TEXT,
    "free_parking_hours" INTEGER NOT NULL,
    "place_name" TEXT NOT NULL,
    "place_type" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,
    "normal_place_id" INTEGER NOT NULL,

    CONSTRAINT "NormalPlaceDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalPlace" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER,
    "location" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "place_type" TEXT NOT NULL,
    "place_id" INTEGER NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "NormalPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialDashboardNotificationSubscription" (
    "id" SERIAL NOT NULL,
    "residential_dashboard_id" INTEGER NOT NULL,
    "push_manager_subscription" VARCHAR(8000),
    "user_agent" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'public_place',
    "channel_member_id" INTEGER NOT NULL,

    CONSTRAINT "ResidentialDashboardNotificationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialDashboard" (
    "id" SERIAL NOT NULL,
    "access_username" TEXT NOT NULL,
    "access_code" TEXT NOT NULL,
    "apartment_registration_qrcode" TEXT,
    "apartment_registration_qrcode_link" TEXT,
    "residential_quarter_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "ResidentialDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidentialQuarter" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "quarter_name" TEXT NOT NULL,
    "max_cars_registrations" INTEGER NOT NULL,
    "current_total_registered_cars" INTEGER NOT NULL DEFAULT 0,
    "guest_free_days" INTEGER,
    "max_cars_by_apartment" INTEGER,
    "created_at" TEXT NOT NULL DEFAULT '',
    "updated_at" TEXT,
    "deleted_at" TEXT,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "ResidentialQuarter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,
    "place_type" "PlaceType" NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extras" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "meter_receipt_number" BOOLEAN NOT NULL DEFAULT false,
    "meter_number" BOOLEAN NOT NULL DEFAULT false,
    "expiry_date" BOOLEAN NOT NULL DEFAULT false,
    "paid_amount" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "charge" DOUBLE PRECISION NOT NULL,
    "policy_time" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceRequest" (
    "id" SERIAL NOT NULL,
    "request_type" "PlaceRequestType" NOT NULL,
    "location" TEXT,
    "policy" TEXT,
    "code" TEXT,
    "place_id" INTEGER,
    "requested_by_id" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT,

    CONSTRAINT "PlaceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceRequestApproval" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "status" "ApprovalStatus" NOT NULL,
    "comments" TEXT,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "PlaceRequestApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlaceLogin" (
    "id" SERIAL NOT NULL,
    "place_name" TEXT NOT NULL,
    "login_time" TEXT NOT NULL,
    "logout_time" TEXT NOT NULL,
    "shift_id" INTEGER NOT NULL,

    CONSTRAINT "UserPlaceLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "pnid" TEXT NOT NULL,
    "total_completed_violations" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViolationImage" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "violation_id" INTEGER NOT NULL,

    CONSTRAINT "ViolationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlateInfo" (
    "id" SERIAL NOT NULL,
    "violation_id" INTEGER NOT NULL,
    "car_model" TEXT,
    "plate_number" TEXT,
    "manufacture_year" TEXT,
    "car_description" TEXT,
    "car_type" TEXT,
    "car_color" TEXT,
    "country_name" TEXT,
    "country_code" TEXT,

    CONSTRAINT "PlateInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketInfo" (
    "id" SERIAL NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "ticket_image" TEXT NOT NULL,
    "print_option" TEXT NOT NULL,
    "payment_date" TEXT,
    "barcode_image" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "violation_id" INTEGER NOT NULL,

    CONSTRAINT "TicketInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViolationExtraValues" (
    "id" SERIAL NOT NULL,
    "violation_rule_id" INTEGER NOT NULL,
    "meter_receipt_number" TEXT,
    "meter_number" TEXT,
    "paid_amount" TEXT,
    "expiry_date" TEXT,

    CONSTRAINT "ViolationExtraValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViolationExtras" (
    "id" SERIAL NOT NULL,
    "violation_rule_id" INTEGER NOT NULL,
    "meter_receipt_number" BOOLEAN NOT NULL DEFAULT false,
    "meter_number" BOOLEAN NOT NULL DEFAULT false,
    "paid_amount" BOOLEAN NOT NULL DEFAULT false,
    "expiry_date" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ViolationExtras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViolationRule" (
    "id" SERIAL NOT NULL,
    "violation_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "charge" DOUBLE PRECISION NOT NULL,
    "policy_time" INTEGER NOT NULL,

    CONSTRAINT "ViolationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Violation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_comment" TEXT NOT NULL,
    "system_comment" TEXT NOT NULL,
    "place_id" INTEGER NOT NULL,
    "total_charge" DOUBLE PRECISION NOT NULL,
    "is_car_registered" BOOLEAN NOT NULL,
    "place_login_time" TEXT NOT NULL,
    "print_option" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "deleted_at" TEXT,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "Violation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sent_at" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarLog" (
    "id" SERIAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "registered_by" TEXT NOT NULL,
    "place_location" TEXT NOT NULL,
    "place_code" TEXT NOT NULL,
    "place_policy" TEXT NOT NULL,
    "car_model" TEXT,
    "car_type" TEXT,
    "car_description" TEXT,
    "car_color" TEXT,
    "manufacture_year" TEXT,
    "plate_number" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "CarLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarLogReport" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "total_parkings" INTEGER NOT NULL,
    "total_parking_time" INTEGER NOT NULL,
    "average_parking_time" DOUBLE PRECISION NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "CarLogReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentNotificationSubscription" (
    "id" SERIAL NOT NULL,
    "aprtment_id" INTEGER NOT NULL,
    "push_manager_subscription" VARCHAR(8000),
    "user_agent" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'apartment',
    "channel_member_id" INTEGER NOT NULL,

    CONSTRAINT "ApartmentNotificationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "owner_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "apartment_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "building_number" TEXT,
    "floor_number" TEXT,
    "created_at" TEXT NOT NULL,
    "residential_quarter_id" INTEGER NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentRequest" (
    "id" SERIAL NOT NULL,
    "owner_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "apartment_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "building_number" TEXT,
    "floor_number" TEXT,
    "created_at" TEXT NOT NULL,
    "residential_quarter_id" INTEGER NOT NULL,

    CONSTRAINT "ApartmentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentLocation" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ApartmentLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemNotificationComponent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "sent_times" INTEGER NOT NULL DEFAULT 0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    CONSTRAINT "SystemNotificationComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "is_clicked" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "channel_member_id" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "role" "ManagerRole" NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pnid_key" ON "User"("pnid");

-- CreateIndex
CREATE UNIQUE INDEX "NormalCar_registered_car_id_key" ON "NormalCar"("registered_car_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialCar_registered_car_id_key" ON "ResidentialCar"("registered_car_id");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerDashboard_access_username_key" ON "PartnerDashboard"("access_username");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerDashboard_partner_id_key" ON "PartnerDashboard"("partner_id");

-- CreateIndex
CREATE UNIQUE INDEX "NormalPlaceDashboard_access_username_key" ON "NormalPlaceDashboard"("access_username");

-- CreateIndex
CREATE UNIQUE INDEX "NormalPlace_place_id_key" ON "NormalPlace"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialDashboard_residential_quarter_id_key" ON "ResidentialDashboard"("residential_quarter_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentialQuarter_place_id_key" ON "ResidentialQuarter"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "Extras_rule_id_key" ON "Extras"("rule_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceRequestApproval_request_id_key" ON "PlaceRequestApproval"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlateInfo_violation_id_key" ON "PlateInfo"("violation_id");

-- CreateIndex
CREATE UNIQUE INDEX "TicketInfo_ticket_number_key" ON "TicketInfo"("ticket_number");

-- CreateIndex
CREATE UNIQUE INDEX "TicketInfo_violation_id_key" ON "TicketInfo"("violation_id");

-- CreateIndex
CREATE UNIQUE INDEX "ViolationExtraValues_violation_rule_id_key" ON "ViolationExtraValues"("violation_rule_id");

-- CreateIndex
CREATE UNIQUE INDEX "ViolationExtras_violation_rule_id_key" ON "ViolationExtras"("violation_rule_id");

-- AddForeignKey
ALTER TABLE "NormalCar" ADD CONSTRAINT "NormalCar_registered_car_id_fkey" FOREIGN KEY ("registered_car_id") REFERENCES "RegisteredCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalCar" ADD CONSTRAINT "NormalCar_normal_place_id_fkey" FOREIGN KEY ("normal_place_id") REFERENCES "NormalPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialCar" ADD CONSTRAINT "ResidentialCar_registered_car_id_fkey" FOREIGN KEY ("registered_car_id") REFERENCES "RegisteredCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialCar" ADD CONSTRAINT "ResidentialCar_residential_quarter_id_fkey" FOREIGN KEY ("residential_quarter_id") REFERENCES "ResidentialQuarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialCar" ADD CONSTRAINT "ResidentialCar_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredCar" ADD CONSTRAINT "RegisteredCar_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerDashboard" ADD CONSTRAINT "PartnerDashboard_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicPlaceNotificationSubscription" ADD CONSTRAINT "PublicPlaceNotificationSubscription_public_dashboard_id_fkey" FOREIGN KEY ("public_dashboard_id") REFERENCES "NormalPlaceDashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalPlaceDashboard" ADD CONSTRAINT "NormalPlaceDashboard_normal_place_id_fkey" FOREIGN KEY ("normal_place_id") REFERENCES "NormalPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalPlace" ADD CONSTRAINT "NormalPlace_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalPlace" ADD CONSTRAINT "NormalPlace_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialDashboardNotificationSubscription" ADD CONSTRAINT "ResidentialDashboardNotificationSubscription_residential_d_fkey" FOREIGN KEY ("residential_dashboard_id") REFERENCES "ResidentialDashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialDashboard" ADD CONSTRAINT "ResidentialDashboard_residential_quarter_id_fkey" FOREIGN KEY ("residential_quarter_id") REFERENCES "ResidentialQuarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidentialQuarter" ADD CONSTRAINT "ResidentialQuarter_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extras" ADD CONSTRAINT "Extras_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceRequest" ADD CONSTRAINT "PlaceRequest_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceRequestApproval" ADD CONSTRAINT "PlaceRequestApproval_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "PlaceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaceLogin" ADD CONSTRAINT "UserPlaceLogin_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViolationImage" ADD CONSTRAINT "ViolationImage_violation_id_fkey" FOREIGN KEY ("violation_id") REFERENCES "Violation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateInfo" ADD CONSTRAINT "PlateInfo_violation_id_fkey" FOREIGN KEY ("violation_id") REFERENCES "Violation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketInfo" ADD CONSTRAINT "TicketInfo_violation_id_fkey" FOREIGN KEY ("violation_id") REFERENCES "Violation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViolationExtraValues" ADD CONSTRAINT "ViolationExtraValues_violation_rule_id_fkey" FOREIGN KEY ("violation_rule_id") REFERENCES "ViolationRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViolationExtras" ADD CONSTRAINT "ViolationExtras_violation_rule_id_fkey" FOREIGN KEY ("violation_rule_id") REFERENCES "ViolationRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViolationRule" ADD CONSTRAINT "ViolationRule_violation_id_fkey" FOREIGN KEY ("violation_id") REFERENCES "Violation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Violation" ADD CONSTRAINT "Violation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Violation" ADD CONSTRAINT "Violation_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentNotificationSubscription" ADD CONSTRAINT "ApartmentNotificationSubscription_aprtment_id_fkey" FOREIGN KEY ("aprtment_id") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_residential_quarter_id_fkey" FOREIGN KEY ("residential_quarter_id") REFERENCES "ResidentialQuarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentRequest" ADD CONSTRAINT "ApartmentRequest_residential_quarter_id_fkey" FOREIGN KEY ("residential_quarter_id") REFERENCES "ResidentialQuarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
