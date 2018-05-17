import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PersonasListComponent, PersonasViewComponent, PersonasEditComponent, PersonasAddComponent } from './personas/personas.component';
import { BlogListComponent, BlogViewComponent, BlogAddComponent, BlogEditComponent } from './blog/blog.component';

// Tabla de rutas de la página ¡¡CUIDADO CON EL ORDEN!! El orden importa
export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // representa la home
  { path: 'inicio', redirectTo: '/'}, // redirectTo redirecciona a la página que digas
  { path: 'demo', component: DemoComponent},
  { path: 'chisme/de/calcular', component: CalculadoraComponent}, // prueba que verifica que lo de entre comillas se pone en la barra
  { path: 'personas', component: PersonasListComponent},
  { path: 'personas/add', component: PersonasAddComponent},
  { path: 'personas/:id/edit', component: PersonasEditComponent},
  { path: 'personas/:id', component: PersonasViewComponent}, // :id recoge el valor y lo verifica con los id que tiene
  { path: 'personas/:id/:kk', component: PersonasViewComponent}, // parametros = campos. Se pueden poner tantos como quieras
  { path: 'blog', children: [ // children auna unas cuantas paginas hijas de la misma pagina
      { path: '', component: BlogListComponent },
      { path: 'add', component: BlogAddComponent },
      { path: ':id/edit', component: BlogEditComponent },
      { path: ':id', component: BlogViewComponent },
      { path: ':id/:kk', component: BlogViewComponent },
    ]
  },
  { path: 'config' , loadChildren: './setting/setting.module#SettingModule'},
  { path: '404.html', component: PageNotFoundComponent }, // 404 de toda la vida
  { path: '**', component: PageNotFoundComponent }, // representa en caso de que no lo encuentre
];
