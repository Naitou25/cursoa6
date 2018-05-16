import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'inicio', redirectTo: '/'},
  { path: 'demo', component: DemoComponent},
  { path: 'chisme/de/calcular', component: CalculadoraComponent},
  // { path: 'path/:routeParam', component: MyComponent1 },
  // { path: 'staticPath', component: MyComponent2 },
  // { path: 'oldPath', redirectTo: '/newPath' },
  // { path: 'path', component: MyComponent3 , data: { message: 'Custom' } },
  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
