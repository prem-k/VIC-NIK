import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

	public id:any  = '';
	public form:any = {};
	public errors:any = {};
	public responseData : any = {};
	public userPostObj : any = '';
	public categoryList : any = {};
	public formData : any = {};
	public temp_image : any = {};
	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.form.country = 0;
	    this.temp_image = {};
	    this.form.status = '1';
	    this.userPostObj = this.apiService.userPosts;
	    this.formData = new FormData();

	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });
	}

	ngOnInit() {
		this.getCategories();

	    if(this.id > 0){
			this.getSingleRecord(this.id);
	    }else{
	    	this.id = '';	    	
			this.form.user_role = 2;
			this.form.gender = 1;
			this.form.user_post = '3';
			this.form.gender = '1';			
			this.form.category_id = '';
	    }
	  }

	  getCategories(){
	    let request = this.apiService.getCategories();
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.categoryList = response.data;
	      }else{
	        this.errors.category = response.errors;
	      }
	    });
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getProducts();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].Product;
	        this.temp_image = {
	           fileData: this.form.image
	        };
	      }else{
	        this.errors = response.errors;
	      } 
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateProduct();
	    for(let index in this.form){
	    	if(this.form[index]){
	    		this.formData.append(index,this.form[index]);
	    	}
		}
	    request.data = this.formData;
	    this.apiService.postRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.responseData = response.data;
	        this.router.navigate(["/dashboard/products"],{ queryParams:{'success':true}});
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	/***************************************/

	onFileChanged(event){
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        this.form.image = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.temp_image = {
            filename: file.name,
            filetype: file.type,
            fileData: reader.result
          };
        };
      }
    }

}
