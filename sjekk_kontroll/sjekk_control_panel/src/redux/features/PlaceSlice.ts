// src/redux/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../configs/constants';
import axios from 'axios';
import PlaceState from '../../interfaces/states/PlaceState';
import Place from '../../interfaces/Place';
import UpdatePlacePayload from '../../interfaces/payloads/UpdatePlacePayload';
import CreatePlacePayload from '../../interfaces/payloads/CreatePlacePayload';

const initialState: PlaceState = {
  places: [],
  currentPlace: null,
  error: null,
  loading: false,
  status_code: null,
};

export const getAllPlaces = createAsyncThunk('places/getAll', async () => {
  try {
    const response = await axios.get(`${baseUrl}/places`);
    return {
      status_code: response.status,
      places: response.data as Place[],
    } as PlaceState;
  } catch (error) {
    console.error(error);
    throw error;
  }
});



export const updatePlace = createAsyncThunk('place/update', async (data: UpdatePlacePayload) => {
  try {
    const response = await axios.put(`${baseUrl}/places/${data.id}`, data.payload);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deletePlace = createAsyncThunk('place/delete', async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/places/${id}`);
    return {
        status_code: response.status,
        id
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createPlace = createAsyncThunk('place/create', async (data: CreatePlacePayload) => {
  try {
    const response = await axios.post(`${baseUrl}/places`, data);
    return {
        status_code: response.status,
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});





const PlaceSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentPlace (state,action) {
        state.currentPlace = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPlaces.fulfilled, (state, action: PayloadAction<PlaceState>) => {
      state.places = action.payload.places;
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(getAllPlaces.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPlaces.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });
    //update user logic
    builder.addCase(updatePlace.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(updatePlace.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updatePlace.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // delete user logic
    builder.addCase(deletePlace.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
      state.places = state.places.filter(place => place.id !== action.payload.id)
    });

    builder.addCase(deletePlace.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePlace.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

    // create user logic
    builder.addCase(createPlace.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status_code = action.payload.status_code;
    });

    builder.addCase(createPlace.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createPlace.rejected, (state, action) => {
      state.error = action.error.message ?? '';
      state.loading = false;
    });

  },
});

export const {setCurrentPlace} = PlaceSlice.actions
export default PlaceSlice.reducer;
