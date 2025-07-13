import { combineReducers } from '@reduxjs/toolkit';
import auth_store from './stores/auth_store';
import notification_store from './stores/notification_store';
import sanction_store from './stores/sanction_store';
import manager_store from './stores/manager_store';
import manager_login_store from './stores/manager_login_store';
import statistics_store from './stores/statistics_store';
import report_store from './stores/report_store';



const rootReducer = combineReducers({
    auth_store: auth_store,
    notification_store: notification_store,
    sanction_store: sanction_store,
    manager_store: manager_store,
    manager_login_store: manager_login_store,
    statistics_store: statistics_store,
    report_store: report_store
});

export default rootReducer;
