import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SanctionState from "../../interfaces/states/sanction_state";
import axiosClient from "../../utils/axios_client";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";

const initialState: SanctionState = {
    sanctions: [],
    loading: false,
    error: null,
    status_code: null,
    deleted_sanctions: [],
    selected_sanction: null
}

export const getSanctions = createAsyncThunk(
    'sanctions/get',
    async () => {
        try{
            const response = await axiosClient.get('sanctions')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const getDeletedSanctions = createAsyncThunk(
    'sanctions/get_deleted',
    async () => {
        try{
            const response = await axiosClient.get('sanctions/deleted')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteSanction = createAsyncThunk(
    'sanctions/delete',
    async (id: number) => {
        try{
            await axiosClient.delete(`sanctions/${id}`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const markSanctionAsPaid = createAsyncThunk(
    'sanctions/mark_as_paid',
    async (id: number) => {
        try{
            await axiosClient.post(`sanctions/${id}/payment`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const sendSanctionToDebtCollect = createAsyncThunk(
    'sanctions/send_to_debt_collect',
    async (id: number) => {
        try{
            await axiosClient.post(`sanctions/${id}/debt-collect`)
            return id
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const sanctionSlice = createSlice({
    name: 'sanctions',
    initialState: initialState,
    reducers: {
        pushSanction: (state, action) => {
            state.sanctions.push(action.payload)
        },

        removeSanction: (state, action) => {
            state.sanctions = state.sanctions.filter(sanction => sanction.id !== action.payload)
        },

        setCurrentSanction: (state, action) => {
            state.selected_sanction = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSanctions.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getSanctions.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.sanctions = action.payload
        })

        builder.addCase(getSanctions.rejected, (state) => {
            state.loading = false
        })


        builder.addCase(deleteSanction.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(deleteSanction.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

            state.sanctions = state.sanctions.filter(sanction => sanction.id !== action.payload)
        })

        builder.addCase(deleteSanction.rejected, (state) => {
            state.loading = false
        })


        builder.addCase(getDeletedSanctions.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getDeletedSanctions.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.deleted_sanctions = action.payload
        })

        builder.addCase(getDeletedSanctions.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(sendSanctionToDebtCollect.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(sendSanctionToDebtCollect.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

            state.sanctions = state.sanctions.map(sanction => {
                if (sanction.id === action.payload) {
                    return {
                        ...sanction,
                        status: 'sent_to_debt_collect'
                    }
                }
                return sanction
            })
        })

        builder.addCase(sendSanctionToDebtCollect.rejected, (state) => {
            state.loading = false
        })


        builder.addCase(markSanctionAsPaid.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(markSanctionAsPaid.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

            state.sanctions = state.sanctions.map(sanction => {
                if (sanction.id === action.payload) {
                    return {
                        ...sanction,
                        status: 'paid'
                    }
                }
                return sanction
            })
        })

        builder.addCase(markSanctionAsPaid.rejected, (state) => {
            state.loading = false
        })
    }
})

export default sanctionSlice.reducer

export const { pushSanction, removeSanction, setCurrentSanction } = sanctionSlice.actions