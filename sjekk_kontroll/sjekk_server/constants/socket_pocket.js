const SocketPocket = Object.freeze({
    EMITS: Object.freeze({
        NOTIFY_APP_WITH_CAR_REGISTRATION: 'notify_app_with_car_registration',
        NOTIFY_APP_WITH_CAR_REMOVAL: 'notify_app_with_car_removal',

        NOTIFY_RESIDENTIAL_QUARTER_WITH_CAR_EXPIRATION: 'notify_residential_quarter_with_car_expiration',
        NOTIFY_RESIDENTIAL_QUARTER_WITH_CAR_DELETION: 'notify_residential_quarter_with_car_deletion',

        NOTIFY_PUBLIC_PLACE_DASHBOARD_WITH_CAR_REGISTRATION: 'notify_public_place_dashboard_with_car_registration',
        NOTIFY_PUBLIC_PLACE_DASHBOARD_WITH_CAR_EXPIRATION: 'notify_public_place_dashboard_with_car_expiration',
        NOTIFY_PUBLIC_PLACE_DASHBOARD_WITH_CAR_REMOVAL: 'notify_public_place_dashboard_with_car_removal',

        NOTIFY_VIOLATION_CREATION: 'notify_violation_creation',
        NOTIFY_PAYMENT_INITIALIZATION: 'notify_payment_initialization',
        NOTIFY_PAYMENT_INTENT_SUCCEEDED: 'notify_payment_intent_succeeded',
        NOTIFY_CHARGE_IS_COLLECTED: 'notify_charge_is_collected',
    }),

    EVENTS: Object.freeze({})
});

export default SocketPocket;
