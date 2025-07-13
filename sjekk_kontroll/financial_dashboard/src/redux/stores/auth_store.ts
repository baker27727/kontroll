// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type AuthState from '../../interfaces/states/auth_state';
import type LoginPayload from '../../interfaces/payloads/login_payload';
import axiosClient from '../../utils/axios_client';
import ApiError from '../../interfaces/ApiError';
import type { AxiosError } from 'axios';
import { getAuthenticationToken, provideAuthenticationToken, saveManager } from '../../utils/authentication';
import type Manager from '../../interfaces/Manager';

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    manager: null,
    loading: false,
    error: null,
    status_code: null
};

export const loginManager = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayload) => {
        try{
            const response = await axiosClient.post('managers/login', payload)
            provideAuthenticationToken(response.data.token, true)
            saveManager(response.data.manager as Manager, true)

            console.log(response.data);
            
            return response.data


        }catch(error){
            console.log(error);
            
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const verifyManagerToken = createAsyncThunk(
    'auth/verify',
    async () => {
        try{
            const token = getAuthenticationToken()
            const response = await axiosClient.post('managers/verify-token', {
                token
            })
            
            return response.data

        }catch(error){
            console.log(error);
            
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginManager.pending, (state) => {
        state.loading = true        
    })      

    builder.addCase(loginManager.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.isAuthenticated = true
        state.token = action.payload.token
        state.manager = action.payload.manager

        console.log(action.payload);
        
    })

    builder.addCase(loginManager.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = null
        state.error = action.error.message as string
    })

    builder.addCase(verifyManagerToken.pending, (state) => {
        state.loading = true
    })

    builder.addCase(verifyManagerToken.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.isAuthenticated = true
    })

    builder.addCase(verifyManagerToken.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = null
        state.error = action.error.message as string
    })
  }
});

export default authSlice.reducer;
