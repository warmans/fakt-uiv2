import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Pipe({name: 'shorten'})
export class ShortenText implements PipeTransform {
  constructor(){}

  transform(text: string, maxLen: number): any {
      if (text.length <= maxLen) {
        return text;
      }
      return text.slice(0, maxLen) + '...';
  }
}
