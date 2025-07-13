import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import axiosClient from "../../utils/axios_client"

interface Apartment {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
}

interface ApartmentState {
    apartments: Apartment[]
    loading: boolean
    error: string | null
    status_code: number | null
}

const initialState: ApartmentState = {
    apartments: [],
    loading: false,
    error: null,
    status_code: null
}

export const getApartments = createAsyncThunk(
    'apartments/get',
    async (id: number) => {
        try{
            const response = await axiosClient.get(`residential-quarters/${id}/apartments`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const apartmentSlice = createSlice({
    name: 'apartments',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApartments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getApartments.fulfilled, (state, action) => {
            state.loading = false
            state.apartments = action.payload
        })
        builder.addCase(getApartments.rejected, (state) => {
            state.loading = false
        })
    }
})

export default apartmentSlice.reducer