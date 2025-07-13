import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sidebarOpen: false
}

const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },

        closeSidebar: (state) => {
            state.sidebarOpen = false;
        },

        openSidebar: (state) => {
            state.sidebarOpen = true;
        },
    }
})

export default SidebarSlice.reducer
export const { toggleSidebar, openSidebar, closeSidebar } = SidebarSlice.actions