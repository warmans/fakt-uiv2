import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Pipe({name: 'safestyle'})
export class SafeStyle implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){
    this.sanitizer = sanitizer;
  }

  transform(style: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
