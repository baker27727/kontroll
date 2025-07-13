import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import DashboardState from "../../interfaces/states/dashboard_state";
import axiosClient from "../../utils/axios_client";

const initialState: DashboardState = {
    loading: false,
    error: null,
    status_code: null,
    guest_cars_count: 0,
    reserved_cars_count: 0,
    total_cars_count: 0
}

export const getStatistics = createAsyncThunk(
    'statistics/get',
    async (id: number) => {
        try{
            const response = await axiosClient.get(`residential-quarters/${id}/statistics`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatistics.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.guest_cars_count = action.payload.guest_cars_count
            state.reserved_cars_count = action.payload.reserved_cars_count
            state.total_cars_count = action.payload.total_cars_count
        })
        builder.addCase(getStatistics.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message as string
        })
    }
})

export default statisticsSlice.reducer