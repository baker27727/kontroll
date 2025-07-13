// src/redux/cars/carSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import CarLogState from '../../interfaces/states/CarLogState';
import CarLog from '../../interfaces/CarLog';

const initialState: CarLogState = {
  logs: [],
  error: null,
  loading: false,
  status_code: null,
};

export const getAllCarLogs = createAsyncThunk('car/logs', async () => {
  try {
    const response = await axios.get(`${baseUrl}/car-logs`);
    return {
      status_code: response.status,
      logs: response.data as CarLog[],
    } as CarLogState;
  } catch (error) {
    const response = (error as AxiosError).response
    console.log(response.status);
    throw response.data;
  }
});



const CarLogSlice = createSlice({
  name: 'car-logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCarLogs.fulfilled, (state, action: PayloadAction<CarLogState>) => {
      state.logs = action.payload.logs;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllCarLogs.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCarLogs.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default CarLogSlice.reducer;
