import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Violation from "../../interfaces/Violation";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

export interface CardHolderDetails {
    id: number;
    full_name: string;
    card_number: string;
    email: string;
    payment_id?: number;
    payment?: Payment;
}

export enum PaymentMethod {
    card = 'card',
    apple_pay = 'apple_pay',
    google_pay = 'google_pay'
}

export enum PaymentStatus {
    idle = 'idle',
    canceled = 'canceled',
    refunded = 'refunded',
    completed = 'completed',
    overdue = 'overdue'
}

export interface Refund {
    id: number;
    payment_id?: number;
    payment?: Payment;
}

export interface Payment {
    id: number;
    violation_id: number;
    kid_number: string;
    required_amount: number;
    status: PaymentStatus;
    init_date: string;
    refund?: Refund;
    plate_number: string;
    control_number: string;
    sanction_id?: number;
    sanction?: Violation;
    metadata?: PaymentMetadata;
}

export interface PaymentMetadata {
    id: number;
    charge_id: string;
    payment_intent_id: string;
    payment_id?: number;
    payment?: Payment;
    receipt_link?: string;
    currency: string;
    payment_method?: PaymentMethod;
    paid_at?: string;
    card_holder_details?: CardHolderDetails;
}



interface PaymentDashboardState {
    payments: Payment[]
    current_payment?: Payment
    dashboard: {
        payment_methods: Array<{
            date: string;
            value: number
        }>,

        revenue_overview: Array<{
            date: string;
            value: number
        }>,

        statistics: {
            overdued_payments: number;
            idle_payments: number;
            completed_payments: number;
            failed_payments: number;

            total_payments: number;
            total_revenue: number;
            total_refunds: number;
        }
    }
    is_dashboard_loading: boolean;
    is_payments_loading: boolean;
    is_current_payment_loading: boolean
    error: string | null;
}

const initialState: PaymentDashboardState = {
    is_dashboard_loading: false,
    is_payments_loading: false,
    is_current_payment_loading: false,
    error: null,
    payments: [],
    dashboard: {
        payment_methods: [],
        revenue_overview: [],
        statistics: {
            overdued_payments: 0,
            idle_payments: 0,
            completed_payments: 0,
            failed_payments: 0,
            total_payments: 0,
            total_revenue: 0,
            total_refunds: 0,
        }
    }
}

export const getPayments = createAsyncThunk(
    'payments/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payments`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const getPayment = createAsyncThunk(
    'payment/get',
    async (id: number) => {
        try{
            const response = await axiosHttp.get(`payments/${id}`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


export const getPaymentDashboardStatistics = createAsyncThunk(
    'payment-dashboard/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payments/dashboard-data`)
            console.log(response.data);
            
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const paymentDashboardSlice = createSlice({
    name: 'paymentDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPayments.fulfilled, (state, action) => {
            state.payments = action.payload
            state.is_payments_loading = false
            state.error = null
        })
        builder.addCase(getPaymentDashboardStatistics.fulfilled, (state, action) => {
            state.dashboard.statistics = action.payload.statistics
            state.dashboard.payment_methods = action.payload.payment_methods
            state.dashboard.revenue_overview = action.payload.revenue_overview
            state.is_dashboard_loading = false
        })

        builder.addCase(getPayments.pending, (state) => {
            state.is_payments_loading = true
        })


        builder.addCase(getPaymentDashboardStatistics.pending, (state) => {
            state.is_dashboard_loading = true
        })

        builder.addCase(getPayments.rejected, (state, action) => {
            state.is_payments_loading = false
            state.error = action.error.message
        })

        builder.addCase(getPaymentDashboardStatistics.rejected, (state, action) => {
            state.is_dashboard_loading = false
            state.error = action.error.message
        })

        builder.addCase(getPayment.pending, (state) => {
            state.is_current_payment_loading = true
        })

        builder.addCase(getPayment.fulfilled, (state, action) => {
            state.current_payment = action.payload
            state.is_current_payment_loading = false
            state.error = null
        })

        builder.addCase(getPayment.rejected, (state, action) => {
            state.is_current_payment_loading = false
            state.error = action.error.message
        })


    }
})

export default paymentDashboardSlice.reducer