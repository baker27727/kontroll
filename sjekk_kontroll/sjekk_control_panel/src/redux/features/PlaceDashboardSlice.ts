// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios from 'axios';
import CreatePlaceProfilePayload from '../../interfaces/payloads/CreatePlaceProfilePayload';
import PlaceDashboardState from '../../interfaces/states/PlaceProfileState';

const initialState: PlaceDashboardState = {
  error: null,
  loading: false,
  status_code: null,
  dashboards: []
};


export const deletePlaceDashboard = createAsyncThunk('place-profile/delete', async (data:{
  dashboard_id: number,
  place_id: number
}) => {
  try {
    const response = await axios.delete(`${baseUrl}/places/${data.place_id}/dashboards/${data.dashboard_id}`);
    return {
        status_code: response.status,
        dashboard_id: data.dashboard_id
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});



export const generatePlaceDashboard = createAsyncThunk('place/generate-profile-link', async (payload: CreatePlaceProfilePayload) => {
  try {
    const response = await axios.post(`${baseUrl}/places/${payload.id}/dashboards`, payload.data);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getAllPlaceProfiles = createAsyncThunk('place/profiles', async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/places/${id}/dashboards`);
    return {
        status_code: response.status,
        data: response.data
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const PlaceSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // generate profile link
    builder.addCase(generatePlaceDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(generatePlaceDashboard.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(generatePlaceDashboard.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    // get place profiles
    builder.addCase(getAllPlaceProfiles.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.dashboards = action.payload.data
    });

    builder.addCase(getAllPlaceProfiles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPlaceProfiles.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    //delete logic
    builder.addCase(deletePlaceDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;

      state.dashboards = state.dashboards.filter(dashboard => dashboard.id !== action.payload.dashboard_id)
    });

    builder.addCase(deletePlaceDashboard.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePlaceDashboard.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
  },
});

export default PlaceSlice.reducer;
