import { Component, AfterViewInit, HostListener } from '@angular/core';
import { TweenLite, TweenMax } from 'gsap/TweenMax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor() { console.clear(); }

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {

    const scrollPosition = event.srcElement.scrollTop,
      positionLimitForIndicator = 252,
      positionLimitForVerticalLine = 630,
      indicator = document.getElementById('indicator'),
      verticalLine = document.getElementsByClassName('vertical-line'),
      first = document.getElementsByClassName('first'),
      last = document.getElementsByClassName('last');

    let currentPositionFirstElem = 0,
      currentPositionLastElem = 0;


    if (scrollPosition <= positionLimitForIndicator) {
      TweenLite.to(indicator, 0, {
        strokeDashoffset: scrollPosition
      });

      verticalLine[0].setAttribute('style', 'height: 0');

    } else if (scrollPosition > positionLimitForIndicator && scrollPosition <= positionLimitForVerticalLine) {
      TweenLite.to(verticalLine, 0, {
        height: scrollPosition - positionLimitForIndicator
      });

      first[0].setAttribute('style', 'transform: matrix(1, 0, 0, 1, -192, 0)');
      last[0].setAttribute('style', 'transform: matrix(1, 0, 0, 1, 670, 0)');

    } else if (scrollPosition > positionLimitForVerticalLine && scrollPosition <= 1000) {
      console.log(scrollPosition);
      currentPositionFirstElem = (scrollPosition - positionLimitForVerticalLine) - 192;
      currentPositionLastElem = 670 - (scrollPosition - positionLimitForVerticalLine);

      TweenLite.to(first, 0, {
        transform: `matrix(1, 0, 0, 1, ${currentPositionFirstElem}, 0)`
      });

      TweenLite.to(last, 0, {
        transform: `matrix(1, 0, 0, 1, ${currentPositionLastElem}, 0)`
      });

    }

  }

  ngAfterViewInit(): void {
  }


}
