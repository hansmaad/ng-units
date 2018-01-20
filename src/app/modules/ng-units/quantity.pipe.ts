import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngQuantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value + " unit";
  }

}
