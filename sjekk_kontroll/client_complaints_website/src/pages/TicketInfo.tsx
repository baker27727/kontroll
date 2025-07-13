import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ViolationPropertyInterface from "../interfaces/ViolationPropertyInterface";
import { ArrowLeft, Ticket, Scale, FileText, Car, MapPin } from 'lucide-react';
import LogoImage from '/public/parksync.png';

const TicketInfo: React.FC = () => {
  const ticketState = useAppSelector((state) => state.client_auth);
  const { loading, ticket, error } = ticketState;
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{t("error")}: {error}</div>;
  }

  if (!ticket) {
    return <div className="text-gray-500 p-4">{t("no_ticket_data")}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <header className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t("return_back")}
        </button>
        <img src={LogoImage} alt="ParkSync Logo" className="w-32 h-auto" />
      </header>

      <main className="space-y-4">
        <ViolationMainData violation={ticket} />
        <ViolationRegisteredRules violation={ticket} />
        <ViolationComments violation={ticket} />
        <CarPlateInfo violation={ticket} />
        <ViolationPlaceInfo violation={ticket} />
      </main>
    </div>
  );
};

const InfoBlock: React.FC<{ titleText: string; blockValue: string; width?: string }> = ({ 
  titleText, 
  blockValue, 
  width = "w-32" 
}) => (
  <div className="flex items-center mb-2">
    <div className={`text-blue-600 font-semibold ${width}`}>{titleText}</div>
    <span className="text-gray-700">{blockValue}</span>
  </div>
);

const SectionHeader: React.FC<{ title: string; Icon: React.ElementType }> = ({ title, Icon }) => (
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-xl font-bold text-blue-600">{title}</h3>
    <Icon className="w-6 h-6 text-blue-500" />
  </div>
);

const ViolationMainData: React.FC<ViolationPropertyInterface> = ({ violation }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white shadow-sm rounded-lg p-4">
      <SectionHeader title={t("ticket_data")} Icon={Ticket} />
      <div className="border-t border-gray-200 pt-4">
        <InfoBlock titleText={t("ticket_id")} blockValue={violation.ticket_info.ticket_number ?? "N/A"} />
        <InfoBlock titleText={t("KID")} blockValue="00666465466" />
        <InfoBlock titleText={t("from")} blockValue={violation.created_at} />
        <InfoBlock titleText={t("to")} blockValue={violation.created_at ?? "N/A"} />
        <InfoBlock titleText={t("total")} blockValue={`${violation.rules.reduce((acc, rule) => acc + rule.charge, 0)} Kr`} />
        <InfoBlock titleText={t("paid_at")} blockValue={violation.ticket_info.payment_date ?? "N/A"} />
        <InfoBlock titleText={t("delivery")} blockValue={violation.ticket_info.print_option ?? "N/A"} />
        <InfoBlock titleText={t("PSID")} blockValue={violation.created_by.pnid ?? "N/A"} />
      </div>
    </section>
  );
};

const ViolationRegisteredRules: React.FC<ViolationPropertyInterface> = ({ violation }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white shadow-sm rounded-lg p-4">
      <SectionHeader title={t("rules")} Icon={Scale} />
      <div className="border-t border-gray-200 pt-4">
        {violation.rules.map((rule, index) => (
          <div key={index} className="mb-4">
            <InfoBlock titleText={rule.name} blockValue={`${rule.charge} Kr.`} />
            {rule.extras.meter_receipt_number && (
              <InfoBlock titleText="Meter Receipt Number" blockValue={rule.extras_values.meter_receipt_number ?? 'N/A'} width="w-48" />
            )}
            {rule.extras.meter_number && (
              <InfoBlock titleText="Meter Number" blockValue={rule.extras_values.meter_number ?? 'N/A'} width="w-48" />
            )}
            {rule.extras.expiry_date && (
              <InfoBlock titleText="Expiry Date" blockValue={rule.extras_values.expiry_date ?? 'N/A'} width="w-48" />
            )}
            {rule.extras.paid_amount && (
              <InfoBlock titleText="Paid Amount" blockValue={rule.extras_values.paid_amount ?? 'N/A'} width="w-48" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ViolationComments: React.FC<ViolationPropertyInterface> = ({ violation }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white shadow-sm rounded-lg p-4">
      <SectionHeader title={t("Notes")} Icon={FileText} />
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-700">
          {(!violation.ticket_comment || violation.ticket_comment.length === 0) ? 'No Notes' : violation.ticket_comment}
        </p>
      </div>
    </section>
  );
};

const CarPlateInfo: React.FC<ViolationPropertyInterface> = ({ violation }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white shadow-sm rounded-lg p-4">
      <SectionHeader title={t("Car Info")} Icon={Car} />
      <div className="border-t border-gray-200 pt-4">
        <InfoBlock titleText={t("register_number")} blockValue={violation.plate_info.plate_number} />
        <InfoBlock titleText={t("land")} blockValue={`${violation.plate_info.country_name ?? "N/A"} - ${violation.plate_info.country_code ?? "N/A"}`} />
        <InfoBlock titleText={t("brand")} blockValue={violation.plate_info.car_model ?? "N/A"} />
        <InfoBlock titleText={t("color")} blockValue={violation.plate_info.car_color} />
        <InfoBlock titleText={t("type")} blockValue={violation.plate_info.car_type ?? "N/A"} />
      </div>
    </section>
  );
};

const ViolationPlaceInfo: React.FC<ViolationPropertyInterface> = ({ violation }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white shadow-sm rounded-lg p-4">
      <SectionHeader title={t("place_info")} Icon={MapPin} />
      <div className="border-t border-gray-200 pt-4">
        <InfoBlock titleText={violation.place.location} blockValue={violation.place.code} />
      </div>
    </section>
  );
};

export default TicketInfo;

