import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import axiosClient from "../../utils/axios_client"

interface ApartmentRequest {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
}

interface ApartmentRequestState {
    apartment_requests: ApartmentRequest[]
    loading: boolean
    error: string | null
    status_code: number | null
}

const initialState: ApartmentRequestState = {
    apartment_requests: [],
    loading: false,
    error: null,
    status_code: null
}

export const getApartmentRequests = createAsyncThunk(
    'apartment_requests/get',
    async (id: number) => {
        try{
            const response = await axiosClient.get(`residential-quarters/${id}/apartment-requests`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const acceptApartmentRequest = createAsyncThunk(
    'apartment_requests/accept',
    async (apartment_request_id: number) => {
        try{
            const response = await axiosClient.post(`apartment-requests/${apartment_request_id}/accept`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const rejectApartmentRequest = createAsyncThunk(
    'apartment_requests/reject',
    async (apartment_request_id: number) => {
        try{
            const response = await axiosClient.post(`apartment-requests/${apartment_request_id}/reject`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const apartmentRequestSlice = createSlice({
    name: 'apartment_requests',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApartmentRequests.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getApartmentRequests.fulfilled, (state, action) => {
            state.loading = false
            state.apartment_requests = action.payload
        })

        builder.addCase(getApartmentRequests.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(acceptApartmentRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(acceptApartmentRequest.fulfilled, (state, action) => {
            state.loading = false
            state.status_code = action.payload
        })

        builder.addCase(acceptApartmentRequest.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(rejectApartmentRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(rejectApartmentRequest.fulfilled, (state, action) => {
            state.loading = false
            state.status_code = action.payload
        })

        builder.addCase(rejectApartmentRequest.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default apartmentRequestSlice.reducer