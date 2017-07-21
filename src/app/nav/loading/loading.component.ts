import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() sidenav: any;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


}
