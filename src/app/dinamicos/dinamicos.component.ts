import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemoComponent } from '../demo/demo.component';
import { PersonasComponent } from '../personas/personas.component';
import { BlogComponent } from '../blog/blog.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

 // También metemos en el component los elementos que meteremos en el menu, dentro de entryComponents: []
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css'],
  entryComponents: [HomeComponent, DemoComponent, PersonasComponent, BlogComponent, CalculadoraComponent, ],
})
export class DinamicosComponent implements OnInit {
  // creamos un array para el menú
  menu = [
    { texto: 'Blog' , componente: BlogComponent},
    { texto: 'Personas' , componente: PersonasComponent },
    { texto: 'Inicio' , componente: HomeComponent },
    { texto: 'Demo' , componente: DemoComponent},
    { texto: 'Calculadora' , componente: CalculadoraComponent},
  ];
  // Para seleccionar el primer elemento fijo que se vea. Esto hace que sea más manejable.
  componente = this.menu[0].componente;
  constructor() { }

  ngOnInit() {
  }

  // Con esto controlamos que el numero que nos ingrese este en el rango establecido
  selecciona(indice: number) {
    if (0 <= indice && indice < this.menu.length) {
      this.componente = this.menu[indice].componente;
    }
  }
}
