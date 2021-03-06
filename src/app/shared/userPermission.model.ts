export class UserPermission {
    _id: String;
    role: String;
    currentDate: Date;
    marketingRole: [{
        customerNav: Boolean,
        leadNav: Boolean,
        bookingNav: Boolean,
        quotationNav: Boolean,
        workOrderNav: Boolean,
        activitylogNav: Boolean,
        marketingNav: Boolean
    }];
    financialRole: [{
        incomeNav: Boolean,
        expenseNav: Boolean,
        invoiceNav: Boolean,
        profomaInvoiceNav: Boolean
    }];
    baseRole: [{
        ticketNav: Boolean,
        taskNav: Boolean,
        deletePermission: Boolean,
        smsPermission: Boolean,
        emailPermission: Boolean
    }];
    adminRole: [{
        settingNav: Boolean,
        uploadNav: Boolean
    }];
    materialRole: [{
        materialNav: Boolean,
        assetlistNav: Boolean
    }];
    workOrderRole: [{
        workOrderMenu: Boolean
    }];
    reportRole: [{
        taskReportNav: Boolean
    }];
}
