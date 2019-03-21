import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routerTransition, showHide, photoSlideAnimation } from './discover.component.animation';
import { TweenLite } from 'gsap/TweenMax';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [
    routerTransition,
    photoSlideAnimation,
    showHide
  ]
})
export class DiscoverComponent implements OnInit {

  isVisible: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isVisible = true;
  }

  getState(outletRef: RouterOutlet) {
    return outletRef && outletRef.activatedRouteData && outletRef.activatedRouteData['animation'];
  }

  selectedPicture(id: number) {
    let selectedItem = -1;
    const selectedPictId = id - 1,
      photoSlide = document.getElementsByClassName('photo-slide'),
      photoSlideItem = document.getElementsByClassName('photo-slide-item'),
      contentRight = document.getElementsByClassName('content-right'),
      selectedImage = document.getElementById('selected-image');

    this.isVisible = false;
    this.router.navigate(['/discover', id]);


    for (let index = 0; index < photoSlideItem.length; index++) {

      if (photoSlideItem[index].classList.contains('selected')) {
        selectedItem = index;
      }

      if (index <= selectedItem) {
        const checkIndex = index === 0 ? 0 : index - 1;
        const widthToLeft = window.getComputedStyle(photoSlideItem[checkIndex]).width;

        TweenLite.to(photoSlideItem[checkIndex], .5, {
          transform: `translateX(-${widthToLeft})`,
          // opacity: 0,
          // visibility: 'hidden',
          // display: 'none'
        });
      }

      if (index > selectedItem) {
        const widthToRight = window.getComputedStyle(photoSlideItem[index]).width;

        TweenLite.to(photoSlideItem[index], 1, {
          transform: `translateX(${widthToRight})`,
          // opacity: 0,
          // visibility: 'hidden',
          // display: 'none'
        });
      }

    }

    console.log(contentRight, contentRight[0].getBoundingClientRect());

    selectedImage.appendChild(photoSlideItem[selectedPictId]);

    //     bottom: 251.85000610351562
    // height: 0
    // left: 778
    // right: 1536
    // top: 251.85000610351562
    // width: 758
    // x: 778
    // y: 251.85000610351562

    // TweenLite.to(photoSlide, 1, {
    //   transform: `translate3d(314px, -349px, 0)`,
    // }).delay(1);


  }

}
