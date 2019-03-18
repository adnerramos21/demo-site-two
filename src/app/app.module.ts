import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDirective } from './app.directive';
import { PresentationComponent } from './presentation/presentation.component';
import { MainComponent } from './main/main.component';
import { DiscoverComponent } from './discover/discover.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDirective,
    PresentationComponent,
    MainComponent,
    DiscoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
