import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(value:string){
    if(value.length>7){
      return value.substr(0,7)+"..."
    }
    return value;
  }

}
