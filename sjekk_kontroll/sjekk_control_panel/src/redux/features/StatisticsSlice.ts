import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatisticsState from "../../interfaces/states/StatisticsState";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../configs/constants";

export const getStatistics = createAsyncThunk('counts/getStatistics', async () => {
    try{
        const response = await axios.get(`${baseUrl}/statistics`)
        
        const data = {
            ...response.data,
            status_code: response.status
        } as StatisticsState
        
        return data
    }catch(error){
        throw (error as AxiosError).response.status
    }
})

const initialState: StatisticsState = {
    usersCount: 0,
    rulesCount: 0,
    placesCount: 0,
    brandsCount: 0,
    colorsCount: 0,
    carsCount: 0,
    typesCount: 0,
    violationsCount: 0,
    partnersCount: 0,

    loading: false,
    error: null,
    status_code: null
}


const StatisticsSlice = createSlice({
    name: 'Statistics',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getStatistics.fulfilled, (state,action) => {
            state.error = null
            state.status_code = action.payload.status_code
            state.brandsCount = action.payload.brandsCount
            state.carsCount = action.payload.carsCount
            state.typesCount = action.payload.typesCount
            state.usersCount = action.payload.usersCount
            state.colorsCount = action.payload.colorsCount
            state.placesCount = action.payload.placesCount
            state.rulesCount = action.payload.rulesCount
            state.violationsCount = action.payload.violationsCount
            state.partnersCount = action.payload.partnersCount
        })
        builder.addCase(getStatistics.rejected, (state,action) => {
            state.error = action.error.message
        })
        builder.addCase(getStatistics.pending, (state) => {
            state.loading = true
            state.error = null
        })
    }
})

export default StatisticsSlice.reducer