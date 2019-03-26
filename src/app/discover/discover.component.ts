import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routerTransition, showHide, photoSlideAnimation, showHideHeader } from './discover.component.animation';
import { TweenLite, TweenMax, Power3, Power4 } from 'gsap/TweenMax';


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

  isVisible: boolean;
  photoSlideItems: Array<any> = [{ position: String, index: Number }];

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

  constructor(private router: Router) { console.clear(); }

  ngOnInit(): void {
    this.isVisible = true;
    this.resetSelected();
  }

  getState(outletRef: RouterOutlet): any {
    return outletRef && outletRef.activatedRouteData && outletRef.activatedRouteData['animation'];
  }

  selectedPicture(id: number, itemObj: object): void {
    const selectedPictId = id,
      photoSlideItem = document.querySelectorAll('#photo-slide > .photo-slide-item'),
      selectedImage = document.getElementById('selected-image'),
      photoSlide = document.querySelector('#photo-slide'),
      infoWrapper = document.querySelector('#info-wrapper'),
      currentRect = photoSlideItem[selectedPictId].getBoundingClientRect(),
      newRect = selectedImage.getBoundingClientRect();

    let translationSpaceXAxisObj;

    this.isVisible = false;
    this.photoSlideItems = [];
    // this.router.navigate(['/discover', id]);

    this.setDetailInfo(itemObj);


    TweenLite.to(photoSlideItem[selectedPictId], 1, {
      x: newRect.left - currentRect.left,
      y: 10,
      marginTop: 0,
      ease: Power4.easeOut,
    });


    for (let index = 0; index < photoSlideItem.length; index++) {

      if (index < selectedPictId) {
        // move left items to the far left
        this.photoSlideItems.push({ position: 'left', index: index });

      } else if (index === selectedPictId) {
        // target acquired at this index
        this.photoItems[index].selected = true;
        this.photoSlideItems.push({ position: 'selected', index: index });

      } else if (index > selectedPictId) {
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


    spaceToLeft = totalPhotoElementDivided * counterLeft;
    spaceToRight = totalPhotoElementDivided * counterRight;

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
      infoWrapper = document.querySelector('#info-wrapper');

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
