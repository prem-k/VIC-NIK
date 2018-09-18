import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor(private router: Router, 
		private apiService : ApiService, 
		private activatedRoute : ActivatedRoute) {
		
		if(!this.apiService.isLogin()){
			this.router.navigate(["/dashboard/login"]);
		}
		
	}

	ngOnInit() {

	}

}
