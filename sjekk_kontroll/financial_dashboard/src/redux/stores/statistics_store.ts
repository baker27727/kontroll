import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DashboardState from "../../interfaces/states/dashboard_state";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosClient from "../../utils/axios_client";

const initialState: DashboardState = {
    total_sanctions: 0,
    total_unpaid_sanctions: 0,
    total_paid_sanctions: 0,
    total_deleted_sanctions: 0,
    loading: false,
    error: null,
    status_code: null,
    paid_sanctions_chart_data: [],
    not_paid_sanctions_chart_data: []
}

export const getStatistics = createAsyncThunk(
    'statistics/get',
    async () => {
        try{
            const response = await axiosClient.get('statistics')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const getSanctionChartData = createAsyncThunk(
    'statistics/get_sanction_chart_data',
    async () => {
        try{
            const response = await axiosClient.get('statistics/sanctions-chart')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getStatistics.pending, (state) => {
            state.loading = true
        })
        .addCase(getStatistics.fulfilled, (state, action) => {
            state.loading = false
            state.total_sanctions = action.payload.total_sanctions
            state.total_unpaid_sanctions = action.payload.total_unpaid_sanctions
            state.total_paid_sanctions = action.payload.total_paid_sanctions
            state.total_deleted_sanctions = action.payload.total_deleted_sanctions
        })
        .addCase(getStatistics.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder
        .addCase(getSanctionChartData.pending, (state) => {
            state.loading = true
        })
        .addCase(getSanctionChartData.fulfilled, (state, action) => {
            state.loading = false
            state.paid_sanctions_chart_data = action.payload.paid_sanctions_chart_data
            state.not_paid_sanctions_chart_data = action.payload.not_paid_sanctions_chart_data
        })
        .addCase(getSanctionChartData.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default statisticsSlice.reducer