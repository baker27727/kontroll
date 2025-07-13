// src/redux/cars/carSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import ReportState from '../../interfaces/states/ReportState';
import Report from '../../interfaces/Report';

const initialState: ReportState = {
  reports: [],
  error: null,
  loading: false,
  status_code: null,
};

export const getAllCarLogReports = createAsyncThunk('car/logs_reports', async () => {
  try {
    const response = await axios.get(`${baseUrl}/car-logs/reports`);
    return {
      status_code: response.status,
      reports: response.data as Report[],
    } as ReportState;
  } catch (error) {
    const response = (error as AxiosError).response
    console.log(response.status);
    throw response.data;
  }
});



const ReportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCarLogReports.fulfilled, (state, action: PayloadAction<ReportState>) => {
      state.reports = action.payload.reports;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllCarLogReports.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCarLogReports.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default ReportSlice.reducer;
