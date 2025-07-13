// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import clientAuthReducer from './features/client_auth';
import paymentReducer from './features/payment_feature';

const rootReducer = combineReducers({
    client_auth: clientAuthReducer,
    payment_feature: paymentReducer
});

export default rootReducer;
