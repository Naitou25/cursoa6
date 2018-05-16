import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public srv: NotifyService) { }

  ngOnInit() {
  }

}
