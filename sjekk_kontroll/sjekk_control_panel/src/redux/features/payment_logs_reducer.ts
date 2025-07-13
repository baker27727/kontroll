import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

export enum LogLevel {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical',
}


export interface PaymentLog {
    id: number;
    action: string;
    details: string;
    level: LogLevel;
    timestamp: string;
}

export interface PaymentLogsState {
    paymentLogs: PaymentLog[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentLogsState = {
    paymentLogs: [],
    loading: false,
    error: null
}

export const getPaymentLogs = createAsyncThunk(
    'payment_logs/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payments/logs`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


const paymentLogsSlice = createSlice({
    name: 'paymentLogs',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getPaymentLogs.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getPaymentLogs.fulfilled, (state, action) => {
            state.loading = false
            state.paymentLogs = action.payload
        })
        builder.addCase(getPaymentLogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
});

export default paymentLogsSlice.reducer