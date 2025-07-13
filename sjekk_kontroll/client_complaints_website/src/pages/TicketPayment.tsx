import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../hooks/hooks';
import { ArrowLeft, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const TicketPayment: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  

  const { ticket: selectedTicket } = useAppSelector(
    state => state.client_auth
  )


  const { payment } = useAppSelector(state => state.payment_feature)


  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error('Stripe not loaded');
      return;
    }

    setIsLoading(true);

    try {

      
      await elements.submit();
      const paymentResult = await stripe.confirmPayment({
        elements,
        clientSecret: payment.payment_intent_client_secret,
        confirmParams: {
          return_url: 'https://client.gensolv.no/?callback=true', // Ensure this is a valid URL
          payment_method_data: {
            billing_details: {
              name: name,
              email: email,
            },
          }
        },
      });

      if (paymentResult.error) {
        console.error('An error occurred during payment:', paymentResult.error);
        setErrorMessage(paymentResult.error.message || 'An error occurred during payment.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
<header className="w-full max-w-4xl mx-auto mb-4">
        <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('return_back')}
          </button>
          <img src={'/assets/parksync.png'} alt="Logo" className="w-32 h-auto" />
        </div>
      </header>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="">
          <div className=" bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 ">
          <div className='flex justify-center mb-4'>
          </div>

            <h2 className="text-4xl font-bold mb-4">Ticket Payment</h2>
            <p className="text-2xl mb-2">Ticket #{selectedTicket.ticket_info.ticket_number}</p>
            <p className="text-lg opacity-75">Issued on {selectedTicket.created_at}</p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Total Amount Due</h3>
              <p className="text-4xl font-bold">{selectedTicket.rules[0].charge} NOK</p>
            </div>

          </div>
          <div className="p-4">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Violation Details</h3>
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p className="font-bold">Law Rule</p>
                <p>{selectedTicket.rules[0].name} - ( {selectedTicket.rules[0].charge} NOK )</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p>{selectedTicket.place.location}</p>
                  <p className="text-sm text-gray-600">{selectedTicket.place.policy}</p>
                </div>
                <hr />
                <div>
                  <h4 className="font-semibold mb-2">Vehicle Information</h4>
                  <p>{selectedTicket.plate_info.car_model} ({selectedTicket.plate_info.manufacture_year})</p>
                  <p>{selectedTicket.plate_info.plate_number} - {selectedTicket.plate_info.car_color}</p>
                </div>
                <hr />
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Evidence</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedTicket.images.map((image, index) => (
                  <img key={index} src={image.path} alt={`Violation evidence ${index + 1}`} className="w-full h-auto rounded-md shadow" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Payment with card</h3>
              
              <div className="mb-6">

                <div className="mt-4">
                  <div className="mb-6">
                    <div>
                      <div className='border mb-2 p-3 rounded'>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Cardholder Name"
                          className="p-2.5 outline-none border rounded-md w-full shadow-sm mb-2"
                        />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          placeholder="Your Email"
                          className="p-2.5 outline-none border rounded-md w-full shadow-sm"
                        />
                      </div>

                      <PaymentElement
                        options={{
                           wallets: {
                            googlePay: 'auto',
                            applePay: 'auto'
                           },
                        }}

                        
                        className="p-4 border rounded-md"
                      />
                      <button
                        onClick={() => setShowAgreement(true)}
                        disabled={isLoading}
                        className="w-full mt-2 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader className='text-white animate-spin w-4 h-4' /> : `Complete payment - ${selectedTicket.rules[0].charge} NOK`}
                      </button>
                    </div>
                    


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAgreement && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 shadow"
              variants={modalVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">Payment Agreement</h3>
              <div className="mb-4 h-48 overflow-y-auto border p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  By proceeding with this payment, you acknowledge that you are responsible for the parking violation as described.
                  The payment of this fine does not constitute an admission of guilt but settles the matter with the relevant authorities.
                  You understand that this payment is non-refundable and that failure to pay may result in additional penalties or legal action.
                </p>
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-800 mb-4">
                <a href="/full-policy" target="_blank" rel="noopener noreferrer">know more</a>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAgreement(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAgreement(false);
                    handlePayment();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Accept & Pay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 shadow"
              variants={modalVariants}
            >
              <h3 className="text-2xl font-semibold mb-4 text-red-600">Payment Error</h3>
              <p className="text-gray-700 mb-4">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6 shadow"
              variants={modalVariants}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-green-600">Payment Successful!</h3>
                <p className="text-gray-700 mb-4">Your ticket has been closed successfully.</p>
                <p className="text-lg font-medium text-green-600 mb-6">"Drive with peace of mind, park with responsibility."</p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketPayment;

