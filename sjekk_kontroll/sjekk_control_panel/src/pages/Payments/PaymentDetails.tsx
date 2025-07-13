import { useEffect } from 'react';
import { getPayment, PaymentStatus } from '../../redux/features/payment-dashboard-reducer';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toast } from 'react-toastify';
import DisabledWrapper from './DisabledWrapper';

const PaymentDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { current_payment: payment, is_current_payment_loading: loading } = useAppSelector((state) => state.payment_dashboard_reducer);

  useEffect(() => {
    dispatch(
        getPayment(Number(id))
    )
  }, [dispatch, id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!payment) {
    return <div className="flex justify-center items-center h-screen">Payment not found</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.completed:
        return 'bg-green-500';
      case PaymentStatus.refunded:
        return 'bg-yellow-500';
      case PaymentStatus.canceled:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleRefund = () => {
    toast.error('Refund not implemented yet');
  };

  const handleSendReminder = () => {
    toast.error('Send reminder not implemented yet');
  };

  const handleResendReceipt = () => {
    toast.error('Resend receipt not implemented yet');
  };

    // Dummy data for new sections
    const dummyRefund = {
      amount: 50.00,
      date: '2023-07-16T14:30:00',
      reason: 'Customer request',
    };
  
    const dummyComplaint = {
      id: 'COMP-001',
      status: 'Under Review',
      filedDate: '2023-07-17T09:00:00',
      description: 'Customer disputes the violation and claims signage was unclear.',
    };

  

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex space-x-2 justify-end">
            <button
              onClick={handleRefund}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded hover:bg-yellow-600 transition-colors duration-300"
            >
              Refund
            </button>


            <DisabledWrapper>
            <button
                  onClick={handleSendReminder}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Send Reminder
                </button>
            </DisabledWrapper>
                <button
                  onClick={handleResendReceipt}
                  className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Resend Receipt
                </button>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Payment ID:</span>
              <span>{payment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">KID Number:</span>
              <span>{payment.kid_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Amount:</span>
              <span>${payment.required_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Payment Method:</span>
              <span className="capitalize">{payment.metadata?.payment_method?.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(payment.status)}`}>
                {payment.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Initiated:</span>
              <span>{payment.init_date}</span>
            </div>
            {payment.metadata?.paid_at && (
              <div className="flex justify-between">
                <span className="font-semibold">Paid At:</span>
                <span>{payment.metadata?.paid_at}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Card Holder Details</h2>
          {payment.metadata?.card_holder_details ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{payment.metadata?.card_holder_details.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Card Number:</span>
                <span>{payment.metadata?.card_holder_details.card_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{payment.metadata?.card_holder_details.email}</span>
              </div>

              <div className="overflow-x-clip">
                <p className="font-semibold">Receipt Link:</p>
                <a href={payment.metadata?.receipt_link} className="text-blue-500 hover:underline truncate text-wrap break-words" target="_blank" rel="noopener noreferrer">
                  {payment.metadata?.receipt_link}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">No card holder details available</div>
          )}
        </div>

        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Violation Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Violation ID:</span>
              <span>{payment.violation_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Plate Number:</span>
              <span>{payment.plate_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Control Number:</span>
              <span>{payment.control_number}</span>
            </div>
            {payment.sanction ? (
              <>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold">Location:</span>
                  <span>{payment.sanction.place.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Policy:</span>
                  <span>{payment.sanction.place.policy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ticket Comment:</span>
                  <span>{payment.sanction.ticket_comment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Created At:</span>
                  <span>{payment.sanction?.created_at}</span>
                </div>
              </>
            ) : (
              <div className="text-gray-500 italic mt-2">No sanction details available</div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
          {payment.sanction ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Car Model:</span>
                <span>{payment.sanction.plate_info.car_model}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Manufacture Year:</span>
                <span>{payment.sanction.plate_info.manufacture_year}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Car Type:</span>
                <span>{payment.sanction.plate_info.car_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Car Color:</span>
                <span>{payment.sanction.plate_info.car_color}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Country:</span>
                <span>{payment.sanction.plate_info.country_name}</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">No vehicle information available</div>
          )}
        </div>

        
      <div className=" bg-white shadow-sm rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Registered Car Information</h2>
        {payment.sanction && payment.sanction.registered_car_info ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Plate Number:</span>
              <span>{payment.sanction.registered_car_info.plate_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Car Brand:</span>
              <span>{payment.sanction.registered_car_info.car_brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Car Model:</span>
              <span>{payment.sanction.registered_car_info.car_model}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Manufacture Year:</span>
              <span>{payment.sanction.registered_car_info.manufacture_year}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Car Color:</span>
              <span>{payment.sanction.registered_car_info.car_color}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Country:</span>
              <span>{payment.sanction.registered_car_info.country_name}</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic">No registered car information available</div>
        )}
      </div>

      {/* <DisabledWrapper>
      <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Payment Logs</h2>
          <ul className="space-y-2">
            {dummyPaymentLogs.map((log, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-semibold">{formatDate(log.timestamp)}</p>
                <p>{log.action}</p>
                <p className="text-sm text-gray-500">{log.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </DisabledWrapper> */}

        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Employee Name</span>
              <Link to={`/employees/${payment.sanction.created_by?.id}`} className="text-blue-500 hover:underline">
                {payment.sanction.created_by?.name}
              </Link>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">PNID</span>
              <span>{payment.sanction.created_by.pnid}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Session</span>
              <span>ssn_17_54544464</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shift</span>
              <span>Day</span>
            </div>
          </div>
        </div>

        {/* New section: Refund Information */}
        <DisabledWrapper>
        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Refund Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Refund Amount:</span>
              <span>${dummyRefund.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Refund Date:</span>
              <span>{formatDate(dummyRefund.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Reason:</span>
              <span>{dummyRefund.reason}</span>
            </div>
          </div>
        </div>
        </DisabledWrapper>

        {/* New section: Complaint Information */}
        <DisabledWrapper>
        <div className="bg-white shadow-sm rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Complaint Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Complaint ID:</span>
              <span>{dummyComplaint.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span>{dummyComplaint.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Filed Date:</span>
              <span>{formatDate(dummyComplaint.filedDate)}</span>
            </div>
            <p className="font-semibold mt-2">Description:</p>
            <p className="text-sm">{dummyComplaint.description}</p>
          </div>
        </div>
        </DisabledWrapper>
      
      </div>
{/* New section: Payment Logs */}


      <div className="mt-6 bg-white shadow-sm rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Violation Images</h2>
        {payment.sanction && payment.sanction.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {payment.sanction.images.map((image, index) => (
              <div key={index} className="relative h-48">
                <img
                  src={image.path}
                  alt={`Violation image ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                  {image.date}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic">No violation images available</div>
        )}
      </div>


    </div>
  );
};

export default PaymentDetails;

