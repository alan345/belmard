import {Component, OnInit, Input} from '@angular/core';
import { GlobalEventsManager } from '../../globalEventsManager';

// import {Router} from '@angular/router';

@Component({
  selector: 'app-loadingInApp',
  templateUrl: './loadingInApp.component.html',
  styleUrls: ['./loadingInApp.component.css']
})
export class LoadingInAppComponent implements OnInit {
  // @Input() sidenav: any;
  @Input() loading = false;

  constructor(
    // private authService: AuthService,
    private globalEventsManager: GlobalEventsManager,
    // private router: Router,
  ) {
    this.globalEventsManager.isLoaddingEmitter.subscribe((mode) => {
        if (mode !== null) {
          this.loading = mode;
        }
    });
  }


  ngOnInit() {}


}
