import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOUtletName',
})
export class TrimOUtletNamePipe implements PipeTransform {
  transform(title: string, outletName: string): string {
    return title.replace(` - ${outletName}`, '');
  }
}
