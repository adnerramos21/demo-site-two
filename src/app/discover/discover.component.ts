import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routerTransition, showHide, photoSlideAnimation, showHideHeader } from './discover.component.animation';
import { TweenLite, Power3 } from 'gsap/TweenMax';

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
export class DiscoverComponent implements OnInit, AfterViewInit {

  isVisible: boolean;
  photoSlideItems: Array<any> = [{ position: String, index: Number }];
  photoItems = [
    false, false, false, false
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isVisible = true;
    this.resetSelected();
  }

  ngAfterViewInit(): void {
  }

  getState(outletRef: RouterOutlet) {
    return outletRef && outletRef.activatedRouteData && outletRef.activatedRouteData['animation'];
  }

  selectedPicture(id: number) {
    const selectedPictId = (id - 1) < 0 ? 0 : id - 1,
      photoSlideItem = document.querySelectorAll('#photo-slide > .photo-slide-item'),
      selectedImage = document.getElementById('selected-image'),
      photoSlide = document.querySelector('#photo-slide');

    let translationSpaceXAxisObj;

    this.isVisible = false;
    this.photoSlideItems = [];
    // this.router.navigate(['/discover', id]);


    const currentRect = photoSlideItem[selectedPictId].getBoundingClientRect();

    const newRect = selectedImage.getBoundingClientRect();

    TweenLite.to(photoSlideItem[selectedPictId], 6, {
      x: newRect.left - currentRect.left,
      y: 10,
      marginTop: 0,
      ease: Power3.easeOut,
    });


    for (let index = 0; index < photoSlideItem.length; index++) {

      if (index < selectedPictId) {
        // move left items to the far left
        this.photoSlideItems.push({ position: 'left', index: index });

      } else if (index === selectedPictId) {
        // target acquired at this index
        this.photoItems[index] = true;
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

  pushToTheLeft(obj: Element, XAxis): void {
    TweenLite.to(obj, 6, {
      transform: `translate3d(-${XAxis}px, 0 , 0)`,
      ease: Power3.easeOut
    });
  }

  pushToTheRight(obj: Element, XAxis): void {
    TweenLite.to(obj, 6, {
      transform: `translate3d(${XAxis}px, 0 , 0)`,
      ease: Power3.easeOut
    });
  }

  backToProject(): void {
    const photoSlideItemSelected = document.querySelector('#photo-slide > .photo-slide-item.selected');

    this.isVisible = true;
    // this.router.navigate(['/discover']);

    TweenLite.to(photoSlideItemSelected, 6, {
      x: 0,
      y: 0,
      marginTop: '75px',
      ease: Power3.easeOut
    });

    this.restoreTheOthers();
    this.removeSelectedClass(photoSlideItemSelected);
  }

  restoreTheOthers(): void {
    const photoSlideItem = document.querySelectorAll('#photo-slide > .photo-slide-item:not(.selected)');

    for (let index = 0; index < photoSlideItem.length; index++) {
      TweenLite.to(photoSlideItem[index], 6, {
        transform: `translate3d(0, 0, 0)`,
        ease: Power3.easeOut
      });
    }

    this.resetSelected();
  }

  removeSelectedClass(obj) {
    obj.classList.remove('selected');
  }

  resetSelected() {
    this.photoItems.map(val => val = false);
  }

}
