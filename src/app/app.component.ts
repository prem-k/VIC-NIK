import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl : './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private apiService : ApiService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  showApiLoader() {
    return this.apiService.showApiLoader();
  }

}
