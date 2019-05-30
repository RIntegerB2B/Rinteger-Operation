import { Detail } from './detail.model';
export class Invoice {
    invoiceID: string;
    customerID: string;
    leadID: string;
    requirements: [Detail];
    workOrderID: string;
    date: Date;
    expiryDate: Date;
    allTotal: number;
    subTotal: number;
    tax: number;
    /* constructor(
        customerID: string,
        leadID: string,
        requirements: [Detail],
        workOrderID: string,
        date: Date,
        expiryDate: Date,
        allTotal: number,
        subTotal: number,
        tax?: number,
    ) {
        this.customerID = customerID;
        this.leadID = leadID;
        this.invoiceID = invoiceID;
        this.requirements = requirements;
        this.workOrderID = workOrderID;
        this.date = date;
        this.expiryDate = expiryDate;
        this.allTotal = allTotal;
        this.subTotal = subTotal;
        this.tax = tax;
    } */
}
