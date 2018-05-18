import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es', localeEsExtra);

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgioCoreModule, LoggerService, ERROR_LEVEL } from '../agio-core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { PersonasVMService, PersonasDAOVMService } from './personas/personas-vm.service';
import { AuthInterceptor, LoggingInterceptor } from './services/seguridad.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PopupComponent } from './popup/popup.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { PERSONAS_COMPONENT } from './personas/personas.component';
import { BLOG_COMPONENT } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterUserComponent } from './register-user/register-user.component';


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
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes),
    AgioCoreModule, NgbModule.forRoot()
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: 4 },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: PersonasVMService, useClass: PersonasDAOVMService },
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS , useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
