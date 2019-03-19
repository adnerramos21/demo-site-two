import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group, query } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [

        group([
          query(':enter', [
            style({
              opacity: 0
            }),
            animate('1s ease-out', style({ opacity: 1 }))
          ], { optional: true }),

          query(':leave', [
            style({
              opacity: 1
            }),
            animate('3s ease-out', style({ opacity: 0 }))
          ], { optional: true })
        ])

      ])
    ])
  ]
})
export class DiscoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outletRef: RouterOutlet) {
    // console.log(outletRef);
    // return outletRef.activatedRoute.snapshot.params.id;
    // return outletRef.activatedRouteData['page'] || 'discover';
  }

}
