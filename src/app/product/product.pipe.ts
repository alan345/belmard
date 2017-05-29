import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'smallDescription'})
export class SmallDescriptionPipe implements PipeTransform {
  transform(description: string): string {
    //description = description.replace(/<\/?[^>]+(>|$)/g, "");
    return description.substring(0, 90) + '...'
  }
}
