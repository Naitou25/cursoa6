import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgioCoreModule, LoggerService, ERROR_LEVEL } from '../agio-core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AgioCoreModule
  ],
  providers: [
    LoggerService,
    {provide: ERROR_LEVEL, useValue: 4},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
