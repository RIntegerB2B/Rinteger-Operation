import { BankDetails } from './bankdetails.model';
import { CompanyDetails } from './companydetails.model';
import { FooterDetails } from './footerdetails.model';

export class WorkOrderPdf {
    gst: String;
    sgst: String;
    cgst: String;
    terms: String;
    digitalterms: String;
    bankdetails: BankDetails;
    companydetails: CompanyDetails;
    footerdetails: FooterDetails;
}
