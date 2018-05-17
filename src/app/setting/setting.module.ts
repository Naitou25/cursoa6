import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { CambiaPasswordComponent } from './cambia-password/cambia-password.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {path: '', component: PerfilComponent},
  {path: 'datos', component: DatosPersonalesComponent},
  {path: 'cambiar password', component: CambiaPasswordComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PerfilComponent, DatosPersonalesComponent, CambiaPasswordComponent]
})
export class SettingModule { }
