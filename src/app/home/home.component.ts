import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public sliderList : any = [];
	public bannerList : any = [];
	public newsList : any = [];  
	public productsList : any = [];
	public enquiryForm : any = {};
	public enquirySend = false;
	public errors : any = {};

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {

	}

	ngOnInit() {
		this.getSliders();
		this.getBanners();
		this.getNews();
		this.getProducts();
	}

	getSliders(){
	    let request = this.apiService.getBanners();	
		request.search.type = '2'; 
		request.search.status = '1'; 
		this.apiService.submitRequest(request).subscribe( (res:any) => {
			let response =  this.apiService.parseResponse(res); 
			if(response.status == 'success'){
			 	this.sliderList = response.data;
		    }else{
		     	this.errors = response.errors;
		  	}
		});
	}

	getBanners(){
	    let request = this.apiService.getBanners();	
		request.search.type = '1'; 
		request.search.status = '1'; 
		this.apiService.submitRequest(request).subscribe( (res:any) => {
			let response =  this.apiService.parseResponse(res); 
			if(response.status == 'success'){
			 	this.bannerList = response.data;
		    }else{
		     	this.errors = response.errors;
		  	}
		});
	}

	getNews(){
	    let request = this.apiService.getNews();
		request.search.type = '1'; 
		request.search.status = '1'; 
		this.apiService.submitRequest(request).subscribe( (res:any) => {
			let response =  this.apiService.parseResponse(res); 
			if(response.status == 'success'){
			 	this.newsList = response.data;
		    }else{
		     	this.errors = response.errors;
		  	}
		});
	}

	getProducts(){
		let request = this.apiService.getProducts();
  
      	request.search.status = '1';
		this.apiService.submitRequest(request).subscribe( (res:any) => {
  			let response =  this.apiService.parseResponse(res); 
  			if(response.status == 'success'){
  			 	this.productsList = response.data; 
        }else{
         	this.errors = response.errors;
      	}
		});
	}

  	addNewInquiry(){
		this.errors = {};
		let request = this.apiService.addUpdateInquary();
		request.data = this.enquiryForm;	
		request.data.type = '1';
		this.apiService.submitRequest(request).subscribe( (res:any) => {
  			let response =  this.apiService.parseResponse(res); 
  			if(response.status == 'success'){
  			 	this.enquirySend = true;
  			 	this.enquiryForm = {};
        	}else{
         		this.errors = response.errors;
      		}
		});
	}

}
