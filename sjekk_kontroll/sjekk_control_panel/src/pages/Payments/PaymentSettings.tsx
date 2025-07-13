import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader, Save, Bell, DollarSign, Percent, Key } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPaymentSettings, updatePaymentSettings } from '../../redux/features/payment_settings_slice';
import Button from '../../components/Button';
import { Input } from '../../components/InputField';
import { IconType } from 'react-icons';
import Checkbox from '../../components/Checkbox';
import { Card } from '../../components/Card';
import DisabledWrapper from './DisabledWrapper';

interface FormValues {
  stripePublishableKey: string;
  stripeSecretKey: string;
  paymentExpirationDays: number;
  allowPartialPayments: boolean;
  enableAutomaticReminders: boolean;
  reminderFrequencyDays: number;
  lateFeePercentage: number;
  maxLateFeeAmount: number;
  currency: string;
  paymentMethods: string[];
  refundPolicy: string;
}

const PaymentSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.payment_settings_reducer.settings);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: settings || {
      stripePublishableKey: '',
      stripeSecretKey: '',
      paymentExpirationDays: 30,
      allowPartialPayments: false,
      enableAutomaticReminders: true,
      reminderFrequencyDays: 7,
      lateFeePercentage: 5,
      maxLateFeeAmount: 50,
      currency: 'USD',
      paymentMethods: ['credit_card', 'debit_card'],
      refundPolicy: 'Refunds are processed within 7 business days.',
    },
  });

  useEffect(() => {
    dispatch(getPaymentSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await dispatch(updatePaymentSettings(data)).unwrap();
      alert('Payment settings updated successfully');
    } catch (error) {
      alert('Failed to update payment settings');
    } finally {
      setIsLoading(false);
    }
  };

  const tabContent = {
    general: (
      <div className="space-y-4">
        <Controller
          name="currency"
          control={control}
          rules={{ required: 'Currency is required' }}
          render={({ field }) => (
            <Input
              helperText="Currency"
              icon={DollarSign as IconType}
              {...field}
              error={errors.currency?.message}
            />
          )}
        />
        <Controller
          name="paymentMethods"
          control={control}
          rules={{ required: 'At least one payment method is required' }}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Methods</label>
              <div className="space-y-2">
                {['credit_card', 'debit_card', 'bank_transfer', 'paypal'].map((method) => (
                  <label key={method} className="flex items-center">
                    <Checkbox

                    color='primary'
                    label={''}
                    checked={(field.value ?? []).includes(method)}
                    
                    //   checked={field.value.includes(method)}
                      onChange={(e) => {
                        const updatedMethods = e.target.checked
                          ? [...field.value, method]
                          : field.value.filter((v) => v !== method);
                        field.onChange(updatedMethods);
                      }}
                    //   className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
                    />
                    {method.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                ))}
              </div>
              {errors.paymentMethods && <p className="mt-1 text-sm text-red-600">{errors.paymentMethods.message}</p>}
            </div>
          )}
        />
        <Controller
          name="paymentExpirationDays"
          control={control}
          rules={{ 
            required: 'Payment expiration is required',
            min: { value: 1, message: 'Payment expiration must be at least 1 day' }
          }}
          render={({ field }) => (
            <Input
              helperText="Payment Expiration (Days)"
              type="number"
              {...field}
              error={errors.paymentExpirationDays?.message}
            />
          )}
        />
        <Controller
          name="allowPartialPayments"
          control={control}
          render={({ field }) => (
            <div className="flex items-center">
              <Checkbox
                label={'Allow Partial Payments'}
                color='primary'
                checked={field.value}
                {...field}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
              />
              <label htmlFor="allowPartialPayments" className="text-sm text-gray-900">
                Allow Partial Payments
              </label>
            </div>
          )}
        />
        <Controller
          name="refundPolicy"
          control={control}
          rules={{ required: 'Refund policy is required' }}
          render={({ field }) => (
            <Input
              helperText="Refund Policy"
              type="textarea"
              icon={DollarSign as IconType}
              {...field}
              error={errors.refundPolicy?.message}
            />
          )}
        />
      </div>
    ),
    stripe: (
      <div className="space-y-6">
        <Controller
          name="stripePublishableKey"
          control={control}
          rules={{ required: 'Stripe Publishable Key is required' }}
          render={({ field }) => (
            <Input
              helperText="Stripe Publishable Key"
              icon={Key as IconType}
              {...field}
              error={errors.stripePublishableKey?.message}
            />
          )}
        />
        <Controller
          name="stripeSecretKey"
          control={control}
          rules={{ required: 'Stripe Secret Key is required' }}
          render={({ field }) => (
            <Input
              helperText="Stripe Secret Key"
              type="password"
              icon={Key as IconType}
              {...field}
              error={errors.stripeSecretKey?.message}
            />
          )}
        />
      </div>
    ),
    reminders: (
      <div className="space-y-6">
        <Controller
          name="enableAutomaticReminders"
          control={control}
          render={({ field }) => (
            <div className="flex items-center">
              <Checkbox
                color='primary'
                checked={field.value}
                label="enableAutomaticReminders"
                {...field}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
              />
              <label htmlFor="enableAutomaticReminders" className="text-sm text-gray-900">
                Enable Automatic Reminders
              </label>
            </div>
          )}
        />
        <Controller
          name="reminderFrequencyDays"
          control={control}
          rules={{ 
            required: 'Reminder frequency is required',
            min: { value: 1, message: 'Reminder frequency must be at least 1 day' }
          }}
          render={({ field }) => (
            <Input
              helperText="Reminder Frequency (Days)"
              type="number"
              icon={Bell as IconType}
              {...field}
              error={errors.reminderFrequencyDays?.message}
            />
          )}
        />
        <Controller
          name="lateFeePercentage"
          control={control}
          rules={{ 
            required: 'Late fee percentage is required',
            min: { value: 0, message: 'Late fee percentage cannot be negative' }
          }}
          render={({ field }) => (
            <Input
              helperText="Late Fee Percentage"
              type="number"
              icon={Percent as IconType}
              step="0.01"
              {...field}
              error={errors.lateFeePercentage?.message}
            />
          )}
        />
        <Controller
          name="maxLateFeeAmount"
          control={control}
          rules={{ 
            required: 'Maximum late fee amount is required',
            min: { value: 0, message: 'Maximum late fee amount cannot be negative' }
          }}
          render={({ field }) => (
            <Input
              helperText="Maximum Late Fee Amount"
              type="number"
              icon={DollarSign as IconType}
              step="0.01"
              {...field}
              error={errors.maxLateFeeAmount?.message}
            />
          )}
        />
      </div>
    ),
  };

  return (
    <div className="container mx-auto min-h-screen">
      <DisabledWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm rounded overflow-hidden"
      >
        <Card
            title='Payment Settings'
        >
          <div className="mb-6">
            <div className="flex border-b">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {tabContent[activeTab as keyof typeof tabContent]}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="inline-block w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="inline-block w-4 h-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
      </DisabledWrapper>
    </div>
  );
};

export default PaymentSettings;

