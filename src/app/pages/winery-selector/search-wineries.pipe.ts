import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchWineries'
})
export class SearchWineriesPipe implements PipeTransform {


  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}