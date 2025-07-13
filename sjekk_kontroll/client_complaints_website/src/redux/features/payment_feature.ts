import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Ticket from "../../interfaces/Ticket";
import axios from "axios";
import { sjekkBaseUrl } from "../../configs/constants";

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
    completed = 'completed'
}

export interface Refund {
    id: number;
    payment_id?: number;
    payment?: Payment;
}

export interface Payment {
    id: number;
    violation_id: number;
    transaction_id: string;
    kid_number: string;
    card_holder_details?: CardHolderDetails;
    required_amount: number;
    payment_method?: PaymentMethod;
    status: PaymentStatus;
    init_date: string;
    paid_at?: string;
    refund?: Refund;
    plate_number: string;
    control_number: string;
    sanction_id?: number;
    sanction?: Ticket;

    payment_intent_client_secret: string
}


interface PaymentState {
    loading: boolean;
    error: string | null;
    payment: Payment | null;
}

const initialState: PaymentState = {
    loading: false,
    error: null,
    payment: null
}

export const getPayment = createAsyncThunk(
    'payment/getPayment',
    async (id: number) => {
        const response = await axios.get(`${sjekkBaseUrl}/violations/${id}/payment`)
        console.log(response.data);
        
        return response.data
    }
)

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPayment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.payment = action.payload
            })
            .addCase(getPayment.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default paymentSlice.reducer