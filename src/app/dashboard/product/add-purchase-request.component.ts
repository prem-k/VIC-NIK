import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase-request',
  templateUrl: './add-purchase-request.component.html',
  styleUrls: ['./add-purchase-request.component.scss']
})
export class AddPurchaseRequestComponent implements OnInit {

  	  public id:any  = '';
	  public form:any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public productsList : any = [];
	  public selectedProduct : any = {};
	  public formData : any = {};

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.productsList = [];
	    this.selectedProduct = '';
	   	this.form.payment_mode = '1';
	   	this.form.receipt_image = {};
	   	this.form.receipt_image = {};
	   	this.formData = new FormData();

	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });
	  }

	  ngOnInit() {
	  	this.getProducts();
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{
	      this.form.product_id = '';
	      this.form.mode_transfer = '';	      
	      this.id = '';
	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getAllPurchaseRequest();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].UserPurchaseRequest;
	        this.form.receipt_image = {
	           fileData: this.form.receipt_image
	        };
	      }else{
	        this.errors = response.errors;
	      }
	    }); 
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.productsPurchaseRequest();
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
	        this.router.navigate(["/dashboard/products/purchase-request"],{ queryParams:{'success':true}});
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }	 


	  getProducts(){
	  	let request = this.apiService.getProducts();
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.productsList = response.data;
	      }else{
	        this.errors.productsList = response.errors;
	      }
	    });
	  }

	  setProDetails(){
	  	this.selectedProduct = this.form.productInfo;
	  } 

	 onFileChanged(event){
	    let reader = new FileReader();
	    if(event.target.files && event.target.files.length > 0) {
	        let file = event.target.files[0];
	        this.formData.append('receipt_image',file);
	        reader.readAsDataURL(file);
	        reader.onload = () => {
	          this.form.receipt_image = {
	            filename: file.name,
	            filetype: file.type,
	            fileData: reader.result
	          };
	        };
	    }
    }  
}
