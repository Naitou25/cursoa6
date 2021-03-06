import { Injectable } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../agio-core';

@Injectable({
  providedIn: 'root'
})
export class BlogVMService {
  // Creamos las variables privadas
  private modo: 'list' | 'add' | 'edit' | 'view' | 'remove' = 'list';
  private listado: Array<any> = [];
  private elemento: any = {};
  private idOriginal = null;
  protected pk = 'id';

  constructor(private nsrv: NotifyService, private out: LoggerService) {
  }
    public get Modo() { return this.modo; }
    public get Listado() { return this.listado; }
    public get Elemento() { return this.elemento; }

     // comando que pide los datos
     public list() {
       this.modo = 'list';
      if (this.listado.length === 0) {
        this.listado = [
          { id: 1, titulo: 'Primero', texto: 'Este es el primero', autor: 'Unamuno',
            fecha: '02/06/1987', megusta: 234, foto: ''},
          { id: 2, titulo: 'Segundo', texto: 'Este es el segundo', autor: 'Cervantes',
            fecha: '31/04/1997', megusta: 675, foto: ''},
          { id: 3, titulo: 'Tercero', texto: 'Este es el tercero', autor: 'Azorín',
          fecha: '18/12/1867', megusta: 982, foto: ''},
          { id: 4, titulo: 'Cuarto', texto: 'Este es el cuarto', autor: 'Machado',
          fecha: '23/09/1699', megusta: 19274, foto: ''},
        ];
      }
    }

    // metodo para añadir
    public add() {
      this.modo = 'add';
      this.elemento = {};
    }

    // Metodo para editar el dato
    public edit(key: any) {
      // Como el listado puede ser muy grande lo cacheamos
      // tslint:disable-next-line:triple-equals
      const rslt = this.listado.find(item => item[this.pk] == key);
      if (rslt) {
        this.modo = 'edit';
        // Object.assign(Copia en el primero lo de los siguientes elementos), es decir, con esto mostramos una copia de lo que hay
        this.elemento = Object.assign({}, rslt);
        this.idOriginal = key;
      } else {
        // Con esto generamos un error
        this.nsrv.add('Elemento no encontrado.');
      }
    }

    // Metodo para ver los datos
    public view(key: any) {
      // tslint:disable-next-line:triple-equals
      const rslt = this.listado.find(item => item[this.pk] == key);
      if (rslt) {
        this.modo = 'view';
        this.elemento = Object.assign({}, rslt);
        this.idOriginal = key;
      } else {
        this.nsrv.add('Elemento no encontrado.');
      }
    }

    // Metodo para borrar el dato
    public remove(key: any) {
      // Pedimos una confirmacion de seguridad
      if (!window.confirm('¿Esta usted seguro?')) {
        return;
      }
      // tslint:disable-next-line:triple-equals
      const indice = this.listado.findIndex(item => item[this.pk] == key);
      // En caso de encontrarlo
      if (indice !== -1) {
        this.listado.splice(indice, 1);
        this.list();
      } else {
        this.nsrv.add('Elemento no encontrado.');
      }
    }

    // Metodo para cancelar la edicion y mostrar la lista de nuevo sin modificar
    public cancel() {
      // Ponemos los valores de nuevo a null o vacíos para cancelar las modificaciones
      this.elemento = {};
      this.idOriginal = null;
      this.list();
    }

    public send() {
      switch (this.modo) {
        // Caso de añadir
        case 'add': this.listado.push(this.elemento);
                    this.cancel();
        break;
        // Caso de editar
        case 'edit':
        // tslint:disable-next-line:triple-equals
        const indice = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
        if (indice !== -1) {
          this.listado[indice] = this.elemento;
          this.list();
        } else {
          this.nsrv.add('Elemento no encontrado.');
        }
        break;
        // Caso en el que estando en el modo view se clicke en el send
        case 'view': this.cancel();
        break;

      }
    }
}
