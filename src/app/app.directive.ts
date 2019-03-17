import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[scrollDetector]'
})
export class AppDirective {

  constructor() {
  }

  @HostListener('scroll', ['$event']) onWindowScroll($event) {
    const test = window.pageYOffset || document.documentElement.scrollTop;
    console.log('scrolling...', test);
  }

}
