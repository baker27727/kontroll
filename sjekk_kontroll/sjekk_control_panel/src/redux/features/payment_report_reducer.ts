import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

interface PaymentReportMetadata {}

export interface PaymentReport {
    id: number;
    report_name: string;
    created_at: string;
    report_path: string;
    metadata: PaymentReportMetadata;
}

interface GeneratePaymentReportPayload {}


interface PaymentReportState {
    reports: PaymentReport[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentReportState = {
    reports: [],
    loading: false,
    error: null,
};

export const getPaymentReports = createAsyncThunk(
    'payment_reports/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payment-reports`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const generatePaymentReport = createAsyncThunk(
    'payment_reports/create',
    async (data: GeneratePaymentReportPayload) => {
        try{
            const response = await axiosHttp.post(`payment-reports`, data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const paymentReportSlice = createSlice({
    name: 'payment_reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPaymentReports.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPaymentReports.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = action.payload;
        });
        builder.addCase(getPaymentReports.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(generatePaymentReport.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(generatePaymentReport.fulfilled, (state, action) => {
            state.loading = false;
            state.reports.push(action.payload);
        });
        builder.addCase(generatePaymentReport.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default paymentReportSlice.reducer;