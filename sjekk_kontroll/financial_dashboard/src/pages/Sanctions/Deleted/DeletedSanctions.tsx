import { useState, useEffect, useMemo } from 'react';
import { FaFileInvoiceDollar, FaUndo } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import SocketEvents from '../../../constants/socket_events';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { pushSanction, getDeletedSanctions } from '../../../redux/stores/sanction_store';
import { socket } from '../../../socket';
import DropdownFilter from '../components/DropdownFilter';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const Sanctions = () => {
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedSanction, setSelectedSanction] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAppDispatch();

  const { deleted_sanctions } = useAppSelector(state => state.sanction_store);
  const [t] = useTranslation();

  const sanctionsPerPage = 10;
  const pagesVisited = currentPage * sanctionsPerPage;

  useEffect(() => {
    dispatch(getDeletedSanctions());

    socket.connect();

    socket.on(SocketEvents.sanction_added, (sanction) => {
      dispatch(
        pushSanction(sanction)
      )
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const openRestoreDialog = () => {
    setIsRestoreDialogOpen(true);
  };

  const openInvoiceDialog = (sanction) => {
    setSelectedSanction(sanction);
    setIsInvoiceDialogOpen(true);
  };

  const closeDialog = () => {
    setIsRestoreDialogOpen(false);
    setIsInvoiceDialogOpen(false);
  };

  const handleRestoreSanction = () => {
    // Handle restore sanction logic here
    closeDialog();
  };

  const pageCount = Math.ceil(deleted_sanctions.length / sanctionsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSanctions = useMemo(() => {
    if (!searchTerm) {
      return deleted_sanctions;
    } else {
      return deleted_sanctions.filter((sanction) => {
        return (
          sanction.employee_pnid.toLowerCase().includes(searchTerm.toLowerCase())
          || sanction.due_date.toLowerCase().includes(searchTerm.toLowerCase())
          || sanction.control_number.toLowerCase().includes(searchTerm.toLowerCase())
          || sanction.kid_number.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }
  }, [deleted_sanctions, searchTerm]);

  return (
    <main className="bg-gray-100 p-2 select-none">
      <div className="mx-auto">
        <section className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between mb-3 items-end">
            <header>
              <h1 className="text-3xl font-bold text-gray-800">
                {t('sanctions_block.deleted_sanctions_block.deleted_sanctions')}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {t('sanctions_block.deleted_sanctions_block.manage_deleted_sanctions')}
              </p>
            </header>
            <div className="flex justify-end items-center mb-6 flex-grow">
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder={t('sanctions_block.deleted_sanctions_block.search')}
                  className="w-full px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="ml-4">
                <DropdownFilter />
              </div>
            </div>
          </div>

          <div className="">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">{t('sanctions_block.deleted_sanctions_block.table_headers.control_number')}</th>
                  <th className="py-3 px-6 text-left">
                    {t('sanctions_block.deleted_sanctions_block.table_headers.pnid')}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {t('sanctions_block.deleted_sanctions_block.table_headers.pnid')}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {t('sanctions_block.deleted_sanctions_block.table_headers.due_date')}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {t('sanctions_block.deleted_sanctions_block.table_headers.amount')}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {t('sanctions_block.deleted_sanctions_block.table_headers.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {
                  !filteredSanctions.length && (
                    <tr>
                      <td colSpan={6} className="py-3 px-6 text-center text-xl">
                        {t('sanctions_block.deleted_sanctions_block.no_deleted_sanctions_found')}
                      </td>
                    </tr>
                  )
                }
                {
                  filteredSanctions.slice(pagesVisited, pagesVisited + sanctionsPerPage).map((sanction) => {
                    return (
                      <tr className="border-b border-gray-300 hover:bg-gray-100" key={sanction.id}>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {sanction.control_number}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {sanction.kid_number}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {sanction.employee_pnid}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {sanction.due_date}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {sanction.total_charge} €
                        </td>
                        <td className="flex h-[48px] items-center">
                          <button
                            onClick={openRestoreDialog}
                            className="flex items-center ml-2 bg-blue-200 text-blue-800 py-1 px-2 rounded-[2px] text-sm transition duration-300 ease-in-out hover:bg-blue-300 cursor-pointer"
                          >
                            <FaUndo className="mr-2" />
                            <p>{t('sanctions_block.deleted_sanctions_block.restore_button')}</p>
                          </button>
                          <button
                            onClick={() => openInvoiceDialog(sanction)}
                            className="flex items-center ml-2 bg-green-200 text-green-800 py-1 px-2 rounded-[2px] text-sm transition duration-300 ease-in-out hover:bg-green-300 cursor-pointer"
                          >
                            <FaFileInvoiceDollar className="mr-2" />
                            <p>
                              {t('sanctions_block.deleted_sanctions_block.invoice')}
                            </p>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p>
                {
                  t('sanctions_block.deleted_sanctions_block.pagination_message', {
                    from: pagesVisited + 1,
                    to: pagesVisited + filteredSanctions.length,
                    total: deleted_sanctions.length
                  })
                }
              </p>
            </div>

            <ReactPaginate
              previousLabel={t('sanctions_block.deleted_sanctions_block.previous_button')}
              nextLabel={t('sanctions_block.deleted_sanctions_block.next_button')}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'pagination flex'}
              pageClassName={'page-item mx-1'}
              pageLinkClassName={'page-link px-3 border border-gray-300 cursor-pointer hover:text-black'}
              previousLinkClassName={'previous-link px-3 border border-gray-300 rounded-sm cursor-pointer'}
              nextLinkClassName={'next-link px-3 border border-gray-300 rounded-sm cursor-pointer'}
              activeClassName={'active bg-blue-600 text-white'}
            />
          </div>
        </section>
      </div>

      {isRestoreDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={closeDialog}>
          <div className="bg-white p-2 rounded-sm shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold">
              {t('sanctions_block.deleted_sanctions_block.restore_modal.restore_confirmation_title')}
            </h2>
            <p>
              {t('sanctions_block.deleted_sanctions_block.restore_modal.restore_confirmation_message')}
            </p>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-200 text-gray-700 py-1 px-4 rounded-sm mr-2" onClick={closeDialog}>
                {t('sanctions_block.deleted_sanctions_block.restore_modal.cancel_button')}
              </button>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-sm" onClick={handleRestoreSanction}>
                {t('sanctions_block.deleted_sanctions_block.restore_modal.ok_button')}
              </button>
            </div>
          </div>
        </div>
      )}

      {isInvoiceDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={closeDialog}>
          <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
            <img src="/assets/parksync_green_black.png" alt="Parksync Logo" className="h-6" />
            <p className="cursor-pointer text-red-500" onClick={closeDialog}>
                <MdClose size={28} />
            </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-semibold">
                  {t('sanctions_block.deleted_sanctions_block.invoice_modal.control_number')}
                </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.invoice?.control_number}</p>
              </div>
              <div>
                <label className="font-semibold">
                  {t('sanctions_block.deleted_sanctions_block.invoice_modal.kid_number')}
                </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.invoice?.kid_number}</p>
              </div>
              <div>
                <label className="font-semibold">
                  {t('sanctions_block.deleted_sanctions_block.invoice_modal.pnid')}
                </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.employee_pnid}</p>
              </div>
              <div>
              <label className="font-semibold">
                {t('sanctions_block.deleted_sanctions_block.invoice_modal.due_date')}
              </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.due_date}</p>
              </div>
              <div>
                <label className="font-semibold">
                  {t('sanctions_block.deleted_sanctions_block.invoice_modal.total_charge')}
                </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.invoice?.total_charge} €</p>
              </div>
              <div>
                <label className="font-semibold">
                  {t('sanctions_block.deleted_sanctions_block.invoice_modal.due_date')}
                </label>
                <p className="bg-gray-100 p-2 rounded-sm">{selectedSanction?.due_date}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="font-semibold">
                {t('sanctions_block.deleted_sanctions_block.invoice_modal.rules')}
              </label>
              <p className="bg-gray-100 p-2 rounded-sm">
              {selectedSanction.invoice.rules.map((rule, index) => (
                  <div className='mb-2'>
                    <span key={index} className="block">{rule.name}</span>
                    <span key={index} className="block font-[500]">{rule.charge} Kr</span>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Sanctions;
