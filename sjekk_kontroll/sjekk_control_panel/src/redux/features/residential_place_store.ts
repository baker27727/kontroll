import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import { baseUrl } from "../../configs/constants";
import ResidentialPlaceState from "../../interfaces/states/residential_place_state";
import ResidentialQuarter from "../../interfaces/ResidentialQuarter";

const initial_state: ResidentialPlaceState = {
    residential_places: [],
    error: null,
    loading: false
}

export const getResidentialPlaces = createAsyncThunk(
    'residential-places/get',
    async () => {
        try{
            const response = await axios.get(`${baseUrl}/residential-quarters`)
            console.log(response.data);
            
            return response.data as Array<ResidentialQuarter>
        }catch(error) {
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createResidentialPlace = createAsyncThunk(
    'residential-places/create',
    async (data: {
        location: string
        code: string
        policy: string,
        max_cars_registrations: number,
        guest_parking_hours: number,
        max_cars_by_apartment: number,
        quarter_name: string
    }) => {
        try{
            const response = await axios.post(`${baseUrl}/residential-quarters`, data)
            return response.data as ResidentialQuarter
        }catch(error) {
            throw ApiError.from(error as AxiosError)
        }
    }
)

const ResidentialPlaceSlice = createSlice({
    name: 'normal-places-store',
    initialState: initial_state,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResidentialPlaces.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getResidentialPlaces.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.residential_places = action.payload
        })


        builder.addCase(getResidentialPlaces.rejected,(state,action) => {
            state.error = action.error.message as string
            state.loading = false
        })




        builder.addCase(createResidentialPlace.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createResidentialPlace.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.residential_places.push(action.payload)
        })


        builder.addCase(createResidentialPlace.rejected,(state,action) => {
            state.error = action.error.message as string
            state.loading = false
        })
    }
})

export default ResidentialPlaceSlice.reducer