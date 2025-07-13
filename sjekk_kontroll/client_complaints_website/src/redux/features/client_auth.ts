import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClientLoginForm from "../../interfaces/ClientLoginForm";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../configs/constants";
import Ticket from "../../interfaces/Ticket";

interface ClientAuthState{
    loading: boolean
    error: string | null,
    ticket: Ticket | null
}

export const loginClient = createAsyncThunk('client/login',async (params: ClientLoginForm) => {
    try{
        const response = await axios.post(`${baseUrl}/clients/login`, params)
        return response.data as Ticket
    }catch(err){
        throw ((err as AxiosError).response.data as {error: string}).error
    }
})

const initialState: ClientAuthState = {
    loading: false,
    error: null,
    ticket: null
}


const clientAuthSlice = createSlice({
    name: 'client-login',
    initialState,
    reducers: {
        logoutClient: (state) => {
            state.ticket = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginClient.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(loginClient.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(loginClient.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

            state.ticket = action.payload
        })
    }
})


export default clientAuthSlice.reducer;

export const { logoutClient } = clientAuthSlice.actions