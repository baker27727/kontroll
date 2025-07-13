// Complaints.tsx
import {  useEffect, useState } from "react";
import { getFeatured, setCurrentComplaint } from "../redux/features/complaints_reducer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Table, Spin, Typography, Space, Button, Popconfirm, message, Select, Input, DatePicker, Tabs } from 'antd';
import {CloseOutlined,WarningOutlined,FileDoneOutlined,StarOutlined} from '@ant-design/icons'
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Complaint from "../interfaces/Complaint";
import { deleteComplaint } from "../redux/features/delete_complaint";
import { unwrapResult } from "@reduxjs/toolkit";
import reload from "../utils/page_reloader";
import { CustomTag } from "../components/CustomTag";
import { useTranslation } from "react-i18next";
import moment from 'moment'
import './Complaints.css'
const { Column } = Table;
const {Option} = Select
const { TabPane } = Tabs;  // Import Tabs component


export const Complaints = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation()

  // Trigger the async action to get featured complaints
  useEffect(() => {
    dispatch(getFeatured());
  }, [dispatch]);

  // Access the state from the redux store
  const { loading, complaints, error } = useAppSelector(
    (state) => state.complaints
  );

  const handleReadClick = (complaint: Complaint) => {
    dispatch(setCurrentComplaint(complaint));
    navigate(`/complaints/${complaint.id}`);
  };

  // Use an object to store the open state for each complaint
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (complaintId: number) => {
    setOpenStates((prev) => ({ ...prev, [complaintId]: true }));
  };

  const handleOk = async (complaint: Complaint) => {
    setConfirmLoading(true);

    await dispatch(deleteComplaint(complaint.id))
      .then(unwrapResult)
      .then(() => {
        setOpenStates((prev) => ({ ...prev, [complaint.id]: false }));
        setConfirmLoading(false);
        message.info(t('complaint_delete_success'))
        reload()
      })
      .catch((error) => {
        console.error(t('complaint_delete_error'), error);
        setConfirmLoading(false);
        message.error(error.message)
      });
  };

  const handleCancel = (complaintId: number) => {
    setOpenStates((prev) => ({ ...prev, [complaintId]: false }));
  };

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter function for the "Status" column
  const handleStatusFilter = (value: string | null) => {
    setStatusFilter(value);
  };

  // Clear the status filter
  const clearStatusFilter = () => {
    setStatusFilter(null);
  };

  const [searchText, setSearchText] = useState('');

  // Handler for searching
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Function to filter the table rows based on the search text
  const filterComplaints = (complaint: Complaint) => {
    const searchFields = [
      'first_name',
      'last_name',
      'created_at',
      'email',
      'phone_number',
      'address',
      'city',
      'country',
      'postal_code',
      'status',
    ];

    return searchFields.some((field) =>
      complaint[field]?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);


  // Function to filter the table rows based on the date range
  const filterByDateRange = (complaint: Complaint) => {
    if (!dateRange) return true; // No date range selected, include all rows

    const createdAt = moment(complaint.created_at, 'DD.MM.YY HH:mm'); // Assuming your date format
    return createdAt.isBetween(dateRange[0], dateRange[1], null, '[]');
  };

  const handleChangeDebut = (range) => {
    const valueOfInput1 = moment(range[0].$d, 'DD.MM.YY HH:mm');
    const valueOfInput2 = moment(range[1].$d, 'DD.MM.YY HH:mm');


    setDateRange([valueOfInput1,valueOfInput2])
  }

  const [activeTab, setActiveTab] = useState<string>('pending'); // State for tracking active tab

  // Handler for changing tabs
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // Function to filter complaints based on the current tab
  const filterByStatus = (complaint: Complaint) => {
    return complaint.status === activeTab;
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Typography.Title level={4} style={{ marginBottom: "20px" }}>
          {t('complaints')}
        </Typography.Title>
        <div className="controllers">
        <Input.Search
          placeholder={t('search_placeholder')}
          allowClear
          onSearch={handleSearch}
          style={{ marginBottom: '16px', marginRight:'12px' }}
        />
                <DatePicker.RangePicker
          style={{ marginBottom: '16px' }}
          // value={dateRange}
          onChange={handleChangeDebut}
          showTime={{ format: 'HH:mm' }}
          format="DD.MM.YY HH:mm"
          placeholder={[t('start_date'), t('end_date')]}
        />
        </div>
        {loading && <Spin size="large" style={{ margin: "20px" }} />}
        {error && <p style={{ color: "red" }}>{t('error')}: {error}</p>}
        {complaints && complaints.length > 0 ? (
          <>
                 <Tabs activeKey={activeTab} onChange={handleTabChange} > 
          <TabPane tab={
            <span>
            <StarOutlined /> {t('pending')}
          </span>
          } key="pending">
            {/* Pending Complaints Tab */}
            {/* ... (existing code) */}
          </TabPane>
          <TabPane tab={
            <span>
            <WarningOutlined /> {t('rejected')}
          </span>
          } key="rejected">
            {/* Rejected Complaints Tab */}
            {/* ... (existing code) */}
          </TabPane>
          <TabPane tab={
            <span>
            <FileDoneOutlined /> {t('completed')}
          </span>
          } key="completed">
            {/* Completed Complaints Tab */}
            {/* ... (existing code) */}
          </TabPane>
          <TabPane tab={
            <span>
            <CloseOutlined /> {t('deleted')}
          </span>
          } key="deleted">
            
          </TabPane>
        </Tabs>

            <Table
          dataSource={complaints.filter(filterComplaints).filter(filterByDateRange).filter(filterByStatus)}
          loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10, responsive: true }}
            bordered
            size="middle"
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginTop: '12px'
            }}
          >
                       <Column title={t('first_name')} dataIndex="first_name" key="title" align="center" />
          <Column title={t('last_name')} dataIndex="last_name" key="content" align="center" />
          <Column title={t('created_at')} dataIndex="created_at" key="created_at" align="center" />
          <Column title={t('email')} dataIndex="email" key="email" align="center" />
          <Column title={t('phone')} dataIndex="phone" key="phone" align="center" render={(_, record: Complaint) => (
            <span>{record.phone_number || 'N/A'}</span>
          )} />
          <Column title={t('address')} dataIndex="address" key="name" align="center" />
          <Column title={t('city')} dataIndex="city" key="name" align="center" />
          <Column title={t('country')} dataIndex="country" key="name" align="center" />
          <Column title={t('postal_code')} dataIndex="postal_code" key="name" align="center" />
          <Column
          title={t('status')}
          dataIndex="status"
          key="status"
          align="center"
          render={(_, record: Complaint) => (
            <CustomTag status={record.status} />
          )}
          // Filter dropdown for the "Status" column
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <Typography.Text>{t('status')}:</Typography.Text>
              <Select
                style={{ width: 120, marginLeft: 8 }}
                value={selectedKeys[0]}
                onChange={(value) => setSelectedKeys(value ? [value] : [])}
              >
                <Option value="pending">{t('pending')}</Option>
                <Option value="rejected">{t('rejected')}</Option>
                <Option value="completed">{t('completed')}</Option>
                <Option value="deleted">{t('deleted')}</Option>
                {/* Add more status options as needed */}
              </Select>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  clearStatusFilter();
                  clearFilters!();
                  confirm({ closeDropdown: true });
                }}
              >
                Reset
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: true });
                  handleStatusFilter(selectedKeys[0] as string);
                }}
              >
                {t('filter')}
              </Button>
            </div>
          )}
          // Function to determine if a row should be displayed based on the status filter
          onFilter={(_, record) => record.status === statusFilter}
          // Clear the status filter when filter is cleared
        />
            <Column
              title={t('actions')}
              key="actions"
              align="center"
              render={(_, record: Complaint) => (
                <Space size="middle">
                  {/* Add any additional actions/buttons here */}
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleReadClick(record)}
                  >
                    {t('read')}
                  </Button>
                  <Popconfirm
                    title={t('title')}
                    description="Open Popconfirm with async logic"
                    open={openStates[record.id] || false}
                    onConfirm={() => handleOk(record)}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={() => handleCancel(record.id)}
                    key={record.id}
                  >
                    <Button
                      type="primary"
                      size="small"
                      danger
                      onClick={() => showPopconfirm(record.id)}
                    >
                      {t('delete')}
                    </Button>
                  </Popconfirm>
                </Space>
              )}
            />
          </Table>
          </>
        ) : (
          <Typography.Paragraph>{t('no_complaints')}</Typography.Paragraph>
        )}
      </div>
      
    </>
  );
};

