import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ManagerLoginState from "../../interfaces/states/manager_login_state";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosClient from "../../utils/axios_client";

const initialState: ManagerLoginState = {
    logins: [],
    loading: false,
    error: null,
    status_code: null
}

export const getManagerLogins = createAsyncThunk(
    'manager_login/get',
    async (id: number) => {
        try{
            const response = await axiosClient.get(`managers/${id}/logins`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const managerLoginSlice = createSlice({
    name: 'manager_login',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getManagerLogins.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getManagerLogins.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.logins = action.payload
        })

        builder.addCase(getManagerLogins.rejected, (state) => {
            state.loading = false
        })
    }
})

export default managerLoginSlice.reducer
