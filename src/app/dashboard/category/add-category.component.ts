import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

	  public id:any  = '';
	  public form:any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public userPostObj : any = '';

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.form.country = 0;
	    this.form.status = 0;
	    this.userPostObj = this.apiService.userPosts;

	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });
	  }

	  ngOnInit() {
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{
	      this.form.user_role = 2;
	      this.form.gender = 1;
	      this.form.user_post = '3';
	      this.form.gender = '1';
	      this.id = '';

	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getCategories();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].Category;
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateCategory();
	    request.data = this.form;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.responseData = response.data;
	        this.router.navigate(["/dashboard/category"],{ queryParams:{'success':true}});
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  /***************************************/

	  validateSponserId(id){
	    this.errors = {};
	    this.form.sponsor_name = '';
	    let request = this.apiService.usersList();
	    request.search['u_id'] = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form.sponsor_name = response.data[0].User.first_name;
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }
  
}
