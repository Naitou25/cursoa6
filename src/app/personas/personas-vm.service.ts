import { Injectable } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../agio-core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PersonasDAOService {
  private baseUrl = environment.WSUrl + 'personas';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) {  }
  query(): Observable<any> { return this.http.get(this.baseUrl, this.options); }
  get(id: number) { return this.http.get(this.baseUrl + '/' + id, this.options); }
  add(item: any) { return this.http.post(this.baseUrl + '/' + item, this.options); }
  change(item: any) { return this.http.put(this.baseUrl + '/' + item, this.options); }
  remove(id: number) { return this.http.delete(this.baseUrl + '/' + id, this.options); }
}

@Injectable()
export class PersonasDAOVMService {
  // Creamos las variables privadas
  private modo: 'list' | 'add' | 'edit' | 'view' | 'remove' = 'list';
  private listado: Array<any> = [];
  private elemento: any = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urlList = '/personas';

  constructor(private dao: PersonasDAOService, private nsrv: NotifyService,
    private out: LoggerService, private router: Router ) {
  }
    public get Modo() { return this.modo; }
    public get Listado() { return this.listado; }
    public get Elemento() { return this.elemento; }

     // comando que pide los datos
     public list() {
       this.dao.query().subscribe(
          data => {
            this.listado = data;
            this.modo = 'list';
          },
          error => { this.nsrv.add(error.message); },
       );
    }

    // metodo para añadir
    public add() {
      this.modo = 'add';
      this.elemento = { id: 0 }; // asi lo inicializa a 0 y autogenera
    }

    // Metodo para editar el dato
    public edit(key: any) {
      this.dao.get(key).subscribe(
        data => {
          this.modo = 'edit';
          this.elemento = data;
          this.idOriginal = key;
        },
        error => { this.nsrv.add(error.message); },
      );
    }

    // Metodo para ver los datos
    public view(key: any) {
      this.dao.get(key).subscribe(
        data => {
          this.modo = 'view';
          this.elemento = data;
        },
        error => { this.nsrv.add(error.message); },
      );
    }

    // Metodo para borrar el dato
    public remove(key: any) {
      // Pedimos una confirmacion de seguridad
      if (!window.confirm('¿Esta usted seguro?')) {
        return;
      }
      this.dao.remove(key).subscribe(
        data => { this.list(); },
        error => { this.nsrv.add(error.message); },
      );
    }

    // Metodo para cancelar la edicion y mostrar la lista de nuevo sin modificar
    public cancel() {
      // Ponemos los valores de nuevo a null o vacíos para cancelar las modificaciones
      this.elemento = {};
      this.idOriginal = null;
      // this.list();
      this.router.navigateByUrl(this.urlList);
    }

    public send() {
      switch (this.modo) {
        // Caso de añadir
        case 'add':
        this.dao.add(this.elemento).subscribe(
          data => { this.cancel(); },
          error => {this.nsrv.add(error.message); }
        );
        break;
        // Caso de editar
        case 'edit':
          this.dao.change(this.elemento).subscribe(
            data => { this.cancel(); },
            error => {this.nsrv.add(error.message); }
          );
        break;
        // Caso en el que estando en el modo view se clicke en el send
        case 'view': this.cancel();
        break;
      }
    }
}

export class PersonasVMService {
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
          { id: 1, nombre: 'Pepe', apellidos: 'Gómez', edad: 34},
          { id: 2, nombre: 'José', apellidos: 'Pérez', edad: 155},
          { id: 3, nombre: 'Kiko', apellidos: 'Hernandez', edad: 50},
          { id: 4, nombre: 'Pedro', apellidos: 'Marmol', edad: 18},
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
