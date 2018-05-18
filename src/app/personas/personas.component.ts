import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasVMService } from './personas-vm.service';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(private vm: PersonasVMService) { }
   public get VM () { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }

}

@Component({
  selector: 'app-personas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasListComponent implements OnInit {

  constructor(private vm: PersonasVMService) { }
   public get VM () { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }

}

@Component({
  selector: 'app-personas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasAddComponent implements OnInit {

  constructor(private vm: PersonasVMService) { }
  public get VM () { return this.vm; }

  ngOnInit() {
    this.vm.add();
  }

}

@Component({
  selector: 'app-personas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasEditComponent implements OnInit {

  constructor(private vm: PersonasVMService) { }
   public get VM () { return this.vm; }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-personas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasViewComponent implements OnInit, OnDestroy {
  private obs$: any;

  constructor(private vm: PersonasVMService, private route: ActivatedRoute, private router: Router) { }
   public get VM () { return this.vm; }

    ngOnInit() {
        this.obs$ = this.route.paramMap.subscribe(
          params => {
            const id = +params.get('id'); // (+) converts string 'id' to a number
            if (id) {
            this.vm.view(id);
          } else {
            this.router.navigate(['/404.html']);
          }
        });
    }
   ngOnDestroy() { this.obs$.unsubscribe(); }
}

export const PERSONAS_COMPONENT = [PersonasComponent, PersonasListComponent, PersonasAddComponent,
  PersonasEditComponent, PersonasViewComponent, ];
