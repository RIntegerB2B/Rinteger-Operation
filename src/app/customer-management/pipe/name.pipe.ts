import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from '../../shared/customer.model';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: Customer[], searchText: any, type: any): Customer[] {
    if (!value || !searchText) {
      return value;
              } else {
                if (type === 'Email ID') {
                  return value.filter(data => data.emailId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
                } else if (type === 'MobileNumber') {
                  /* return value.filter(data => data.mobileNumber.indexOf(searchText) !== -1); */
                } else if (type === 'Name') {
                  return value.filter(data => data.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
                } else if (type === 'City') {
                  return value.filter(data => data.city.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
                }
              }
  }

}
