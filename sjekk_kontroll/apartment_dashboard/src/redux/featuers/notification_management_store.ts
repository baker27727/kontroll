import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosHttp from "../../utils/axios_client"
import ApiInterface from "../../interfaces/ApiInterface"

interface Notification {
    id: number
    title: string,
    body: string
    icon: string
    image: string
}

interface NotificationManagementState extends ApiInterface {
    notifications: Array<Notification>
}

const initialState: NotificationManagementState = {
    notifications: [],
    loading: false,
    error: null,
    status_code: null
}

export const getApartmentNotification = createAsyncThunk(
    "notification_management_store/get_apartment_notifications",
    async (id: number) => {
        try {
            const response = await axiosHttp.get(`apartments/${id}/notifications`);
            console.log(response.data);
            
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

const notificationManagementSlice = createSlice({
    name: "notification_management_store",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApartmentNotification.fulfilled, (state, action) => {
            state.notifications = action.payload;
        })

        builder.addCase(getApartmentNotification.rejected, (state, action) => {
            state.error = action.error.message;
        })

        builder.addCase(getApartmentNotification.pending, (state) => {
            state.loading = true;
        })
    }
})

export default notificationManagementSlice.reducer