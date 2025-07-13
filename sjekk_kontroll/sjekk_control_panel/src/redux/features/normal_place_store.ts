import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NormalPlaceState from "../../interfaces/states/NormalPlaceState";
import axios, { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import NormalPlace from "../../interfaces/NormalPlace";
import { baseUrl } from "../../configs/constants";

const initial_state: NormalPlaceState = {
    normal_places: [],
    error: null,
    loading: false
}

export const getNormalPlaces = createAsyncThunk(
    'normal-places/get',
    async () => {
        try{
            const response = await axios.get(`${baseUrl}/normal-places`)
            return response.data as Array<NormalPlace>
        }catch(error) {
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createNormalPlace = createAsyncThunk(
    'normal-places/create',
    async (data: {
        location: string
        code: string
        policy: string
        partner_id: number
    }) => {
        try{
            const response = await axios.post(`${baseUrl}/normal-places`, data)
            return response.data as NormalPlace
        }catch(error) {
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const updateNormalPlace = createAsyncThunk('normal-places/update', async (data: {
    id: number
    payload: {
        location: string
        code: string,
        policy: string
        partner_id: number
    }
}) => {
    try {
      const response = await axios.put(`${baseUrl}/normal-places/${data.id}`, data.payload);
      return {
          status_code: response.status,
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  

const NormalPlaceSlice = createSlice({
    name: 'normal-places-store',
    initialState: initial_state,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNormalPlaces.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getNormalPlaces.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.normal_places = action.payload
        })


        builder.addCase(getNormalPlaces.rejected,(state,action) => {
            state.error = action.error.message as string
            state.loading = false
        })




        builder.addCase(createNormalPlace.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createNormalPlace.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.normal_places.push(action.payload)
        })


        builder.addCase(createNormalPlace.rejected,(state,action) => {
            state.error = action.error.message as string
            state.loading = false
        })

        builder.addCase(updateNormalPlace.fulfilled, (state) => {
            state.loading = false
            state.error = null
        })


        builder.addCase(updateNormalPlace.rejected,(state,action) => {
            state.error = action.error.message as string
            state.loading = false
        })

        builder.addCase(updateNormalPlace.pending, (state) => {
            state.loading = true
        })
    }
})

export default NormalPlaceSlice.reducer