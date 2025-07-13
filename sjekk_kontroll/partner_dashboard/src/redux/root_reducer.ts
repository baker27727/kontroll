// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import auth_reducer from './features/auth_reducer';
import place_request_reducer from './features/place_request_reducer';
import partner_places_reducer from './features/partner_places_reducer';
import notification_store from './features/notification_store';


const rootReducer = combineReducers({
    place_request_reducer,
    partner_places_reducer,
    notification_store,
    auth_reducer
});

export default rootReducer;
