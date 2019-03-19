import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { MainComponent } from './main/main.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverDetailComponent } from './discover/discover-detail/discover-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'discover',
    component: DiscoverComponent,
    data: { page: 'discover'},
    children: [
      {
        path: ':id',
        component: DiscoverDetailComponent,
        data: { page: 'discover-detail'}
      }
    ]
  },
  {
    path: 'presentation',
    component: PresentationComponent
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
