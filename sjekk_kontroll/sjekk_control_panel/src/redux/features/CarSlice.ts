// src/redux/cars/carSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import Car from '../../interfaces/Car';
import CarState from '../../interfaces/states/CarState';
import UpdateCarPayload from '../../interfaces/payloads/UpdateCarPayload';
import ApiError from '../../interfaces/ApiError';

const initialState: CarState = {
  cars: [],
  currentCar: null,
  error: null,
  loading: false,
  status_code: null,
};

export const getAllCars = createAsyncThunk('car/fetchCars', async () => {
  try {
    const response = await axios.get(`${baseUrl}/cars`);
    return {
      status_code: response.status,
      cars: response.data as Car[],
    } as CarState;
  } catch (error) {
    const response = (error as AxiosError).response
    console.log(response.status);
    throw response.data;
  }
});

export const updateCar = createAsyncThunk('car/update', async (data: UpdateCarPayload) => {
  try {
    const response = await axios.put(`${baseUrl}/cars/${data.id}`, data.payload);
    return {
      status_code: response.status,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteCar = createAsyncThunk('car/delete', async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/cars/${id}`);
    return {
      status_code: response.status,
      id
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const registerCar = createAsyncThunk('car/create', async (data: object) => {
  try {
    const response = await axios.post(`${baseUrl}/cars`, data);
    return {
      status_code: response.status,
    };
  } catch (error) {
    throw ApiError.from(error as AxiosError);
  }
});

const CarSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCurrentCar(state, action) {
      state.currentCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCars.fulfilled, (state, action: PayloadAction<CarState>) => {
      state.cars = action.payload.cars;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllCars.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCars.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // update car logic
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(updateCar.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCar.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // delete car logic
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.cars = state.cars.filter((car) => car.id !== action.payload.id);
    });

    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCar.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // create car logic
    builder.addCase(registerCar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(registerCar.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerCar.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export const { setCurrentCar } = CarSlice.actions;
export default CarSlice.reducer;
