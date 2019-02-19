import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Quotation } from './../../shared/quotation.model';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { Detail } from './../../shared/detail.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-generate-pdf',
  templateUrl: './invoice-generate-pdf.component.html',
  styleUrls: ['./invoice-generate-pdf.component.css']
})
export class InvoiceGeneratePdfComponent implements OnInit {
  @Input() quotationDetails: any;
  @Input() customer: any;
  @Input() companyDetails: any;
  noRequirementError = false;
  singleInvoiceDetailsForm: FormGroup;
  arrayNew;
  quotationReq: Detail[];
  quotation: Quotation[];
  workOrderPdf: WorkOrderPdf[];
  customerData;
  companyData;
  TypesOfTerms = ['Production Terms', 'Digital Marketing Terms'];
  templates = ['With Discount + GST', 'Without Discount + GST'];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.singleInvoiceDetailsForm = this.fb.group({
      termsType: [''],
    });
  }

  newValue() {
    const newTestArray = [];
    const headerArray = [{ text: 'Item', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Price', style: 'tableHeaderRow' }, { text: 'Discount (%)', style: 'tableHeaderRow' },
    { text: 'Total', style: 'tableHeaderTotal' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.quotationReq.length; i++) {
      newTestArray.push([{ text: this.quotationReq[i].item, style: 'rowStyle' }, { text: this.quotationReq[i].quantity, style: 'rowStyle' },
      { text: this.quotationReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.quotationReq[i].discount, style: 'rowStyle' },
      { text: this.quotationReq[i].total.toFixed(2), style: 'rowTotal' }]);
    }
    return newTestArray;
  }

  discountNull() {
    const newTestArray = [];
    const headerArray = [{ text: 'Item', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Price', style: 'tableHeaderRow' },
    { text: 'Total', style: 'tableHeaderTotal' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.quotationReq.length; i++) {
      newTestArray.push([{ text: this.quotationReq[i].item, style: 'rowStyle' }, { text: this.quotationReq[i].quantity, style: 'rowStyle' },
      { text: this.quotationReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.quotationReq[i].total.toFixed(2), style: 'rowTotal' }]);
    }
    return newTestArray;
  }


  viewSingleQuotationPdf(work, customer, company, temp) {
    this.quotation = work;
    this.quotationReq = work[0].requirements;
    this.customerData = customer;
    this.companyData = company;
    this.workOrderPdf = company;
    if (temp === 'With Discount + GST') {
      this.pdfWithDiscountandProduct();
    } else if (temp === 'With Discount + GST') {
      this.pdfWithDiscountDigtalTerms();
    } else if (temp === 'Without Discount + GST') {
      this.pdfWithoutDiscountTerms();
    } else if (temp === 'Without Discount + GST') {
      this.pdfWithoutDiscountDigtalTerms();
    }
  }
  pdfWithDiscountDigtalTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | ' +
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          stack: [
            { text: 'This is a subheader', style: 'subheader' },
            {
              image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/AABEIADIAMgMBIgACEQEDEQH/xAB5AAEAAwEBAQEAAAAAAAAAAAAABggJBwMKBBAAAAUCBAEJBwUBAAAAAAAAAQIDBAUABgcREhMIFBghMTI3QXWxCRUjVleTlRc2UYGy1AEBAQEAAAAAAAAAAAAAAAAAAAIBEQEBAQADAAAAAAAAAAAAAAAAARECMkH/2gAMAwEAAhEDEQA/ANPbmuu2bLjfeE9LMotpukTFy6VKknrP2S6jeI1z3nAYJ/UG2fyCVcW46u44/n8Z6nrIFpCTcgjvNIx+5S1CXcRaqqlzDrDUQohRUmt5+cBgn9QbZ/IJVMLRxBsa+BdhbdxRkuLPQLjkbgq21uZ6denqzyr533jF/HqAk8auGxxDMCLJHSMIfyAHAK0F4CEJ1dW/fdj9m0yLFbm+0O51dK2WWlVKheORqHSoqDW+xH9wxH4hT/qrzt6XuE9xTUPKuWTnkbSPXSWbtjtxydboGKYplFc8tqiUupSlBT7jq7jj+fxnqeq4cHt1X8ewMU4OAcqnXjYYXkI2TSTExX7rc6S6u0JhIXoNVj+OruOP5/Gep6rFwlWney2HOLknDsnYGlYAWUQ5RVKmdR6iCuZEzagEpyicKKnVIsRpXEJ1wzXIGNqKCU+pMtQtYHBEE3pxKJBVHQh4AGdfs9nwUp/1HJ4GSigH+9+o9Gtr/wAQ+EW+I6YB7NTNuXZkQXSoLOGybPbUcBuHHqTDXUi9nqbvFN4bUSOf3qN8r34ZcK7XgeJ7FNJoZ/osxZBKIBR2c+kr0h01dzPt1fGJ7xLm8phP9Oqplw4XlaUnxR43izm49wE66YnihTXIcHpUAOZUUMu3oq5sT3iXN5TCf6dURE3pSlBT7jq7jj+fxnqesjoy67shW3JoyclmKGsT7LZ6sgTUbrNpTMAZjX0K3bZVrX5EDFXHFNJRiKya2w4LqJrT7JsujpDOuZc2PAb5AgfsDRUskYaN7muho3dN281KIouzqHcpJu1iEWMoGRzKFKbI4m8RHrq9vAa/lGJ7+KzhlpIFSRYKARZFLQHxuveEtXd5seA3yBA/YGpvZeF9gYci8NbFvsIkXu3yjkyejd2s9Grp8NVC2WOa25h7Z1oSyExAYNR0XIoAcEnbY8ekqQFC6DZGKfxAa6JbLabWuadln8YaOSdM41BEh10ljmFsKwnMO0JgAPihlU6pRJSlKBSlKBSlKBSlKBSlKD//2Q==',
              width: 100
            }
          ],
          style: 'header'
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + this.quotation[0].date, style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: this.newValue()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [[{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
            { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'Amount', style: 'rowStyle' },
            { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].digitalterms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }

  pdfWithDiscountandProduct() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | ' +
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          stack: [
            { text: 'This is a subheader', style: 'subheader' },
            {
              image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/AABEIADIAMgMBIgACEQEDEQH/xAB5AAEAAwEBAQEAAAAAAAAAAAAABggJBwMKBBAAAAUCBAEJBwUBAAAAAAAAAQIDBAUABgcREhMIFBghMTI3QXWxCRUjVleTlRc2UYGy1AEBAQEAAAAAAAAAAAAAAAAAAAIBEQEBAQADAAAAAAAAAAAAAAAAARECMkH/2gAMAwEAAhEDEQA/ANPbmuu2bLjfeE9LMotpukTFy6VKknrP2S6jeI1z3nAYJ/UG2fyCVcW46u44/n8Z6nrIFpCTcgjvNIx+5S1CXcRaqqlzDrDUQohRUmt5+cBgn9QbZ/IJVMLRxBsa+BdhbdxRkuLPQLjkbgq21uZ6denqzyr533jF/HqAk8auGxxDMCLJHSMIfyAHAK0F4CEJ1dW/fdj9m0yLFbm+0O51dK2WWlVKheORqHSoqDW+xH9wxH4hT/qrzt6XuE9xTUPKuWTnkbSPXSWbtjtxydboGKYplFc8tqiUupSlBT7jq7jj+fxnqeq4cHt1X8ewMU4OAcqnXjYYXkI2TSTExX7rc6S6u0JhIXoNVj+OruOP5/Gep6rFwlWney2HOLknDsnYGlYAWUQ5RVKmdR6iCuZEzagEpyicKKnVIsRpXEJ1wzXIGNqKCU+pMtQtYHBEE3pxKJBVHQh4AGdfs9nwUp/1HJ4GSigH+9+o9Gtr/wAQ+EW+I6YB7NTNuXZkQXSoLOGybPbUcBuHHqTDXUi9nqbvFN4bUSOf3qN8r34ZcK7XgeJ7FNJoZ/osxZBKIBR2c+kr0h01dzPt1fGJ7xLm8phP9Oqplw4XlaUnxR43izm49wE66YnihTXIcHpUAOZUUMu3oq5sT3iXN5TCf6dURE3pSlBT7jq7jj+fxnqesjoy67shW3JoyclmKGsT7LZ6sgTUbrNpTMAZjX0K3bZVrX5EDFXHFNJRiKya2w4LqJrT7JsujpDOuZc2PAb5AgfsDRUskYaN7muho3dN281KIouzqHcpJu1iEWMoGRzKFKbI4m8RHrq9vAa/lGJ7+KzhlpIFSRYKARZFLQHxuveEtXd5seA3yBA/YGpvZeF9gYci8NbFvsIkXu3yjkyejd2s9Grp8NVC2WOa25h7Z1oSyExAYNR0XIoAcEnbY8ekqQFC6DZGKfxAa6JbLabWuadln8YaOSdM41BEh10ljmFsKwnMO0JgAPihlU6pRJSlKBSlKBSlKBSlKBSlKD//2Q==',
              width: 100
            }
          ],
          style: 'header'
        },
        {
          columns: [
            {
              type: 'none',
              width: 325,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 325,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + this.quotation[0].date, style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: this.newValue()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [[{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
            { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'Amount', style: 'rowStyle' },
            { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].terms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }

  pdfWithoutDiscountTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | ' +
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          stack: [
            { text: 'This is a subheader', style: 'subheader' },
            {
              image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/AABEIADIAMgMBIgACEQEDEQH/xAB5AAEAAwEBAQEAAAAAAAAAAAAABggJBwMKBBAAAAUCBAEJBwUBAAAAAAAAAQIDBAUABgcREhMIFBghMTI3QXWxCRUjVleTlRc2UYGy1AEBAQEAAAAAAAAAAAAAAAAAAAIBEQEBAQADAAAAAAAAAAAAAAAAARECMkH/2gAMAwEAAhEDEQA/ANPbmuu2bLjfeE9LMotpukTFy6VKknrP2S6jeI1z3nAYJ/UG2fyCVcW46u44/n8Z6nrIFpCTcgjvNIx+5S1CXcRaqqlzDrDUQohRUmt5+cBgn9QbZ/IJVMLRxBsa+BdhbdxRkuLPQLjkbgq21uZ6denqzyr533jF/HqAk8auGxxDMCLJHSMIfyAHAK0F4CEJ1dW/fdj9m0yLFbm+0O51dK2WWlVKheORqHSoqDW+xH9wxH4hT/qrzt6XuE9xTUPKuWTnkbSPXSWbtjtxydboGKYplFc8tqiUupSlBT7jq7jj+fxnqeq4cHt1X8ewMU4OAcqnXjYYXkI2TSTExX7rc6S6u0JhIXoNVj+OruOP5/Gep6rFwlWney2HOLknDsnYGlYAWUQ5RVKmdR6iCuZEzagEpyicKKnVIsRpXEJ1wzXIGNqKCU+pMtQtYHBEE3pxKJBVHQh4AGdfs9nwUp/1HJ4GSigH+9+o9Gtr/wAQ+EW+I6YB7NTNuXZkQXSoLOGybPbUcBuHHqTDXUi9nqbvFN4bUSOf3qN8r34ZcK7XgeJ7FNJoZ/osxZBKIBR2c+kr0h01dzPt1fGJ7xLm8phP9Oqplw4XlaUnxR43izm49wE66YnihTXIcHpUAOZUUMu3oq5sT3iXN5TCf6dURE3pSlBT7jq7jj+fxnqesjoy67shW3JoyclmKGsT7LZ6sgTUbrNpTMAZjX0K3bZVrX5EDFXHFNJRiKya2w4LqJrT7JsujpDOuZc2PAb5AgfsDRUskYaN7muho3dN281KIouzqHcpJu1iEWMoGRzKFKbI4m8RHrq9vAa/lGJ7+KzhlpIFSRYKARZFLQHxuveEtXd5seA3yBA/YGpvZeF9gYci8NbFvsIkXu3yjkyejd2s9Grp8NVC2WOa25h7Z1oSyExAYNR0XIoAcEnbY8ekqQFC6DZGKfxAa6JbLabWuadln8YaOSdM41BEh10ljmFsKwnMO0JgAPihlU6pRJSlKBSlKBSlKBSlKBSlKD//2Q==',
              width: 100
            }
          ],
          style: 'header'
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + this.quotation[0].date, style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: this.discountNull()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [[
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
              { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].terms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);

  }

  /* pdf with discount digital */
  pdfWithoutDiscountDigtalTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | ' +
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          stack: [
            { text: 'This is a subheader', style: 'subheader' },
            {
              image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/AABEIADIAMgMBIgACEQEDEQH/xAB5AAEAAwEBAQEAAAAAAAAAAAAABggJBwMKBBAAAAUCBAEJBwUBAAAAAAAAAQIDBAUABgcREhMIFBghMTI3QXWxCRUjVleTlRc2UYGy1AEBAQEAAAAAAAAAAAAAAAAAAAIBEQEBAQADAAAAAAAAAAAAAAAAARECMkH/2gAMAwEAAhEDEQA/ANPbmuu2bLjfeE9LMotpukTFy6VKknrP2S6jeI1z3nAYJ/UG2fyCVcW46u44/n8Z6nrIFpCTcgjvNIx+5S1CXcRaqqlzDrDUQohRUmt5+cBgn9QbZ/IJVMLRxBsa+BdhbdxRkuLPQLjkbgq21uZ6denqzyr533jF/HqAk8auGxxDMCLJHSMIfyAHAK0F4CEJ1dW/fdj9m0yLFbm+0O51dK2WWlVKheORqHSoqDW+xH9wxH4hT/qrzt6XuE9xTUPKuWTnkbSPXSWbtjtxydboGKYplFc8tqiUupSlBT7jq7jj+fxnqeq4cHt1X8ewMU4OAcqnXjYYXkI2TSTExX7rc6S6u0JhIXoNVj+OruOP5/Gep6rFwlWney2HOLknDsnYGlYAWUQ5RVKmdR6iCuZEzagEpyicKKnVIsRpXEJ1wzXIGNqKCU+pMtQtYHBEE3pxKJBVHQh4AGdfs9nwUp/1HJ4GSigH+9+o9Gtr/wAQ+EW+I6YB7NTNuXZkQXSoLOGybPbUcBuHHqTDXUi9nqbvFN4bUSOf3qN8r34ZcK7XgeJ7FNJoZ/osxZBKIBR2c+kr0h01dzPt1fGJ7xLm8phP9Oqplw4XlaUnxR43izm49wE66YnihTXIcHpUAOZUUMu3oq5sT3iXN5TCf6dURE3pSlBT7jq7jj+fxnqesjoy67shW3JoyclmKGsT7LZ6sgTUbrNpTMAZjX0K3bZVrX5EDFXHFNJRiKya2w4LqJrT7JsujpDOuZc2PAb5AgfsDRUskYaN7muho3dN281KIouzqHcpJu1iEWMoGRzKFKbI4m8RHrq9vAa/lGJ7+KzhlpIFSRYKARZFLQHxuveEtXd5seA3yBA/YGpvZeF9gYci8NbFvsIkXu3yjkyejd2s9Grp8NVC2WOa25h7Z1oSyExAYNR0XIoAcEnbY8ekqQFC6DZGKfxAa6JbLabWuadln8YaOSdM41BEh10ljmFsKwnMO0JgAPihlU6pRJSlKBSlKBSlKBSlKBSlKD//2Q==',
              width: 100
            }
          ],
          style: 'header'
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'Quotation Details', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + this.quotation[0].date, style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: this.discountNull()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [[
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
              { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].digitalterms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }
}
