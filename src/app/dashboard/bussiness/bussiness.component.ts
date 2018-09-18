import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

	public bussiness:any = {};
	public errors : any = {};

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	
	}

	ngOnInit() {
	  	this.getUserReport();
	}

	getUserReport(){
	    let request = this.apiService.getUserReport();
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.bussiness = response.data;
	      }else{
	        this.errors = response.errors;
	      }
	    });
	}

}
