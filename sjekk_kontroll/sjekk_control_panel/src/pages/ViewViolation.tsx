import React, { useEffect } from 'react';
import { ChevronRight, Calendar, Car, MapPin, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Image } from 'antd';
import { TbCurrencyKroneSwedish } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { getViolation } from '../redux/features/ViolationSlice';

const ViewViolationPage: React.FC = () => {
  const {currentViolation: violation, loading} = useAppSelector(state => state.ViolationReducer);

  const { id } = useParams();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getViolation(+id!))
  }, [dispatch, id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-2/3">
            <div className="bg-white rounded border shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Violation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<ChevronRight />} label="Ticket ID" value={violation?.ticket_info?.ticket_number} />
                <InfoItem icon={<Calendar />} label="Date" value={violation?.created_at} />
                <InfoItem icon={<TbCurrencyKroneSwedish size={20} />} label="Fine Amount" value={violation?.rules[0].charge.toString()} />
                <InfoItem icon={<User />} label="Officer ID" value={violation?.created_by.pnid} />
              </div>
            </div>

            <div className="bg-white rounded border shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Vehicle Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<Car />} label="License Plate" value={violation?.plate_info.plate_number} />
                <InfoItem icon={<Car />} label="Make & Model" value={violation?.plate_info.car_model} />
                <InfoItem icon={<MapPin />} label="Country" value={`${violation?.plate_info.country_name} (${violation?.plate_info.country_code})`} />
                <InfoItem icon={<Car />} label="Vehicle Type" value={violation?.plate_info.car_type} />
              </div>
            </div>

            <div className="bg-white rounded border shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Violation Rules</h2>
              {violation?.rules.map((rule, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="text font-medium text-gray-800">{rule.name}</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.entries(rule?.extras ?? {}).map(([key, value]) => (
                      <p key={key} className="capitalize">{key.replace('_', ' ')}: {value}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded border shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Location</h2>
              <InfoItem icon={<MapPin />} label="Location Code" value={violation?.place.code} />
              <p className="mt-2 text-gray-600">{violation?.place.location}</p>
            </div>

            <div className="bg-white rounded border shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Evidence Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {violation?.images.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image src={image.path} alt={`Violation evidence ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded border shadow p-4">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Comments</h2>
              <div className="bg-slate-200 rounded p-4 mb-4">
                  <p className="text-sm text-slate-600">{violation?.system_comment}</p>
                </div>
                <div className="bg-slate-200 rounded p-4">
                  <p className="text-sm text-slate-600">{violation?.ticket_comment}</p>
                </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded border shadow p-4 sticky top-0">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Ticket Image</h2>
              <img src={violation?.ticket_info?.ticket_image} alt="Ticket" className="w-full rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default ViewViolationPage;