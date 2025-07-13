const Routes = Object.freeze({
    HOME: '/',
    LOGIN: '/login',
    SANCTIONS: '/sanctions',
    ATTACHMENTS: '/attachments',
    STATISTICS: '/statistics',
    REPORTS: '/reports',
    ACCOUNTING: '/accounting',

    MANAGERS: '/managers',
    CREATE_MANAGER: '/managers/create',
    MANAGER_LOGINS: '/managers/:id/logins',
    MANAGER_EDIT: '/managers/:id/edit',

    DELETED_SANCTIONS: '/sanctions/deleted',
    SANCTION_DETAILS: '/sanctions/:id/details',

    PAYMENT_DASHBOARD: '/parksync/payments',
});

export default Routes;
