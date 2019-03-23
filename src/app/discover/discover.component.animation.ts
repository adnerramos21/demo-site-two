import { trigger, transition, style, animate, query, state } from '@angular/animations';


export const routerTransition = trigger('routerTransition', [
    transition('* => DiscoverDetail', [

        style({ position: 'relative' }),

        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),

        query(':enter', [
            style({
                opacity: 0,
            }),
            animate('1s ease-out', style({
                opacity: 1,
            }))
        ], { optional: true }),

        query(':leave', [
            style({
                opacity: 1
            }),
            animate('1s ease-out', style({
                opacity: 0
            }))
        ], { optional: true })

    ]),
    transition('* => Discover', [

        style({ position: 'relative' }),

        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),

        query(':enter', [
            style({
                opacity: 0,
            }),
            animate('1s ease-out', style({
                opacity: 1,
            }))
        ], { optional: true }),

        query(':leave', [
            style({
                opacity: 1
            }),
            animate('1s ease-out', style({
                opacity: 0
            }))
        ], { optional: true })

    ])
]);

export const photoSlideAnimation = trigger('photoSlideAnimation', [
    state('discover', style({
        overflowX: 'auto'
    })),
    state('specific', style({
        overflowX: 'hidden'
    })),
]);


export const showHideHeader = trigger('showHideHeader', [
    state('show', style({
        marginBottom: '5%',
        height: 'auto'
    })),
    state('hide', style({
        marginBottom: 0,
        height: 0
    })),
    transition('show <=> hide', [
        animate('.3s')
    ])
]);


export const showHide = trigger('showHide', [
    state('show', style({
        opacity: 1,
        visibility: 'visible',
    })),
    state('hide', style({
        opacity: 0,
        visibility: 'hidden',
    })),
    transition('show <=> hide', [
        animate('.3s')
    ])
]);



// export const spreadRestore = trigger('spreadRestore', [
//     state('spread', style({
//         opacity: 1,
//         visibility: 'visible'
//     })),
//     state('restore', style({
//         opacity: 0,
//         visibility: 'hidden'
//     })),
//     transition('show <=> hide', [
//         animate('.3s')
//     ])
// ]);