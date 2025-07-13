import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './featuers/notification_store';
import authSlice from './featuers/auth_store';
import registered_cars_store from './featuers/registered_cars_store';
import notification_management_store from './featuers/notification_management_store'


const rootReducer = combineReducers({
    notification_store: notification_store,
    auth_store: authSlice,
    registered_cars_store: registered_cars_store,
    notification_management_store: notification_management_store
});

export default rootReducer;
