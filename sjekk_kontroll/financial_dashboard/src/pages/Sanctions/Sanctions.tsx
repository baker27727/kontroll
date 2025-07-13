import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSanctions, deleteSanction, sendSanctionToDebtCollect, setCurrentSanction } from '../../redux/stores/sanction_store';
import { showNotification } from '../../redux/stores/notification_store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar, FaHandHoldingUsd, FaTrashAlt } from 'react-icons/fa';
import { MdInfoOutline, MdOutlineDeleteSweep } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Routes from '../../constants/routes';
import Sanction from '../../interfaces/Sanction';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { Modal } from '../../components/Modal';

const Sanctions: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSanction, setSelectedSanction] = useState<Sanction | null>(null);
  const [isCollectDebtDialogOpen, setIsCollectDebtDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const { sanctions } = useAppSelector(state => state.sanction_store);

  useEffect(() => {
    dispatch(getSanctions());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSanctions = useMemo(() => {
    if (!searchTerm) return sanctions;
    return sanctions.filter((sanction) =>
      sanction.employee_pnid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sanction.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sanction.control_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sanction.kid_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sanctions, searchTerm]);

  const columns = [
    { header: t('sanctions_block.table_headers.control_number'), accessor: 'control_number' },
    { header: t('sanctions_block.table_headers.kid_number'), accessor: 'kid_number' },
    { header: t('sanctions_block.table_headers.pnid'), accessor: 'employee_pnid' },
    { header: t('sanctions_block.table_headers.due_date'), accessor: 'due_date' },
    { header: t('sanctions_block.table_headers.amount'), accessor: 'total_charge', render: (value) => `${value} €` },
    { 
      header: t('sanctions_block.table_headers.status'), 
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value === 'paid' ? 'bg-green-200 text-green-800' :
          value === 'not_paid' ? 'bg-red-200 text-red-800' :
          'bg-yellow-200 text-yellow-800'
        }`}>
          {t(`sanctions_block.status.${value}`)}
        </span>
      )
    },
  ];

  const handleCollectDebt = async () => {
    if (selectedSanction) {
      await dispatch(sendSanctionToDebtCollect(selectedSanction.id))
        .unwrap()
        .then(() => {
          dispatch(showNotification({
            message: t('sanctions_block.collect_debt_title'),
            description: t('sanctions_block.collect_debt_message'),
            type: 'info',
          }));
        })
        .catch(() => {
          dispatch(showNotification({
            message: t('sanctions_block.collect_debt_failure_title'),
            description: t('sanctions_block.collect_debt_failure_message'),
            type: 'error',
          }));
        });
    }
    setIsCollectDebtDialogOpen(false);
  };

  const handleDelete = async () => {
    if (selectedSanction) {
      await dispatch(deleteSanction(selectedSanction.id))
        .unwrap()
        .catch((error) => {
          console.log(error);
        });
    }
    setIsDeleteDialogOpen(false);
  };

  // const handleMarkAsPaid = async (sanction: Sanction) => {
  //   await dispatch(markSanctionAsPaid(sanction.id))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(showNotification({
  //         message: t('sanctions_block.mark_as_paid_title'),
  //         description: t('sanctions_block.mark_as_paid_message'),
  //         type: 'info',
  //       }));
  //     })
  //     .catch(() => {
  //       dispatch(showNotification({
  //         message: t('sanctions_block.mark_as_paid_failure_title'),
  //         description: t('sanctions_block.mark_as_paid_failure_message'),
  //         type: 'error',
  //       }));
  //     });
  // };

  const actions = (row: Sanction) => (
    <div className="flex space-x-2">
      {row.status !== 'paid' && (
        <Button
          onClick={() => { setSelectedSanction(row); setIsCollectDebtDialogOpen(true); }}
          variant="secondary"
          size="sm"
          icon={<FaHandHoldingUsd />}
        >
          {t('sanctions_block.actions_buttons.collect_debt')}
        </Button>
      )}
      <Button
        onClick={() => { dispatch(setCurrentSanction(row)); navigate(`/sanctions/${row.id}/details`); }}
        variant="secondary"
        size="sm"
        icon={<MdInfoOutline />}
      >
        {t('sanctions_block.actions_buttons.details')}
      </Button>
      <Button
        onClick={() => { setSelectedSanction(row); setIsInvoiceDialogOpen(true); }}
        variant="secondary"
        size="sm"
        icon={<FaFileInvoiceDollar />}
      >
        {t('sanctions_block.actions_buttons.invoice')}
      </Button>
      <Button
        onClick={() => { setSelectedSanction(row); setIsDeleteDialogOpen(true); }}
        variant="danger"
        size="sm"
        icon={<FaTrashAlt />}
      >
        {t('sanctions_block.actions_buttons.delete')}
      </Button>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {t('sanctions_block.sanctions')}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t('sanctions_block.manage_sanctions')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer"
                placeholderText={t('sanctions_block.start_date')}
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer"
                placeholderText={t('sanctions_block.end_date')}
              />
              <Input
                type="text"
                placeholder={t('sanctions_block.search')}
                value={searchTerm}
                onChange={handleSearch}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <Button
              onClick={() => navigate(Routes.DELETED_SANCTIONS)}
              variant="danger"
              icon={<MdOutlineDeleteSweep />}
            >
              {t('sanctions_block.see_deleted_sanctions_button')}
            </Button>
          </div>

          <Table
            data={filteredSanctions}
            columns={columns}
            actions={actions}
            emptyMessage={t('sanctions_block.no_sanctions_found')}
          />
        </div>
      </div>

      <Modal
        isOpen={isCollectDebtDialogOpen}
        onClose={() => setIsCollectDebtDialogOpen(false)}
        title={t('sanctions_block.collect_debt_modal.collect_debt_confirmation_title')}
        content={t('sanctions_block.collect_debt_modal.collect_debt_confirmation_message')}
        onConfirm={handleCollectDebt}
        confirmText={t('sanctions_block.collect_debt_modal.ok_button')}
        cancelText={t('sanctions_block.collect_debt_modal.cancel_button')}
      />

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title={t('sanctions_block.delete_sanction_modal.delete_confirmation_title')}
        content={t('sanctions_block.delete_sanction_modal.delete_confirmation_message')}
        onConfirm={handleDelete}
        confirmText={t('sanctions_block.delete_sanction_modal.ok_button')}
        cancelText={t('sanctions_block.delete_sanction_modal.cancel_button')}
        variant="danger"
      />

      <Modal
        isOpen={isInvoiceDialogOpen}
        onClose={() => setIsInvoiceDialogOpen(false)}
        title={t('sanctions_block.invoice_modal.title')}
        content={
          selectedSanction && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.control_number')}</label>
                <p className="bg-gray-100 p-2 rounded-md">{selectedSanction.control_number}</p>
              </div>
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.kid_number')}</label>
                <p className="bg-gray-100 p-2 rounded-md">{selectedSanction.kid_number}</p>
              </div>
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.pnid')}</label>
                <p className="bg-gray-100 p-2 rounded-md">{selectedSanction.employee_pnid}</p>
              </div>
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.due_date')}</label>
                <p className="bg-gray-100 p-2 rounded-md">{selectedSanction.due_date}</p>
              </div>
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.total_charge')}</label>
                <p className="bg-gray-100 p-2 rounded-md">{selectedSanction.total_charge} €</p>
              </div>
              <div>
                <label className="font-semibold">{t('sanctions_block.invoice_modal.rules')}</label>
                <div className="bg-gray-100 p-2 rounded-md">
                  {selectedSanction.sanction_rules.map((rule, index) => (
                    <div key={index} className="mb-2">
                      <span className="block">{rule.name}</span>
                      <span className="block font-medium">{rule.charge} Kr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        confirmText={t('sanctions_block.invoice_modal.close')}
        showCancel={false}
      />
    </div>
  );
};

export default Sanctions;

