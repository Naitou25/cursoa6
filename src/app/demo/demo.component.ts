import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../agio-core';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
// la Clase trabaja con sus propios attr
export class DemoComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  nombre: string = 'Mundo';
  resultado: string;
  popup = [
    {}
  ];
  listado = [
    {id: 1, nombre: 'madrid'},
    {id: 2, nombre: 'Málaga'},
    {id: 3, nombre: 'BARCELONA'},
    {id: 4, nombre: 'Valencia'},
  ];
  idProvincia = 2;
  visible = true;
  conEstilo = { error: false, important: true, destacar: false};
  font = 24;

  // Aqui van los servicios
  constructor(private out: LoggerService, private nsrv: NotifyService) { }

  get Notificaciones() {
    return this.nsrv;
  }

  ngOnInit() {
  }

  // Metodos
  public saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }
  public despide() {
    this.resultado = `Adios ${this.nombre}`;
  }

  public di(algo: string) {
    this.resultado = `Dice ${algo}`;
  }

  public cambia() {
    this.visible = !this.visible;
    this.conEstilo.important = !this.conEstilo.important;
    this.conEstilo.destacar = !this.conEstilo.destacar;
  }
  // Funcion que recibe dos valores y retorna 1 (no es necesario especificar el tipo de dato que retorna)
  public calcula(a: number, b: number): number {
    return a + b;
  }
  public add(provincia: string): void {
    if (!provincia) {
      this.out.error('Falta la provincia');
    }
    const newId = this.listado.length === 0 ? 1 : this.listado[this.listado.length - 1].id + 1;
    this.listado.push({id: newId, nombre: provincia });
    this.idProvincia = newId;
  }
}
