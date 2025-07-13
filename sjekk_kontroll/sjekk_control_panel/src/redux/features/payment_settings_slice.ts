import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface PaymentSettings {
  stripePublishableKey: string;
  stripeSecretKey: string;
  paymentExpirationDays: number;
  allowPartialPayments: boolean;
  enableAutomaticReminders: boolean;
  reminderFrequencyDays: number;
  lateFeePercentage: number;
  maxLateFeeAmount: number;
}

interface PaymentSettingsState {
  settings: PaymentSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentSettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const getPaymentSettings = createAsyncThunk(
  'paymentSettings/getSettings',
  async () => {
    return {
      stripePublishableKey: 'pk_test_123456789',
      stripeSecretKey: 'sk_test_123456789',
      paymentExpirationDays: 30,
      allowPartialPayments: false,
      enableAutomaticReminders: true,
      reminderFrequencyDays: 7,
      lateFeePercentage: 5,
      maxLateFeeAmount: 50,
    } as PaymentSettings;
  }
);

export const updatePaymentSettings = createAsyncThunk(
  'paymentSettings/updateSettings',
  async (settings: PaymentSettings) => {
    return settings;
  }
);

const paymentSettingsSlice = createSlice({
  name: 'paymentSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getPaymentSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePaymentSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updatePaymentSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default paymentSettingsSlice.reducer;

