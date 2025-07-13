import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import axiosHttp from "../../utils/axios_client"

interface StripeBalanceState {
    available: {
        amount: number
        currency: string
        source_types: {
            card: number
        }
    }[]
    connect_reserved: {
        amount: number
        currency: string
    }[]
    livemode: boolean
    pending: {
        amount: number
        currency: string
        source_types: {
            card: number
        }
    }[]
    loading: boolean
    error: string | null
}

const initialState: StripeBalanceState = {
    available: [],
    connect_reserved: [],
    livemode: false,
    pending: [],
    loading: false,
    error: null
}

export const getStripeBalance = createAsyncThunk(
    'stripe_balance/get',
    async () => {
        try{
            const response = await axiosHttp.get(`payments/balance`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const stripeBalanceSlice = createSlice({
    name: 'stripeBalance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStripeBalance.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getStripeBalance.fulfilled, (state, action) => {
            state.loading = false
            state.available = action.payload.available
            state.connect_reserved = action.payload.connect_reserved
            state.livemode = action.payload.livemode
            state.pending = action.payload.pending
        })
        builder.addCase(getStripeBalance.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default stripeBalanceSlice.reducer