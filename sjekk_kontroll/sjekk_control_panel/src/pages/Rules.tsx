import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { createRule, deleteRule, getAllRules, updateRule } from '../redux/features/RuleSlice';
import Rule from '../interfaces/Rule';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { Edit, Text, Trash } from 'lucide-react';
import Tag from '../components/Tag';
import { DangerModal } from '../components/DangerModal';
import CustomButton from '../components/Button';
import Modal from '../components/Modal';
import { Input } from '../components/InputField';
import { FaHashtag } from 'react-icons/fa6';
import CheckboxContainer from '../components/CheckboxContainer';
import { showNotification } from '../redux/features/notification_store';
import { DataTable } from '../components/DataTable';
import { Card } from '../components/Card';
import { IconType } from 'react-icons';
import IconTextButton from '../components/IconTextButton';

const RulesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(); // Initialize useTranslation hook
  const state = useAppSelector(state => state.RuleReducer);

  useEffect(() => {
    dispatch(getAllRules());
  }, [dispatch]);


  const [searchText] = useState('');


  const filteredRules = state.rules.filter(rule =>
    Object.values(rule).some(value =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentRule, setCurrentRule] = useState<Rule | null>(null)

  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false)
  const [isEditRuleModalOpen, setIsEditRuleModalOpen] = useState(false)

  const openDeleteModal = (rule: Rule) => {
    setCurrentRule(rule)
    setIsModalOpen(true)
  }

  const handleDeleteAccept = async () => {
    await dispatch(
      deleteRule(currentRule?.id)
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          showNotification({
            type: 'success',
            message: t('deleted_successfully'),
            description: t('deleted_successfully'),
          })
        )
        setIsModalOpen(false)
      })
      .catch((err: Error) => {
        dispatch(
          showNotification({
            type: 'error',
            message: t('deleted_error'),
            description: err.message,
          })
        )
        setIsModalOpen(false)
      });
  }

  const [name, setName] = useState('')
  const [charge, setCharge] = useState('')
  const [policyTime, setPolicyTime] = useState('')
  
  
  const [hasExpiryDate, setHasExpiryDate] = useState(false)
  const [hasMeterReceiptNumber, setHasMeterReceiptNumber] = useState(false)
  const [hasMeterNumber, setHasMeterNumber] = useState(false)
  const [hasPaidAmount, setHasPaidAmount] = useState(false)
  
  const extras = {
    meter_receipt_number: hasMeterReceiptNumber,
    meter_number: hasMeterNumber,
    expiry_date: hasExpiryDate,
    paid_amount: hasPaidAmount,
  }

  const openEditModal = (record: Rule) => {
    setCurrentRule(record);
    setName(record.name);
    setCharge(record.charge.toString());
    setPolicyTime(record.policy_time.toString());
    setHasExpiryDate(record.extras.expiry_date);
    setHasMeterReceiptNumber(record.extras.meter_receipt_number);
    setHasMeterNumber(record.extras.meter_number);
    setHasPaidAmount(record.extras.paid_amount);
    setIsEditRuleModalOpen(true);
  };

  const handleCreateAccept = async () => {
    await dispatch(
      createRule({
        name: name,
        charge: +charge,
        policy_time: +policyTime,
        extras: extras
      })
    )
    .then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: t('created_successfully'),
          description: t('created_successfully'),
        })
      )
      dispatch(getAllRules())

      setIsAddRuleModalOpen(false)
    })
    .catch((err: Error) => {
      dispatch(
        showNotification({
          type: 'error',
          message: t('failed_to_create'),
          description: err.message,
        })
      )

      setIsAddRuleModalOpen(false)
    });
  }

  const handleEditAccept = async () => {
    await dispatch(
      updateRule({
        id: currentRule?.id,
        payload: {
          name: name,
          charge: +charge,
          policy_time: +policyTime,
          extras: extras
        }
      })
    )
    .then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Update Rule',
          description: 'Rule updated successfully',
        })
      )

      dispatch(getAllRules())
      setIsAddRuleModalOpen(false)
    })
    .catch((err: Error) => {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to update Rule',
          description: err.message,
        })
      )

      setIsAddRuleModalOpen(false)
    });
  }

  return (
    <>
    <Card 
      title='Rules'
      headerAction={
        <CustomButton variant='outline' onClick={() => setIsAddRuleModalOpen(true)}  leftIcon={Edit as IconType}>
        {t('create_rule')}
      </CustomButton>
      }  
    >
    <div className='flex justify-end items-center'>

    </div>
      <DataTable 
        data={filteredRules}
        hoverable
        itemsPerPage={8}
        columns={[
          { id: 'name', title: t('name'), key: 'name', sortable: true },
          { id: 'charge', title: t('charge'), key: 'charge', sortable: true },
          { id: 'policy_time', title: t('policy_time'), key: 'policy_time', sortable: true },
          { id: 'extras', title: t('extras'), key: 'extras', render: (_: unknown, row: Rule) => (
            <div className='flex flex-wrap gap-2'>
                {row.extras.expiry_date && <Tag text={t('expiry_date')} />}
                {row.extras.meter_receipt_number && <Tag text={t('meter_receipt_no')} />}
                {row.extras.meter_number && <Tag text={t('meter_number')} />}
                {row.extras.paid_amount && <Tag text={t('paid_amount')} />}
            </div>
          )},
          { id: 'created_at', title: t('created_at'), key: 'created_at', sortable: true },
        ]}

        actions={
          (rule: Rule) => (
            <div className='flex gap-2'>
              <IconTextButton text='Edit' icon={Edit as IconType} onClick={() => openEditModal(rule)} size='sm' color='yellow'/>
              <IconTextButton text='Delete' icon={Trash as IconType} onClick={() => openDeleteModal(rule)} size='sm' color='red'/>
            </div>
          )
        }
      />

      <Modal title='Edit Rule' isOpen={isEditRuleModalOpen} onClose={() => setIsEditRuleModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the rule' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={FaHashtag} type='number' placeholder='Charge' helperText='Enter the charge of the rule' value={charge} onChange={(e) => setCharge(e.target.value)}/>
          <Input icon={FaHashtag} placeholder='Policy Time' type='number' helperText='Enter the policy time of the rule' value={policyTime} onChange={(e) => setPolicyTime(e.target.value)}/>

          <p className='mb-2'>Select Extras</p>
          <div className='grid grid-cols-3 gap-2 mb-4'>
          <CheckboxContainer initialChecked={hasExpiryDate} onChange={(isChecked) => setHasExpiryDate(isChecked)}>
            Expiry Date
          </CheckboxContainer>
          <CheckboxContainer initialChecked={hasMeterReceiptNumber} onChange={(isChecked) => setHasMeterReceiptNumber(isChecked)}>
            Meter Receipt Number
          </CheckboxContainer>
          <CheckboxContainer initialChecked={hasMeterNumber}  onChange={(isChecked) => setHasMeterNumber(isChecked)}>
            Meter Number
          </CheckboxContainer>
          <CheckboxContainer initialChecked={hasPaidAmount}  onChange={(isChecked) => setHasPaidAmount(isChecked)}>
            Paid Amount
          </CheckboxContainer>
          </div>

            <div className='flex justify-end'>
            <CustomButton onClick={() => setIsEditRuleModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton onClick={handleEditAccept} color="green">
              Update
            </CustomButton>
            </div>
          </>
      </Modal>

      <Modal title='Add Rule' isOpen={isAddRuleModalOpen} onClose={() => setIsAddRuleModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the rule' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={FaHashtag} type='number' placeholder='Charge' helperText='Enter the charge of the rule' value={charge} onChange={(e) => setCharge(e.target.value)}/>
          <Input icon={FaHashtag} placeholder='Policy Time' type='number' helperText='Enter the policy time of the rule' value={policyTime} onChange={(e) => setPolicyTime(e.target.value)}/>
        
          <p className='mb-2'>Select Extras</p>
          <div className='grid grid-cols-3 gap-2 mb-4'>
          <CheckboxContainer onChange={(isChecked) => setHasExpiryDate(isChecked)}>
            Expiry Date
          </CheckboxContainer>
          <CheckboxContainer onChange={(isChecked) => setHasMeterReceiptNumber(isChecked)}>
            Meter Receipt Number
          </CheckboxContainer>
          <CheckboxContainer onChange={(isChecked) => setHasMeterNumber(isChecked)}>
            Meter Number
          </CheckboxContainer>
          <CheckboxContainer onChange={(isChecked) => setHasPaidAmount(isChecked)}>
            Paid Amount
          </CheckboxContainer>
          </div>

            <div className='flex justify-end'>
            <CustomButton onClick={() => setIsAddRuleModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton onClick={handleCreateAccept} color="green">
              Create
            </CustomButton>
            </div>
          </>
      </Modal>

      <DangerModal 
        title='Delete Rule'
        content={`Are you sure you want to delete the rule "${currentRule?.name}"?`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleDeleteAccept}
        onCancel={() => setIsModalOpen(false)}
      />
    </Card>
    </>
  );
};

export default RulesPage;
