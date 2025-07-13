// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import DashboardState from '../../interfaces/states/DashboardState';
import ApiError from '../../interfaces/ApiError';

const initialState: DashboardState = {
  error: null,
  loading: false,
  status_code: null,
  registered_cars: []
};

export const registerNewCar = createAsyncThunk('place/car-registeration', async (payload:{
  data: {
    plate_number: string
  },
  id: string

}) => {
    try {
      const response = await axios.post(`${apiUrl}/places/dashboards/${payload.id}/cars`, payload.data);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  });

export const getAllPlaceRegisteredCars = createAsyncThunk('place/all-car-registered', async (id: number) => {
    try {
      const response = await axios.get(`${apiUrl}/places/dashboards/${id}/cars`);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });


const PlaceSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerNewCar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.registered_cars.push(action.payload.data)
    });

    builder.addCase(registerNewCar.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerNewCar.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    builder.addCase(getAllPlaceRegisteredCars.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.registered_cars = action.payload.data
    });

    builder.addCase(getAllPlaceRegisteredCars.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPlaceRegisteredCars.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default PlaceSlice.reducer;
