export class Customer {
    _id?: string;
    customerID?: string;
    mobileNumber?: number;
    name?: string;
    emailId?: string;
    location?: String;
    city?: string;
    state?: string;
    pincode?: string;
    companyName?: string;
    companyAddress?: string;
    gstNumber?: string;
    brandName?: string;
    showDetail: boolean;
    constructor(
        /*  customerID?: string, */
        mobileNumber?: number,
        name?: string,
        emailId?: string,
        location?: string,
        city?: string,
        state?: string,
        pincode?: string,
        companyName?: string,
        companyAddress?: string,
        gstNumber?: string,
        brandName?: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.emailId = emailId;
        this.location = location;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.gstNumber = gstNumber;
        this.brandName = brandName;
    }
}
