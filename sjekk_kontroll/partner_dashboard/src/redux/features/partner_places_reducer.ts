// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import ControlledPlacesState from '../../interfaces/states/ControlledPlacesState';
import ApiError from '../../interfaces/ApiError';

const initialState: ControlledPlacesState = {
  error: null,
  loading: false,
  status_code: null,
  places: []
};

export interface CreatePlacePayload{
  place_creation_details:{
    location: string
    policy: string
    code: string
  },}

export interface DeletePlacePayload{
  requested_place_id: number
}


export const getAllPartnerPlaces = createAsyncThunk('partners/places', async (partner_id: number) => {
    try {
      const response = await axios.get(`${baseUrl}/partners/${partner_id}/places`);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  });

const PlaceSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // generate profile link
    builder.addCase(getAllPartnerPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.places = action.payload.data
    });

    builder.addCase(getAllPartnerPlaces.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPartnerPlaces.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default PlaceSlice.reducer;
