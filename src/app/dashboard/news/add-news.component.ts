import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  public id:any  = '';
	  public form:any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public userPostObj : any = '';

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });
	  }

	  ngOnInit() {
	  	this.form.type = '1';
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{
	      this.id = '';
	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getNews();

	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].News;

	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateNews();

	    request.data = this.form;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.responseData = response.data;
	        this.router.navigate(["/dashboard/news"],{ queryParams:{'success':true}});

	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }
}
