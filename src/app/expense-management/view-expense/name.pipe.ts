import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../shared/expense.model';
@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(data:Expense[],search:string): Expense[] {
    if(!data){
      return [];
    }
    if(!data || !search){
      return data;
    }
    
    else{
      
      return data.filter(value=>
        value.name.toLowerCase().includes(search.toLowerCase()))
   }
    
  }

}
