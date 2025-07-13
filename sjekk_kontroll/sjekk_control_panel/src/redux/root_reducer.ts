import { combineReducers } from '@reduxjs/toolkit';
import  UserReducer  from './features/UserSlice';
import  PlaceReducer  from './features/PlaceSlice';
import  RuleReducer  from './features/RuleSlice';
import  ViolationReducer  from './features/ViolationSlice';
import  CarReducer  from './features/CarSlice';
import  StatisticsReducer  from './features/StatisticsSlice';
import PartnerSlice from './features/PartnerSlice';
import PlaceProfileSlice from './features/PlaceDashboardSlice';
import CarLogSlice from './features/CarLogSlice';
import ReportSlice from './features/ReportSlice';
import PlaceRequestSlice from './features/PlaceRequestSlice';
import sidebar_reducer from './features/sidebar_reducer';
import normal_place_store from './features/normal_place_store';
import residential_place_store from './features/residential_place_store';
import notification_store from './features/notification_store';
import residential_car_store from './features/residential_car_store';
import system_notification_store from './features/SystemNotificationSlice';
import AuthSlice from './features/AuthSlice'
import notification_management_store from './features/notification_management_store'
import apartmentSlice from './features/apartment_store';

import payment_dashboard_reducer from './features/payment-dashboard-reducer';
import payment_reports_reducer from './features/payment_report_reducer';

import paymentSettingsSlice from './features/payment_settings_slice';

import stripeBalanceSlice from './features/stripe_balance_reducer'
import paymentRefundSlice from './features/payment_refund_reducer'
import paymentLogsSlice from './features/payment_logs_reducer'


const rootReducer = combineReducers({
    UserReducer: UserReducer,
    PlaceReducer: PlaceReducer,
    RuleReducer: RuleReducer,
    ViolationReducer: ViolationReducer,
    StatisticsReducer: StatisticsReducer,
    CarReducer: CarReducer,
    partnerProvider: PartnerSlice,
    placeProfiles: PlaceProfileSlice,
    carLogs: CarLogSlice,
    report_reducer: ReportSlice,
    place_request_state: PlaceRequestSlice,

    sidebar_reducer,
    normal_place_store: normal_place_store,
    residential_place_store: residential_place_store,
    notification_store: notification_store,
    residential_car_store: residential_car_store,
    system_notification_store: system_notification_store,
    auth_store: AuthSlice,
    notification_management_store: notification_management_store,
    apartmentSlice: apartmentSlice,
    payment_dashboard_reducer: payment_dashboard_reducer,
    payment_reports_reducer: payment_reports_reducer,
    payment_settings_reducer: paymentSettingsSlice,

    stripe_balance_reducer: stripeBalanceSlice,
    payment_refund_reducer: paymentRefundSlice,
    payment_logs_reducer: paymentLogsSlice
});

export default rootReducer;
