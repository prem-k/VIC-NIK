import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form:any = {};
  public formList:any = {};
  public errors:any = {};
  public responseData : any = {};
  public userIsRegister = false;
  public registerUser : any = {};

  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
    
    this.form.country = 0;
    this.form.country_id = 101;
    this.form.otp = '';
  }

  ngOnInit() {    
    
    this.form.state_id = '0';
    this.form.city_id = '0';    

	this.getState(this.form.country_id);    
	
	this.form.gender = '1';
  }

  getCities(id){
    let request = this.apiService.getCities();
    request.search.state_id = id;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        this.formList.cityList = response.data;
      }else{
        this.errors = response.errors;
      }
    });
  }

  getState(id){
    let request = this.apiService.getStates();
    request.search.country_id = id;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        this.formList.stateList = response.data;
      }else{
        this.errors = response.errors;
      }
    });
  } 

  getCountries(id){
    let request = this.apiService.getCountries();
    request.search.id = id;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        this.formList.countryList = response.data;
      }else{
        this.errors = response.errors;
      }
    });
  }

  saveData(){
    this.errors = {};    
    let request = this.apiService.addUser();
    request.data = this.form;    
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        this.userIsRegister = true;
        this.registerUser = response.data.User;        
      }else{
        this.errors = response.errors;
      }
    });
  }

  /***************************************/

  validateSponserId(id){
    this.errors = {};
    this.form.sponsor_name = '';
    let request = this.apiService.getSponsorName();
    request.search['u_id'] = id;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        if(response.data){
          this.form.sponsor_name = response.data.User.first_name;
        }
      }else{
        this.errors = response.errors;
      }
    });
  }

}
