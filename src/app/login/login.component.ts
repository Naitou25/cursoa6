import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/seguridad.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  txtButon = 'Log In';
  txtUsuario = 'admin';
  txtPassword = 'P@$$w0rd';

  constructor(public login: LoginService, private nsrv: NotifyService) { }

  ngOnInit() {
    this.cambiaTexto();
  }

  logInOut() {
    if (this.login.isAutenticated) {
      this.login.logout();
      this.cambiaTexto();
    } else {
      this.login.login(this.txtUsuario, this.txtPassword).subscribe(
        data => {
          if (data) {
            this.cambiaTexto();
          } else {
            this.nsrv.add('Usuario o contraseña invalida.');
          }
        },
        err => { this.nsrv.add(err.message); }
      );
    }
  }

  private cambiaTexto() {
    this.txtButon = this.login.isAutenticated ? 'Log Out' : 'Log In';
  }
}

