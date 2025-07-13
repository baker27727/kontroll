// src/redux/cars/carSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ApiError from '../../interfaces/ApiError';
import ResidentialCarState from '../../interfaces/states/ResidentialCarState';
import axiosHttp from '../../utils/axios_client';
import ResidentialCar from '../../interfaces/ResidentialCar';

const initialState: ResidentialCarState = {
  cars: [],
  currentCar: null,
  error: null,
  loading: false,
  status_code: null,
};

export const getRegisteredCars = createAsyncThunk(
    'registered_cars/get',
    async () => {
        try{
            const response = await axiosHttp.get(`residential-cars`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createResidentialCar = createAsyncThunk(
    'registered_cars/create',
    async (data: {
        plate_number: string,
        parking_type: 'reserved' | 'guest',
        subscription_plan_days: number,
        residential_quarter_id: number,
        country: { name: string, code: string }
    }) => {
        try{
            const response = await axiosHttp.post('residential-cars', data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteRegisteredCar = createAsyncThunk(
    'registered_cars/delete',
    async (id: number) => {
        try{
            await axiosHttp.delete(`residential-cars/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const CarSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCurrentCar(state, action) {
      state.currentCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisteredCars.fulfilled, (state, action) => {
        state.cars = action.payload as ResidentialCar[] || [];
        state.loading = false;
        state.error = null;
        state.status_code = action.payload.status_code;
      })
      .addCase(getRegisteredCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegisteredCars.rejected, (state, action) => {
        state.error = action.error.message ?? '';
        state.loading = false;
      })
      .addCase(createResidentialCar.fulfilled, (state, action) => {
        state.cars = [...state.cars, action.payload];
        state.loading = false;
        state.error = null;
        state.status_code = action.payload.status_code;
      })
      .addCase(createResidentialCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(createResidentialCar.rejected, (state, action) => {
        state.error = action.error.message ?? '';
        state.loading = false;
      });


    builder.addCase(deleteRegisteredCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
      state.loading = false;
      state.error = null;
      state.status_code = 200;
    })
      .addCase(deleteRegisteredCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRegisteredCar.rejected, (state, action) => {
        state.error = action.error.message ?? '';
        state.loading = false;
      });
  },
});

export const { setCurrentCar } = CarSlice.actions;
export default CarSlice.reducer;
