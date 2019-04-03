import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routerTransition, showHide, photoSlideAnimation, showHideHeader } from './discover.component.animation';
import { TweenLite, Power4 } from 'gsap/TweenMax';
import { Subscription } from 'rxjs/internal/Subscription';
import { MediaObserver, MediaChange } from '@angular/flex-layout';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [
    routerTransition,
    photoSlideAnimation,
    showHide,
    showHideHeader
  ]
})
export class DiscoverComponent implements OnInit {

  @ViewChild('photoSlide') photoSlide: ElementRef;
  @ViewChild('infoWrapper') infoWrapper: ElementRef;
  @ViewChild('selectedImage') selectedImage: ElementRef;
  @ViewChild('backButton') backButton: ElementRef;
  @ViewChildren('slide') slide: QueryList<any>;

  watcher: Subscription;
  activeMediaQuery = '';
  isVisible: boolean;
  photoSlideItems: Array<any> = [{ position: String, index: Number }];
  selectedPictId = -1;

  detailTitle = '';
  subtext1 = '';
  subtext2 = '';
  services = '';
  directedBy = '';
  artDirectionBy = '';
  shotLocationIn = '';

  photoItems = [
    {
      name: 'picture1',
      source: './../assets/image/picture1.jpg',
      label: 'TAKAI - SILVER',
      selected: false,
      detailTitle: 'TAKAY - SILVER',
      subtext1: 'A production for Document Journal A Retro',
      subtext2: 'Treasure Travel of Women Principles',
      services: 'Production/Film',
      directedBy: 'Edward Osborne',
      artDirectionBy: 'Christopher Bowl',
      shotLocationIn: 'Spain'
    },
    {
      name: 'picture2',
      source: './../assets/image/picture2.jpg',
      label: 'DANI - SILVA',
      selected: false,
      detailTitle: 'DANI - SILVA',
      subtext1: 'A production for Document Journal A Retro',
      subtext2: 'Treasure Travel of Women Principles',
      services: 'Production/Film',
      directedBy: 'Will Shoemaker',
      artDirectionBy: 'Lilly Shoemaker',
      shotLocationIn: 'Brazil'
    },
    {
      name: 'picture3',
      source: './../assets/image/picture3.jpg',
      label: 'JORGE - RICH',
      selected: false,
      detailTitle: 'JORGE - RICH',
      subtext1: 'A production for Document Journal A Retro',
      subtext2: 'Treasure Travel of Women Principles',
      services: 'Production/Film',
      directedBy: 'Justin Crawford',
      artDirectionBy: 'Michael W. Smith',
      shotLocationIn: 'Greece'
    },
    {
      name: 'picture4',
      source: './../assets/image/picture4.jpg',
      label: 'TRAY - DAYMOND',
      selected: false,
      detailTitle: 'TRAY - DAYMOND',
      subtext1: 'A production for Document Journal A Retro',
      subtext2: 'Treasure Travel of Women Principles',
      services: 'Production/Film',
      directedBy: 'Frank Cruise',
      artDirectionBy: 'James Watts',
      shotLocationIn: 'Morocco'
    }
  ];

  constructor(private router: Router, private mediaObserver: MediaObserver) {
    console.clear();

    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (change.mqAlias === 'sm') {
        this.loadTabletContent();
      }
    });
  }

  ngOnInit(): void {
    this.isVisible = true;
    this.resetSelected();
  }

  getState(outletRef: RouterOutlet): any {
    return outletRef && outletRef.activatedRouteData && outletRef.activatedRouteData['animation'];
  }

  loadTabletContent(): any {
    const selectedImage = this.selectedImage.nativeElement as HTMLElement,
      backButton = this.backButton.nativeElement as HTMLElement,
      photoSlideItem = this.slide.map(val => val.nativeElement);

    selectedImage.style.height = '376px';

    TweenLite.to(photoSlideItem[this.selectedPictId], 1, {
      x: -726,
      y: 38,
      marginTop: 0,
      ease: Power4.easeOut,
    });

    TweenLite.to(backButton, 1, {
      opacity: 0
    });
  }

  selectedPicture(id: number, itemObj: object): void {
    // disable click event after being clicked.

    this.selectedPictId = id;

    const photoSlideItem = this.slide.map(val => val.nativeElement),
      selectedImage = this.selectedImage.nativeElement,
      photoSlide = this.photoSlide.nativeElement,
      infoWrapper = this.infoWrapper.nativeElement,
      currentRect = photoSlideItem[this.selectedPictId].getBoundingClientRect(),
      newRect = selectedImage.getBoundingClientRect();

    let translationSpaceXAxisObj;

    this.isVisible = false;
    this.photoSlideItems = [];
    // this.router.navigate(['/discover', id]);

    this.setDetailInfo(itemObj);


    TweenLite.to(photoSlideItem[this.selectedPictId], 1, {
      x: newRect.left - currentRect.left,
      y: 31,
      marginTop: 0,
      ease: Power4.easeOut,
    });


    for (let index = 0; index < photoSlideItem.length; index++) {

      if (index < this.selectedPictId) {
        // move left items to the far left
        this.photoSlideItems.push({ position: 'left', index: index });

      } else if (index === this.selectedPictId) {
        // target acquired at this index
        this.photoItems[index].selected = true;
        this.photoSlideItems.push({ position: 'selected', index: index });

      } else if (index > this.selectedPictId) {
        // move right items to the far right
        this.photoSlideItems.push({ position: 'right', index: index });
      }

    }


    translationSpaceXAxisObj = this.calculatePhotoItemTranslation(photoSlide);

    this.photoSlideItems.map((val, index) => {
      if (val) {
        if (val.position === 'left') {
          this.pushToTheLeft(photoSlideItem[index], translationSpaceXAxisObj.spaceToLeft);
        }
        if (val.position === 'right') {
          this.pushToTheRight(photoSlideItem[index], translationSpaceXAxisObj.spaceToRight);
        }
      }
    });


    infoWrapper.classList.replace('remove-lines', 'animate-lines');
  }

  setDetailInfo(obj: object) {
    this.detailTitle = obj['detailTitle'];
    this.subtext1 = obj['subtext1'];
    this.subtext2 = obj['subtext2'];
    this.services = obj['services'];
    this.directedBy = obj['directedBy'];
    this.artDirectionBy = obj['artDirectionBy'];
    this.shotLocationIn = obj['shotLocationIn'];
  }

  calculatePhotoItemTranslation(photoSlide: Element): Object {
    const photoElement = window.getComputedStyle(photoSlide),
      currentElementWidth = +photoElement.width.slice(0, -2),
      currentElementMarginLeft = +photoElement.marginLeft.slice(0, -2),
      currentElementMarginRight = +photoElement.marginRight.slice(0, -2),
      totalWidthPhotoElement = currentElementWidth + currentElementMarginLeft + currentElementMarginRight,
      totalPhotoElementDivided = totalWidthPhotoElement / this.photoSlideItems.length;

    let spaceToLeft = 0, spaceToRight = 0, counterLeft = 0, counterRight = 0;

    this.photoSlideItems.map(val => {
      if (val) {
        if (val.position === 'left') {
          counterLeft++;
        }
        if (val.position === 'right') {
          counterRight++;
        }
      }
    });

    // totalPhotoElementDivided

    // 363px is 343px photo-item width + 20px padding-right
    spaceToLeft = 363 * counterLeft;

    // 20px due to padding left
    spaceToRight = (363 + 20) * counterRight;

    return { spaceToLeft, spaceToRight };
  }

  pushToTheLeft(obj: Element, XAxis: number): void {
    TweenLite.to(obj, .8, {
      x: -XAxis,
      y: 0,
      ease: Power4.easeOut,
    });
  }

  pushToTheRight(obj: Element, XAxis: number): void {
    TweenLite.to(obj, .8, {
      x: XAxis,
      y: 0,
      ease: Power4.easeOut,
    });
  }

  backToProject(): void {
    const photoSlideItemSelected = document.querySelector('#photo-slide > .photo-slide-item.selected'),
      infoWrapper = this.infoWrapper.nativeElement;

    this.isVisible = true;
    infoWrapper.classList.replace('animate-lines', 'remove-lines');
    // this.router.navigate(['/discover']);

    TweenLite.to(photoSlideItemSelected, .8, {
      x: 0,
      y: 0,
      marginTop: '75px',
      ease: Power4.easeOut
    });

    this.restoreTheOthers();
    this.removeSelectedClass(photoSlideItemSelected);
  }

  restoreTheOthers(): void {
    const photoSlideItem = document.querySelectorAll('#photo-slide > .photo-slide-item:not(.selected)');

    for (let index = 0; index < photoSlideItem.length; index++) {
      TweenLite.to(photoSlideItem[index], .8, {
        x: 0,
        y: 0,
        ease: Power4.easeOut
      });
    }

    this.resetSelected();
  }

  removeSelectedClass(obj: Element): void {
    obj.classList.remove('selected');
  }

  resetSelected(): void {
    this.photoItems.map(val => val.selected = false);
  }

}
