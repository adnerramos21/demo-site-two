import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TweenLite, TimelineLite } from 'gsap/TweenMax';
import { wrap } from 'module';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('verticalLine') verticalLine: ElementRef;
  @ViewChild('indicator') indicator: ElementRef;
  @ViewChild('svgElement') svgElement: ElementRef;
  @ViewChild('first') first: ElementRef;
  @ViewChild('last') last: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('actionButton') actionButton: ElementRef;

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {

    const verticalLineHeight = 360,
      indicator = this.indicator.nativeElement as Element,
      verticalLine = this.verticalLine.nativeElement as Element,
      first = this.first.nativeElement as Element,
      last = this.last.nativeElement as Element,
      actionButton = this.actionButton.nativeElement as Element,
      svgElement = this.svgElement.nativeElement as Element,
      timeline = new TimelineLite();

    timeline.to(indicator, 1.25, {
      strokeDashoffset: 252
    }).to(verticalLine, 1.25, {
      height: verticalLineHeight
    }).to([first, last], 1, {
      transform: `matrix(1, 0, 0, 1, 0, 0)`
    }).call(() => {
      actionButton.classList.add('animate-lines');
    }).to([svgElement, verticalLine], .78, {
      // opacity: 0
    });

  }


  constructor() { console.clear(); }

  ngOnInit() {
  }

  onMobileDevice() {
    const wrapper = this.wrapper.nativeElement as HTMLElement;
    return wrapper.clientHeight + 'px';
  }

  onMobileDeviceLandscape() {
    const wrapper = this.wrapper.nativeElement as HTMLElement;
    return wrapper.clientHeight + 'px';
  }

  onTabletDevice() {
    const wrapper = this.wrapper.nativeElement as HTMLElement;
    return wrapper.clientHeight + 'px';
  }

  onDesktopDevice() {
    const wrapper = this.wrapper.nativeElement as HTMLElement;
    return wrapper.clientHeight + 'px';
  }

}
