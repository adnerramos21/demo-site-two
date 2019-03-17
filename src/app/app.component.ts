import { Component, AfterViewInit, HostListener } from '@angular/core';
import { TweenLite } from 'gsap/TweenMax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor() { console.clear(); }

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {
    const scrollPosition = event.srcElement.scrollTop;

    const indicator = document.getElementById('indicator');
    const verticalLine = document.getElementsByClassName('vertical-line');

    if (scrollPosition <= 252) {
      TweenLite.to(indicator, 0, {
        strokeDashoffset: scrollPosition
      });

      verticalLine[0].setAttribute('style', 'height: 0');
    } else {
      TweenLite.to(verticalLine, 0, {
        height: scrollPosition - 252
      });
    }

  }

  ngAfterViewInit(): void {
  }


}
