import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RegisterUserDAO, LoginService, User } from '../services/seguridad.service';
import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../agio-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public miForm: FormGroup;
  private model: User = new User();


  constructor(private dao: RegisterUserDAO, private nsrv:  NotifyService,
  private out: LoggerService, private router: Router, private login: LoginService) {
    function passwordMatchValidator(g: FormGroup) {
      return g.get('passwordValue').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
      }
  }

  ngOnInit() {
    /*const fa = new FormArray([]);
    this.model.roles.forEach(r => fa.push(
      new FormGroup({ role: new FormControl(r.role , Validators.required) })
    ));*/

    this.miForm = new FormGroup({
      idUsuario: new FormControl(''),
      password: new FormGroup({
        passwordValue: new FormControl('', Validators.minLength(2)),
        passwordConfirm: new FormControl('', Validators.minLength(2)),
      }, this.passwordMatchValidator),
      roles: new FormArray([])
      });
  }

  addRole() {
    (this.miForm.get('roles') as FormArray).push(
      new FormGroup({ role: new FormControl('Usuarios', Validators.required) })
    );
  }

  deleteRole(ind: number) {
      (this.miForm.get('roles') as FormArray).removeAt(ind);
  }

  send() {
    const data = this.miForm.value;
    this.model = (
      {
        idUsuario: data.idUsuario,
        password: data.password.value,
        nombre: data.nombre,
        roles: data.roles
      } as User);
    this.dao.add(this.model).subscribe(
      rslt => {
        this.login.login(data.idUsuario, data.password.passwordValue).subscribe(
          datos => {
            if (datos) {
              this.nsrv.add('Usuario registrado.', 'log');
              this.router.navigateByUrl('/');
            } else {
              this.nsrv.add('Error en el registro.');
            }
          },
          err => { this.nsrv.add(err.message); }
        );
      },
      err => { this.nsrv.add(err.message); }
    );
  }
}
