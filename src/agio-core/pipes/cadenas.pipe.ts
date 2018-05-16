import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})

export class ElipsisPipe implements PipeTransform {
  transform(value: any, maxlen: number): any {
    return (!maxlen || !value || value.length < maxlen || value.length < 4) ? value : (value.substr(0, maxlen - 3) + '...');
  }
}

// Cada vez que se cree un Pipe de tipo cadena se introduce en el array manualmente
export const CADENAS_PIPES = [ ElipsisPipe ];
