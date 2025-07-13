import { useState } from 'react';
import { FaFileAlt, FaFileImage, FaDownload, FaUser, FaCalendarAlt, FaMoneyBillWave, FaReceipt, FaCheck, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { useAppSelector } from '../../../hooks/hooks';
import { baseUrl } from '../../../constants/app_constants';
import Routes from '../../../constants/routes';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

const SanctionDetails = () => {
  const navigate = useNavigate();
  const { selected_sanction } = useAppSelector(state => state.sanction_store);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);


  const [pdfModalOpen,setPdfModalOpen] = useState(false);

  const [pdfUrl, setPdfUrl] = useState('');

  const [t] = useTranslation();

  const navigateToAddAttachment = () => {
    navigate(Routes.ATTACHMENTS);
  };

  if (!selected_sanction) {
    navigate(Routes.SANCTIONS, { replace: true });
  }

  const files = selected_sanction.sanction_files.map(file => ({
    url: `${baseUrl}/${file.file_path}`,
    type: file.file_type,
  }));

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openPdfModal = (url: string) => {
    setPdfUrl(url);
    setPdfModalOpen(true);
  }

  const getPaymentStatus = (status: 'paid' | 'not_paid' | 'sent_to_debt_collect') => {
    const statusComponents = {
      paid: <span className="text-green-500 flex items-center gap-2 justify-center"><FaCheck /> {t('sanctions_block.sanction_details_block.paid')}</span>,
      not_paid: <span className="text-yellow-500 flex items-center gap-2 justify-center"><FaExclamationTriangle /> {t('sanctions_block.sanction_details_block.not_paid')}</span>,
      sent_to_debt_collect: <span className="text-red-500 flex items-center gap-2 justify-center"><FaEnvelope /> {t('sanctions_block.sanction_details_block.sent_to_debt_collect')}</span>
    };

    return statusComponents[status];
  }

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="flex gap-4">
          <div className="flex flex-col flex-grow">
            <section className="bg-white p-4 rounded shadow border mb-4">
              <header className="mb-4">
                <h1 className="text-2xl text-gray-800 flex items-center gap-2">
                  <FaFileAlt className="text-blue-500" /> {t('sanctions_block.sanction_details_block.sanction_details')}
                </h1>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-100 p-2 rounded-sm shadow-sm flex items-center">
                    <FaFileImage className="text-blue-500 text-2xl" />
                    <div className="ml-4">
                      <h3 className="text-xl text-gray-800">{t('sanctions_block.sanction_details_block.case_number')}</h3>
                      <p className="text-lg text-gray-800">{selected_sanction.control_number}</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-sm shadow-sm flex items-center">
                    <FaUser className="text-blue-500 text-2xl" />
                    <div className="ml-4">
                      <h3 className="text-xl text-gray-800">{t('sanctions_block.sanction_details_block.employee_number')}</h3>
                      <p className="text-lg text-gray-800">{selected_sanction.employee_pnid}</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-sm shadow-sm flex items-center">
                    <FaCalendarAlt className="text-blue-500 text-2xl" />
                    <div className="ml-4">
                      <h3 className="text-xl text-gray-800">
                        {t('sanctions_block.sanction_details_block.due_date')}
                      </h3>
                      <p className="text-lg text-gray-800">{selected_sanction.due_date}</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-sm shadow-sm flex items-center">
                    <FaMoneyBillWave className="text-blue-500 text-2xl" />
                    <div className="ml-4">
                      <h3 className="text-xl text-gray-800">
                        {t('sanctions_block.sanction_details_block.amount')}
                      </h3>
                      <p className="text-lg text-gray-800">{selected_sanction.total_charge}</p>
                    </div>
                  </div>
                </div>
              </header>
            </section>

            <section className="bg-white p-4 rounded shadow border mb-4">
              <header className="mb-4">
                <h1 className="text-2xl text-gray-800 flex items-center gap-2">
                  <FaFileAlt className="text-blue-500" /> {t('sanctions_block.sanction_details_block.invoice_report')}
                </h1>
              </header>
              <div>
                <img src="/assets/parksync_green_black.png" alt="Invoice" height={40} width={240} style={{ objectFit: 'cover' }} />
              </div>
              <hr className="my-2" />
              <div className="overflow-x-auto">
                <div className="flex items-center">
                  <div className="h-20 w-20 bg-blue-100 mr-2 flex items-center justify-center">
                    <FaUser className="text-blue-500 text-2xl" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg text-gray-600">{t('sanctions_block.sanction_details_block.client_name')}: Ahmed Tarek</p>
                    <p className="text-lg text-gray-600">{t('sanctions_block.sanction_details_block.address')}: 123 Main Street, Anytown, USA</p>
                    <p className="text-lg text-gray-600 mb-2">{t('sanctions_block.sanction_details_block.violation_number')}: {selected_sanction.control_number}</p>
                  </div>
                </div>
                <hr className="my-2" />
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">{t('sanctions_block.sanction_details_block.rule')}</th>
                      <th className="py-3 px-6 text-left">{t('sanctions_block.sanction_details_block.charge')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selected_sanction.sanction_rules.map((rule, index) => (
                      <tr className="border-b border-gray-300 hover:bg-gray-100" key={index}>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{rule.name}</td>
                        <td className="py-3 px-6 text-left">{index == 0 ? rule.charge + ' kr' : '-'}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">- {t('sanctions_block.sanction_details_block.total_charge')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{selected_sanction.sanction_rules[0].charge} kr</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">- {t('sanctions_block.sanction_details_block.due_date')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{selected_sanction.due_date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="w-1/3">
            <section className="bg-white p-4 rounded shadow border mb-4">
              <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl text-gray-800 flex items-center gap-2">
                  <FaFileAlt className="text-blue-500" /> {t('sanctions_block.sanction_details_block.case_files')}
                </h1>
                <button
                  type="button"
                  onClick={navigateToAddAttachment}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 ease-in-out py-1 px-2 flex items-center gap-1"
                >
                  <FaDownload /> {t('sanctions_block.sanction_details_block.add_files_button')}
                </button>
              </header>
              <div className="flex flex-col">
              
                {selected_sanction.sanction_files.length === 0 && (
                  <p className="text-xl text-gray-600 text-center font-semibold">
                    {t('sanctions_block.sanction_details_block.no_files_found')}
                  </p>
                )}
                {selected_sanction.sanction_files.map((file, index) => file.file_type == 'image' ? (
                  <div
                    key={index}
                    className="bg-gray-100 mb-2 p-1 flex items-center hover:bg-gray-200 transition duration-200 cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                      <FaFileImage className="text-2xl mr-2 text-blue-500" />
                    <span>{file.file_name}</span>
                  </div>
                ): (
                    <div
                    key={46046}
                    onClick={() => openPdfModal(baseUrl + '/' + file.file_path)}
                    className="bg-gray-100 mb-2 p-1 flex items-center hover:bg-gray-200 transition duration-200 cursor-pointer"
                  >
                    <FaFileAlt className="text-2xl mr-2 text-blue-500" />
                    <span>{file.file_name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-4 shadow rounded border">
    <header className="flex items-center mb-4">
        <FaReceipt className="text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">
          {t('sanctions_block.sanction_details_block.payment_details')}
        </h1>
    </header>

    {selected_sanction.status !== 'paid' ? (
        <p className="text-lg text-gray-600">
            {t('sanctions_block.sanction_details_block.no_payment_available')}
        </p>
    ) : (
        <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.client_name_payment')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.client_name}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.plate_number')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.plate_number}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.charged_at')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.charged_at}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.paid_at')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.paid_at}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.paid_amount')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.paid_amount}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{t('sanctions_block.sanction_details_block.control_number')}:</span>
                    <span className="text-lg text-gray-900">{selected_sanction.payment.control_number}</span>
                </div>
            </div>
        </div>
    )}

    <p className="mt-4 text-center text-lg text-gray-600 font-semibold">
        {getPaymentStatus(selected_sanction.status)}
    </p>
</section>

          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          mainSrc={files[lightboxIndex].url}
          nextSrc={files[(lightboxIndex + 1) % files.length].url}
          prevSrc={files[(lightboxIndex + files.length - 1) % files.length].url}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setLightboxIndex((lightboxIndex + files.length - 1) % files.length)}
          clickOutsideToClose={false}
          onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % files.length)}
          reactModalStyle={{ overlay: { zIndex: 10000 } }}
        />
      )}

      {
        pdfModalOpen && (
            <Modal
                isOpen={pdfModalOpen}
                onRequestClose={() => setPdfModalOpen(false)}
                contentLabel="PDF Viewer"
                className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto my-10"
                overlayClassName="fixed inset-0 bg-black bg-opacity-60"
                style={{
                content: {
                    width: '1600px',
                },
                }}
                
            >
                <iframe src={pdfUrl} width="100%" height="600px" frameBorder="0"></iframe>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                onClick={() => setPdfModalOpen(false)}
                >
                Close
                </button>
            </Modal>
        )
      }
    </div>
  );
}

export default SanctionDetails;
