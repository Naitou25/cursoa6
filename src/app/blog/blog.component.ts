import { Component, OnInit } from '@angular/core';
import { BlogVMService } from './blog-vm.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private vmb: BlogVMService) { }
   public get VMB () { return this.vmb; }

  ngOnInit() {
    this.vmb.list();
  }

}

@Component({
  selector: 'app-blog-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private vmb: BlogVMService) { }
   public get VMB () { return this.vmb; }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-blog-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogAddComponent implements OnInit {

  constructor(private vmb: BlogVMService) { }
  public get VMB () { return this.vmb; }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-blog-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogEditComponent implements OnInit {

  constructor(private vmb: BlogVMService) { }
   public get VMB () { return this.vmb; }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-blog-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogViewComponent implements OnInit {

  constructor(private vmb: BlogVMService) { }
   public get VMB () { return this.vmb; }

  ngOnInit() {
  }

}

export const BLOG_COMPONENT = [BlogComponent, BlogListComponent, BlogAddComponent,
  BlogEditComponent, BlogViewComponent, ];
