// src/redux/features/ParkingProviderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../../configs/constants';
import CreatePartnerPayload from '../../interfaces/payloads/CreatePartnerPayload';
import CreatePartnerLinkPayload from '../../interfaces/payloads/CreatePartnerLinkPayload';
import ApiError from '../../interfaces/ApiError';

const initialState = {
    partners: [],
    isLoading: false,
    error: null,
};

export const getPartners = createAsyncThunk(
    'parkingProvider/get-partners',
    async () => {
        const response = await axios.get(`${baseUrl}/partners`);
        return response.data;
    }
);

export const createPartner = createAsyncThunk(
    'parkingProvider/create-partner',
    async (data : CreatePartnerPayload) => {
        try{
            const response = await axios.post(`${baseUrl}/partners`,data);
            return response.data;
        }catch(err){
            const axios_error = (err as AxiosError).response.data
            throw axios_error['error']
        }
    }
);

export const updatePartner = createAsyncThunk(
    'parkingProvider/update-partner',
    async (payload : {
        data: {name: string, phone_number: string},
        id: number
    }) => {
        try{
            const response = await axios.put(`${baseUrl}/partners/${payload.id}`,payload.data);
            return response.data;
        }catch(err){
            throw ApiError.from(err as AxiosError)
        }
    }
)

export const createPartnerLink = createAsyncThunk(
    'parkingProvider/create-partner-link',
    async (data : CreatePartnerLinkPayload) => {
        try{
            const response = await axios.post(`${baseUrl}/partners/${data.id}/dashboard`,{
                access_code: data.access_code,
                access_username: data.access_username
            });
            return response.data;
        }catch(err){
            const axios_error = (err as AxiosError).response.data
            throw axios_error['error']
        }
    }
);

export const deletePartner = createAsyncThunk(
    'parkingProvider/delete-partner',
    async (providerId: number) => {
        try{
            await axios.delete(`${baseUrl}/partners/${providerId}`);
            return providerId;
        }catch(error){
            const axios_error = (error as AxiosError).response.data
            throw axios_error['error']
        }
    }
);

const parkingProviderSlice = createSlice({
    name: 'parkingProvider',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPartners.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPartners.fulfilled, (state, action) => {
            state.error = null
            state.isLoading = false;
            state.partners = action.payload;
        });
        builder.addCase(getPartners.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        builder.addCase(createPartner.fulfilled, (state, action) => {
            state.partners.push(action.payload);
        });
        builder.addCase(createPartner.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(createPartner.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePartner.fulfilled, (state, action) => {
            state.partners = state.partners.filter(provider => provider.id !== action.payload);
        });
        builder.addCase(deletePartner.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(deletePartner.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createPartnerLink.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;

            
        });
        builder.addCase(createPartnerLink.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(createPartnerLink.pending, (state) => {
            state.isLoading = true;
        });
    },
});

export default parkingProviderSlice.reducer;
