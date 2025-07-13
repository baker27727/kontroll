// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import complaintsReducer from './features/complaints_reducer';
import deleteComplaintReducer  from './features/delete_complaint';
import complaintsCountReducer  from './features/get_complaints_count';

const rootReducer = combineReducers({
    complaints: complaintsReducer,
    complaints_count: complaintsCountReducer,
    deleteComplaint: deleteComplaintReducer,
});

export default rootReducer;
