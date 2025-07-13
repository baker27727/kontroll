import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ReportState from "../../interfaces/states/report_state";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosClient from "../../utils/axios_client";
import FinanceReport from "../../interfaces/Report";

const initialState: ReportState = {
    reports: [],
    total_revenue: 0,
    loading: false,
    error: null,
    status_code: null
}

export const getReports = createAsyncThunk(
    'reports/get',
    async () => {
        try{
            const response = await axiosClient.get('reports')
            return response.data as FinanceReport[]
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface CreateReportPayload {
    report_title: string
    start_date: string
    end_date: string
}

export const generateReport = createAsyncThunk(
    'reports/generate',
    async (payload: CreateReportPayload) => {
        try{
            const response = await axiosClient.post('reports', payload)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const getTotalRevenue = createAsyncThunk(
    'reports/get_total_revenue',
    async () => {
        try{
            const response = await axiosClient.get('reports/total-revenue')
            
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const reportSlice = createSlice({
    name: 'reports',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReports.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getReports.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.reports = action.payload
        })

        builder.addCase(getReports.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(generateReport.pending, (state) => {
            state.loading = true
        })

        builder.addCase(generateReport.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.status_code = 200
            state.reports.push(action.payload)
        })

        builder.addCase(generateReport.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(getTotalRevenue.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getTotalRevenue.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.total_revenue = action.payload
        })

        builder.addCase(getTotalRevenue.rejected, (state) => {
            state.loading = false
        })
    }
})

export default reportSlice.reducer