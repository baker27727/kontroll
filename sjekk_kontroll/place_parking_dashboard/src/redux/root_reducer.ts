// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import place_login from './features/place_login';
import DashboardSlice from './features/DashboardSlice';
import auth_reducer from './features/auth_reducer';


const rootReducer = combineReducers({
    place_login_reducer: place_login,
    dashboard_state: DashboardSlice,
    auth_reducer
});

export default rootReducer;
