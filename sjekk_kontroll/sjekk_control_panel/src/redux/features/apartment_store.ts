import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ApiInterface from "../../interfaces/ApiInterface"
import ResidentialQuarter from "../../interfaces/ResidentialQuarter"
import { AxiosError } from "axios"
import ApiError from "../../interfaces/ApiError"
import axiosHttp from "../../utils/axios_client"

export interface Apartment {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
    residential_quarter_id: number
    residential_quarter: ResidentialQuarter
}

interface ApartmentStoreState extends ApiInterface {
    apartments: Apartment[]
}

const initial_state: ApartmentStoreState = {
    apartments: [],
    loading: false,
    error: null
}

export const getApartments = createAsyncThunk(
    'apartments/get',
    async () => {
        try{
            const response = await axiosHttp.get(`apartments`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const apartmentSlice = createSlice({
    name: 'apartments',
    initialState: initial_state,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApartments.fulfilled, (state, action) => {
            state.loading = false
            state.apartments = action.payload
        })
        builder.addCase(getApartments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getApartments.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default apartmentSlice.reducer