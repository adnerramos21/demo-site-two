import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routerTransition, showHide, photoSlideAnimation, showHideHeader } from './discover.component.animation';
import { TweenLite, TweenMax, Power3 } from 'gsap/TweenMax';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.isVisible = true;
  }

  getState(outletRef: RouterOutlet) {
    return outletRef && outletRef.activatedRouteData && outletRef.activatedRouteData['animation'];
  }

  selectedPicture(id: number) {
    let selectedItem = -1;

    // selectedPictId = id - 1
    const selectedPictId = 0,
      photoSlide = document.getElementsByClassName('photo-slide'),
      photoSlideItem = document.getElementsByClassName('photo-slide-item'),
      contentRight = document.getElementsByClassName('content-right'),
      selectedImage = document.getElementById('selected-image');

    this.isVisible = false;
    this.router.navigate(['/discover', id]);


    // for (let index = 0; index < photoSlideItem.length; index++) {

    //   if (photoSlideItem[index].classList.contains('selected')) {
    //     selectedItem = index;
    //   }

    //   // move left items to the far left
    //   if (index <= selectedItem) {
    //     console.log(index, selectedItem);
    //     console.log(photoSlideItem[index]);

    //     const checkIndex = index === 0 ? 0 : index - 1;
    //     const widthToLeft = +window.getComputedStyle(photoSlideItem[checkIndex]).width.slice(0, -2);

    //     TweenLite.to(photoSlideItem[checkIndex], .5, {
    //       transform: `translateX(-${widthToLeft}px)`,
    //       ease: Power3.easeOut
    //     });
    //   }

    //   // move right items to the far right
    //   if (index > selectedItem) {
    //     const widthToRight = +window.getComputedStyle(photoSlideItem[index]).width.slice(0, -2) * 2;
    //     TweenLite.to(photoSlideItem[index], 1, {
    //       transform: `translateX(${widthToRight}px)`,
    //       ease: Power3.easeOut
    //     });
    //   }

    // }



    // TweenLite.to(photoSlideItem[0], .5, {
    //   transform: `translateX(-504px)`,
    //   ease: Power3.easeOut
    // });


    const currentRect = photoSlideItem[selectedPictId].getBoundingClientRect();

    selectedImage.appendChild(photoSlideItem[selectedPictId]);

    // TweenMax.set(photoSlideItem[selectedPictId], { x: 0, y: 0 });

    const newRect = photoSlideItem[selectedPictId].getBoundingClientRect();

    console.log(currentRect, newRect);

    TweenMax.from(photoSlideItem[selectedPictId], 1, {
      x: currentRect.left - newRect.left,
      y: (currentRect.top - newRect.top) + 50,
      ease: Power3.easeOut
    });

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
