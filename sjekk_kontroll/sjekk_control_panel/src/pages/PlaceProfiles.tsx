import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import PublicPlaceDashboard from '../interfaces/PlaceProfile';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate, useParams } from 'react-router-dom';
import {  DeleteFilled } from '@ant-design/icons';
import { deletePlaceDashboard, getAllPlaceProfiles } from '../redux/features/PlaceDashboardSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import reload from '../utils/page_reloader';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { primaryColor } from '../configs/colors';

const PlaceProfilesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation(); // Initialize useTranslation hook
    const dashboards = useAppSelector(state => state.placeProfiles.dashboards);
    const isLoading = useAppSelector(state => state.placeProfiles.loading);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllPlaceProfiles(id)).catch((error: Error) => {
            message.error(`Error: ${error.message}`);
        });
    }, [dispatch, id]);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [deletingPlaceProfileId, setDeletingPlaceProfileId] = useState<number | null>(null);

    const showConfirmModal = (placeId: number) => {
        setDeletingPlaceProfileId(placeId);
        setConfirmModalVisible(true);
    };

    const handleDeletePlaceProfile = async (profile_id: number) => {
        await dispatch(deletePlaceDashboard({
            dashboard_id: profile_id,
            place_id: +id
        }))
        .then(unwrapResult)
        .then(() => {
            reload(2);
        })
        .catch(() => {
        });
    };

    const handleOk = async () => {
        if (deletingPlaceProfileId) {
            await handleDeletePlaceProfile(deletingPlaceProfileId);
        }
        setConfirmModalVisible(false);
    };

    const handleCancel = () => {
        setDeletingPlaceProfileId(null);
        setConfirmModalVisible(false);
    };

    const confirmDeletionModal = (
        <Modal
            title={t('confirm_delete')}
            open={confirmModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okType='danger'
        >
            <p>{t('are_you_sure_delete_this_profile')}</p>
        </Modal>
    );

    const columns: ColumnsType<PublicPlaceDashboard> = [
        {
            title: t('profile_name'),
            dataIndex: 'place_name',
            key: 'place_name',
            align: 'center',
        },
        {
            title: t('type'),
            dataIndex: 'place_type',
            key: 'place_type',
            align: 'center',
        },
        {
            title: t('access_username'),
            dataIndex: 'access_username',
            key: 'access_username',
            align: 'center',
        },
        {
            title: t('access_code'),
            dataIndex: 'access_code',
            key: 'access_code',
            align: 'center',
        },
        {
            title: t('free_parking_hours'),
            dataIndex: 'free_parking_hours',
            key: 'free_parking_hours',
            align: 'center',
        },
        {
            title: t('actions'),
            key: 'actions',
            align: 'center',
            render: (_, record: PublicPlaceDashboard) => (
                <Space size="small">
                    <Button type="default" danger onClick={() => showConfirmModal(record.id)} icon={<DeleteFilled />}>
                        
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div style={{ padding: '16px' }}>
                <div
                    style={{ textAlign: 'right' }}
                >
                    <Button type='primary' onClick={() => navigate(`/places/${id}/create-profile-link`)} style={{
                        marginBottom: '16px',
                        background: primaryColor
                    }}>
                        {t('add_new_profile')}
                    </Button>
                </div>
                <Table
                    dataSource={dashboards}
                    columns={columns}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                    bordered
                    size="small"
                />
            </div>
            {confirmDeletionModal}
        </>
    );
};

export default PlaceProfilesPage;
