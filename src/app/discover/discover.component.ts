import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
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
  @ViewChild('selectedImageContainer') selectedImageContainer: ElementRef;
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
      shotLocationIn: 'Spain',
      mask: 'url(#picture1)'
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
      shotLocationIn: 'Brazil',
      mask: 'url(#picture2)'
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
      shotLocationIn: 'Greece',
      mask: 'url(#picture3)'
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
      shotLocationIn: 'Morocco',
      mask: 'url(#picture4)'
    }
  ];

  constructor(private router: Router, private mediaObserver: MediaObserver, private renderer: Renderer2) {
    console.clear();

    // TO BE CONTINUED
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change.mqAlias;
      if (change.mqAlias === 'sm') {
        // this.loadTabletPortraitMode();
      }
      if (change.mqAlias === 'md') {
        // this.loadTabletLandscapeMode();
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

  loadTabletLandscapeMode(): any {
    if (this.selectedPictId !== -1) {
      const photoSlideItem = this.slide.map(val => val.nativeElement),
        selectedImage = this.selectedImage.nativeElement as HTMLElement,
        currentRect = photoSlideItem[this.selectedPictId].getBoundingClientRect() as DOMRect,
        newRect = selectedImage.getBoundingClientRect() as DOMRect;

      console.log(
        'Portrait Mode',
        'currentRect', currentRect,
        'newRect', newRect,
        'Difference',
        newRect.left - currentRect.left);

      TweenLite.to(photoSlideItem[this.selectedPictId], 1, {
        x: 343,
        y: 30,
        marginTop: 0,
        ease: Power4.easeOut,
      });
    }
  }

  loadTabletPortraitMode(): any {
    // const
    //   backButton = this.backButton.nativeElement as HTMLElement,

    // selectedImage.style.height = '376px';

    if (this.selectedPictId !== -1) {
      const photoSlideItem = this.slide.map(val => val.nativeElement),
        selectedImage = this.selectedImage.nativeElement as HTMLElement,
        currentRect = photoSlideItem[this.selectedPictId].getBoundingClientRect() as DOMRect,
        newRect = selectedImage.getBoundingClientRect() as DOMRect;

      console.log(
        'Portrait Mode',
        'currentRect', currentRect,
        'newRect', newRect,
        'Difference',
        newRect.left - currentRect.left);


      TweenLite.to(photoSlideItem[this.selectedPictId], 1, {
        x: 0,
        y: 30,
        marginTop: 0,
        ease: Power4.easeOut,
      });
    }

  }

  selectedPicture(id: number, itemObj: object): void {
    // disable click event after being clicked.

    this.selectedPictId = id;

    const photoSlideItem = this.slide.map(val => val.nativeElement as HTMLElement),
      selectedImage = this.selectedImage.nativeElement as HTMLElement,
      photoSlide = this.photoSlide.nativeElement,
      infoWrapper = this.infoWrapper.nativeElement,
      currentRect = photoSlideItem[this.selectedPictId].getBoundingClientRect() as DOMRect,
      newRect = selectedImage.getBoundingClientRect() as DOMRect,
      placeholderDiv = this.renderer.createElement('div') as HTMLDivElement,
      selectedNode = photoSlideItem[this.selectedPictId];

    let translationSpaceXAxisObj;

    this.isVisible = false;
    this.photoSlideItems = [];

    // this.router.navigate(['/discover', id]);

    this.setDetailInfo(itemObj);

    placeholderDiv.id = 'placeholder';
    placeholderDiv.style.opacity = '0';
    placeholderDiv.style.minWidth = currentRect.width + 'px';
    placeholderDiv.classList.add('photo-slide-item');

    // Set placeholder to hold selectedImage position
    photoSlide.replaceChild(placeholderDiv, selectedNode);

    selectedImage.appendChild(photoSlideItem[this.selectedPictId]);


    TweenLite.from(photoSlideItem[this.selectedPictId], 1, {
      x: currentRect.left - newRect.left,
      y: currentRect.top - newRect.top,
      ease: Power4.easeOut,
    });

    TweenLite.set(photoSlideItem[this.selectedPictId], {
      marginTop: 0,
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

  calculatePhotoItemTranslation(photoSlide: HTMLElement): Object {
    const photoElement = window.getComputedStyle(photoSlide),
      currentElementMarginLeft = +photoElement.marginLeft.slice(0, -2),
      currentElementMarginRight = +photoElement.marginRight.slice(0, -2),
      photoSlideItem = this.slide.map(val => val.nativeElement as HTMLElement),
      photoSlideItemWidth = +window.getComputedStyle(photoSlideItem[this.selectedPictId]).width.slice(0, -2),
      photoSlideItemMarginRight = +window.getComputedStyle(photoSlideItem[this.selectedPictId]).marginRight.slice(0, -2),
      currentElementWidth = (photoSlideItemWidth + photoSlideItemMarginRight) * this.photoSlideItems.length,
      computedElementWidth = +photoElement.width.slice(0, -2);

    let spaceToLeft = 0, spaceToRight = 0, counterLeft = 0, counterRight = 0, actualWidth = 0;

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


    // currentElementWidth = width when horizontal scrollbar is present
    // computedElementWidth = width when horizontal scrollbar is not present
    actualWidth = currentElementWidth > computedElementWidth ? currentElementWidth : computedElementWidth;

    // 343px photo-item width + 20px photo-item margin-right is 363px
    spaceToLeft = (photoSlideItemWidth + photoSlideItemMarginRight) * counterLeft;

    // To the actualWidth substract the spaceToLeft taken and the photoSlideItemWidth to the right with padding
    spaceToRight = actualWidth - spaceToLeft - (photoSlideItemWidth + photoSlideItemMarginRight);

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
    const photoSlideItemSelected = document.querySelector('#selected-image > .photo-slide-item.selected') as HTMLElement,
      infoWrapper = this.infoWrapper.nativeElement as HTMLElement,
      photoSlide = this.photoSlide.nativeElement as HTMLElement,
      currentRect = photoSlideItemSelected.getBoundingClientRect() as DOMRect,
      newRect = photoSlide.getBoundingClientRect() as DOMRect,
      placeholderDiv = document.querySelector('#photo-slide > #placeholder');

    this.isVisible = true;

    infoWrapper.classList.replace('animate-lines', 'remove-lines');

    // this.router.navigate(['/discover']);

    photoSlide.replaceChild(photoSlideItemSelected, placeholderDiv);

    TweenLite.from(photoSlideItemSelected, .8, {
      x: currentRect.left - newRect.left,
      y: currentRect.top - newRect.top,
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
