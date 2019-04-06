import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TweenLite } from 'gsap/TweenMax';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('verticalLine') verticalLine: ElementRef;
  @ViewChild('indicator') indicator: ElementRef;
  @ViewChild('first') first: ElementRef;
  @ViewChild('last') last: ElementRef;
  @ViewChild('actionButton') actionButton: ElementRef;

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {

    const scrollPosition = event.srcElement.scrollTop,
      positionLimitForIndicator = 252,
      positionLimitForVerticalLine = 630,
      indicator = this.indicator.nativeElement as Element,
      verticalLine = this.verticalLine.nativeElement as Element,
      first = this.first.nativeElement as Element,
      last = this.last.nativeElement as Element,
      actionButton = this.actionButton.nativeElement as Element;

    let currentPositionFirstElem = 0,
      currentPositionLastElem = 0;

    if (scrollPosition <= positionLimitForIndicator) {
      TweenLite.to(indicator, 0, {
        strokeDashoffset: scrollPosition
      });

      verticalLine.setAttribute('style', 'height: 0');

    } else if (scrollPosition > positionLimitForIndicator && scrollPosition <= positionLimitForVerticalLine) {
      TweenLite.to(verticalLine, 0, {
        height: scrollPosition - positionLimitForIndicator
      });

      first.setAttribute('style', 'transform: matrix(1, 0, 0, 1, -192, 0)');
      last.setAttribute('style', 'transform: matrix(1, 0, 0, 1, 670, 0)');

    } else if (scrollPosition > positionLimitForVerticalLine && scrollPosition <= 1000) {
      currentPositionFirstElem = (scrollPosition - positionLimitForVerticalLine) - 192;
      currentPositionLastElem = 670 - (scrollPosition - positionLimitForVerticalLine);

      TweenLite.to(first, 0, {
        transform: `matrix(1, 0, 0, 1, ${currentPositionFirstElem}, 0)`
      });

      TweenLite.to(last, 0, {
        transform: `matrix(1, 0, 0, 1, ${currentPositionLastElem}, 0)`
      });

      actionButton.classList.remove('animate-lines');

    } else if (scrollPosition > 1000) {
      actionButton.classList.add('animate-lines');
    }

  }


  constructor() { console.clear(); }

  ngOnInit() {
  }

}
