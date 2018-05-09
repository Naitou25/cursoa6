import { Component, OnInit } from '@angular/core';
import { NotifyService } from './services/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hola mundo';

  constructor(private ns: NotifyService) {
  }
  ngOnInit(): void {
    this.ns.add('Demo error en AppComponent');
  }
}
