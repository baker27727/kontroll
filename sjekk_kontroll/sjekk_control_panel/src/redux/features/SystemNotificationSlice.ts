import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../configs/constants"
import ApiInterface from "../../interfaces/shared/ApiInterface"

export interface SystemNotification {
    title: string
    body: string | null
    image: string | null
    icon: string | null
    is_favorite: boolean
    id: number
}

interface SystemNotificationSlice extends ApiInterface {
    notifications: SystemNotification[]
}

const initialState: SystemNotificationSlice = {
    notifications: [],
    status_code: null,
    loading: false,
    error: null
}

export const getSystemNotifications = createAsyncThunk('systemNotification/get', async () => {
    try {
        const response = await axios.get(`${baseUrl}/system-notification-components`);
        return {
            status_code: response.status,
            notifications: response.data
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const storeSystemNotification = createAsyncThunk('systemNotification/store', async (data: FormData) => {
    try {

        const response = await axios.post(`${baseUrl}/system-notification-components`, data);
        return {
            status_code: response.status,
            notification: response.data
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const SystemNotificationSlice = createSlice({
    name: 'systemNotification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSystemNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
        })

        builder.addCase(storeSystemNotification.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.notifications.push(action.payload.notification as SystemNotification)
        })

        builder.addCase(storeSystemNotification.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        builder.addCase(getSystemNotifications.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        builder.addCase(getSystemNotifications.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(storeSystemNotification.pending, (state) => {
            state.loading = true
            state.error = null
        })
    }
})

export default SystemNotificationSlice.reducer