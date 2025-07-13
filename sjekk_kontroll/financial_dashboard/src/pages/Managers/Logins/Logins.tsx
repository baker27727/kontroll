// src/pages/ManagerLogins.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getManagerLogins } from '../../../redux/stores/manager_login_store';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const ManagerLogins: React.FC = () => {
    const dispatch = useAppDispatch()
    const {logins} = useAppSelector(state => state.manager_login_store)
    const {id} = useParams()
    const [t] = useTranslation()

    useEffect(() => {
        dispatch(
            getManagerLogins(Number(id))
        )
    }, [dispatch, id])

    const [currentPage, setCurrentPage] = useState(0);
    const dataPerPage = 10;
    const pageCount = Math.ceil(logins.length / dataPerPage);
    const pagesVisited = currentPage * dataPerPage;

    const changePage = ({ selected }) => {
      setCurrentPage(selected);
    };

    return (
        <main className="bg-gray-100 p-6">
        <div className="max-w-8xl mx-auto">
            <section className="bg-white p-6 rounded-lg shadow-md">
            <header className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                    {
                        t('managers_block.logins_block.managers_logins')
                    }
                </h1>
                <p className="text-lg text-gray-600 mt-2">{t('managers_block.logins_block.login_history')}</p>
            </header>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-sm shadow-sm">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                        {
                            t('managers_block.logins_block.login_time')
                        }
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                        {
                            t('managers_block.logins_block.ip_address')
                        }
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                        {
                            t('managers_block.logins_block.hostname')
                        }
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {logins.slice(pagesVisited, pagesVisited + dataPerPage).map((login, index) => (
                    <tr key={index} className="border-b border-gray-300">
                        <td className="py-2 px-4">{login.login_time}</td>
                        <td className="py-2 px-4">{login.ip_address}</td>
                        <td className="py-2 px-4">{login.hostname}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-4">
                <div>
                    <p className="text-gray-600">
                        {
                            t('managers_block.logins_block.pagination_message', {
                                from: pagesVisited + 1,
                                to: Math.min(pagesVisited + dataPerPage, logins.length),
                                total: logins.length
                            })
                        }
                    </p>
                </div>

                <ReactPaginate
                previousLabel={t('managers_block.logins_block.previous_button')}
                nextLabel={t('managers_block.logins_block.next_button')}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination flex'}
                pageClassName={'page-item mx-1'}
                pageLinkClassName={'page-link px-3 border border-gray-300  cursor-pointer hover:text-black'}
                previousLinkClassName={'previous-link px-3 border border-gray-300 rounded-sm cursor-pointer'}
                nextLinkClassName={'next-link px-3 border border-gray-300 rounded-sm cursor-pointer'}
                activeClassName={'active  bg-blue-600 text-white'}
                />
          </div>
            </section>
        </div>
        </main>
    );
};

export default ManagerLogins;
