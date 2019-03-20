export class Expense {
    _id?: string;
   
    mobileNumber?: number;
    name?: string;
    companyName?: string;
    expenseType?: string;
    modeOfPayment?: String;
    location?: String;
    date?: Date;
    totalAmount?: number;
    paid?: number;
    balance?: number;
    vouNo?: string;
    expensesDescription?: string;
    
    constructor(
        /*  customerID?: string, */
        mobileNumber?: number,
        name?: string,
        companyName?: string,
        expenseType?: string,
        modeOfPayment?: String,
        location?: string,
        date?: Date,
        totalAmount?: number,
        paid?: number,
        balance?: number,
        vouNo?: string,
        expensesDescription?: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.companyName= companyName;        
        this.expenseType = expenseType;
        this.modeOfPayment = modeOfPayment;
        this.location = location;        
        this.date = date;
        this.totalAmount = totalAmount;
        this.paid = paid;
        this.balance = balance;
        this.vouNo = vouNo;
        this.expensesDescription = expensesDescription;
    }
}
