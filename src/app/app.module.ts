import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es', localeEsExtra);

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgioCoreModule, LoggerService, ERROR_LEVEL } from '../agio-core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PopupComponent } from './popup/popup.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { PERSONAS_COMPONENT } from './personas/personas.component';
import { BLOG_COMPONENT } from './blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent,
    CalculadoraComponent,
    PopupComponent,
    DinamicosComponent,
    PERSONAS_COMPONENT,
    BLOG_COMPONENT,
  ],
  imports: [
    BrowserModule, FormsModule,
    AgioCoreModule
  ],
  providers: [
    LoggerService,
    {provide: ERROR_LEVEL, useValue: 4 },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
