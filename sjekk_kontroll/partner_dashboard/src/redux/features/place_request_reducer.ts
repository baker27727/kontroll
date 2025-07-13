// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios, { AxiosError } from 'axios';
import PlaceRequestState from '../../interfaces/states/PlaceRequestState';
import CreatePlaceRequestPayload from '../../interfaces/payloads/CreatePlaceRequest';
import ApiError from '../../interfaces/ApiError';

const initialState: PlaceRequestState = {
  error: null,
  loading: false,
  status_code: null,
  requests: []
};

export const getAllPlaceRequests = createAsyncThunk('partners/places_creation_requests', async (partner_id: number) => {
    try {
      const response = await axios.get(`${baseUrl}/place-requests/partner/${partner_id}`);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
        throw ApiError.from(error as AxiosError);
    }
  });


export const deletePlaceRequest = createAsyncThunk('partners/place_creation_request_deletion', async (request_id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/place-requests/${request_id}`);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
});

export const createPlaceRequest = createAsyncThunk('partners/place_creation_request', async (payload: CreatePlaceRequestPayload) => {
    try {
      const response = await axios.post(`${baseUrl}/place-requests`, payload);
      return {
          status_code: response.status,
          data: response.data
      }
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
});

const PlaceRequestSlice = createSlice({
  name: 'place_request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(getAllPlaceRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.requests = action.payload.data
    });

    builder.addCase(getAllPlaceRequests.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPlaceRequests.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    builder.addCase(deletePlaceRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(deletePlaceRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePlaceRequest.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default PlaceRequestSlice.reducer;
