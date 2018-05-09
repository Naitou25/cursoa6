import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgioCoreModule, LoggerService, ERROR_LEVEL } from '../agio-core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
