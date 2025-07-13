import { combineReducers } from '@reduxjs/toolkit';
import auth_store from './stores/auth_store';
import sanction_store from './stores/registered_cars_store';
import notification_store from './stores/notification_store';
import registered_cars_store from './stores/registered_cars_store';
import statistics_store from './stores/statistics_store';
import apartment_requests_store from './stores/apartment_requests_store';
import apartments_store from './stores/apartments_store';
import notification_management_store from './stores/notification_management_store'



const rootReducer = combineReducers({
    auth_store: auth_store,
    sanction_store: sanction_store,
    notification_store: notification_store,
    registered_cars_store: registered_cars_store,
    statistics_store: statistics_store,
    apartment_requests_store: apartment_requests_store,
    apartments_store: apartments_store,
    notification_management_store: notification_management_store
});

export default rootReducer;
