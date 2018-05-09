import { Injectable } from '@angular/core';
import { LoggerService } from '../../agio-core';

type TipoError = 'error' | 'warn' | 'log';

export class Notify {
  Mensaje: string;
  Tipo: TipoError = 'error';
  constructor(msg: string, tipo: TipoError= 'error') {
    this.Mensaje = msg;
    this.Tipo = tipo;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private listado: Array<Notify> = [];

  constructor(private con: LoggerService) { }

  get Listado() {return this.listado; }

    public add(msg: string, tipo: TipoError= 'error'): void {
      this.listado.push({Mensaje: msg, Tipo: tipo});
      if (tipo === 'error') {
        this.con.error(msg);
      }
    }
    public remove(index: number): void {
      if (0 <= index && index < this.listado.length) {
        this.listado.splice(index, 1);
      } else {
        this.con.error('Index Out Of Range');
      }
    }
    public clear() {
      this.listado.splice(0, this.listado.length);
    }
}
