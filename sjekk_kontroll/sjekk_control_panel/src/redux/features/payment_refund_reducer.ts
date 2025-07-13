import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";
import { Payment } from "./payment-dashboard-reducer";

enum Currency {
    NOK = 'nok',
    USD = 'usd',
}

interface Refund {
    id: number;
    charge_id: string;
    stripe_refund_id: string;
    payment_intent_id: string;
    refund_amount: number;
    currency: Currency;
    kid_number: string;
    payment_id?: number;
    requested_at: string
    payment?: Payment;
}

interface PaymentRefundState {
    refunds: Refund[]

    loading: boolean
    error: string | null
}

const initialState: PaymentRefundState = {
    refunds: [],

    loading: false,
    error: null
}

export const getPaymentRefunds = createAsyncThunk(
    'payment_refunds/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payments/refunds`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createPaymentRefund = createAsyncThunk(
    'payment_refunds/create',
    async (payment_id: number) => {
        try{
            const response = await axiosHttp.post(`payments/${payment_id}/refunds`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const cancelPaymentRefund = createAsyncThunk(
    'payment_refunds/cancel',
    async (id: number) => {
        try{
            const response = await axiosHttp.delete(`payments/refunds/${id}`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const paymentRefundSlice = createSlice({
    name: 'paymentRefund',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentRefunds.pending, (state) => {
                state.loading = true
            })
            .addCase(getPaymentRefunds.fulfilled, (state, action) => {
                state.loading = false
                state.refunds = action.payload
            })
            .addCase(getPaymentRefunds.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to get payment refunds'
            })

            .addCase(createPaymentRefund.pending, (state) => {
                state.loading = true
            })
            .addCase(createPaymentRefund.fulfilled, (state, action) => {
                state.loading = false
                state.refunds.push(action.payload)
            })
            .addCase(createPaymentRefund.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to create payment refund'
            })

            .addCase(cancelPaymentRefund.pending, (state) => {
                state.loading = true
            })
            .addCase(cancelPaymentRefund.fulfilled, (state, action) => {
                state.loading = false
                state.refunds = state.refunds.filter(refund => refund.id !== action.payload.id)
            })
            .addCase(cancelPaymentRefund.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to cancel payment refund'
            })
    }
})

export default paymentRefundSlice.reducer