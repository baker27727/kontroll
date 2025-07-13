import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axios_client";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import RegisteredCarState from "../../interfaces/RegisteredCarState";

const initialState: RegisteredCarState = {
    residential_cars: [],
    loading: false,
    error: null,
    status_code: null
}

export const getRegisteredCars = createAsyncThunk(
    'registered_cars/get',
    async (id: number) => {
        try{
            const response = await axiosClient.get(`residential-quarters/apartments/${id}/residential-cars`)
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
        parking_type: 'reserved' | 'guest' | 'apartment',
        subscription_plan_days: number,
        residential_quarter_id: number,
        apartment_id: number,
        country: {
            name: string,
            code: string
        }
    }) => {
        try{
            const response = await axiosClient.post('residential-cars', data)
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
            await axiosClient.delete(`residential-cars/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const registeredCarSlice = createSlice({
    name: 'registered_cars',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRegisteredCars.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getRegisteredCars.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.residential_cars = action.payload
        })

        builder.addCase(getRegisteredCars.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })

        builder.addCase(createResidentialCar.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createResidentialCar.fulfilled, (state) => {
            state.loading = false
            state.error = null
        })

        builder.addCase(createResidentialCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })

        builder.addCase(deleteRegisteredCar.pending, (state) => {
            state.loading = true
        })

        builder.addCase(deleteRegisteredCar.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.residential_cars = state.residential_cars.filter(car => car.id !== action.payload)
        })

        builder.addCase(deleteRegisteredCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default registeredCarSlice.reducer