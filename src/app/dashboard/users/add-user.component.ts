import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	
  public id:any  = '';
	public form:any = {};
  //public form.otp:any = '';
  public formList:any = {};
  public errors:any = {};
  public responseData : any = {};
  public userPostObj : any = '';
  public showPopup = false;

  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
    
    this.form.country = 0;
    this.form.status = '1';
    this.form.country_id = 101;
    this.form.otp = '';
    this.form.designation = '1';
    this.userPostObj = this.apiService.userPosts;

    if(!this.apiService.isLogin()){
        this.router.navigate(["/login"]);
    }    
    this.activatedRoute.params.subscribe(params => {      
       this.id = params['id']; 
    });
  }

  /*showZeroId(){
    if(!this.id > 0 && this.isAdmin() && this.form.zero_id){
      return true;
    }
    return false;
  }*/

  ngOnInit() {    
    
    this.form.state_id = '0';
    this.form.city_id = '0';    

    if(this.id > 0 && this.isAdmin()){
      this.getSingleRecord(this.id);
    }else{
      this.getState(this.form.country_id);
      this.form.user_role = 2;      
      this.form.user_post = '3';
      this.form.gender = '1';
      this.id = '';

      if(this.isAdmin() == false){
        this.id =  parseInt(localStorage.getItem('id'),10);
        if(this.id > 0){
          this.getSingleRecord(0);
        }      
      }
    }
  }

  isAdmin(){
    return this.apiService.isAdmin();
  }

  isModrator(){
    return this.apiService.isModrator();
  }

  getSingleRecord(id){
    let request = this.apiService.getUser();
    if(this.isAdmin()){ 
        request = this.apiService.usersList();
    }
    request.search.id = id;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        if(this.isAdmin()){
          this.form = response.data[0].User;
          let parent_id = response.data[0].UserRelation[0].User.u_id;
          this.validateSponserId(parent_id);
          this.form.parent_u_id = parent_id;
        }else{
          this.form = response.data.User;
          this.form.parent_u_id = response.data.UserRelation[0].User.u_id;
        }
        
        this.getState(this.form.country_id);
        this.getCities(this.form.state_id);
        
      }else{
        this.errors = response.errors;
      }
    });
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

  resendSaveDataFn(){
    this.form.otp = '';
    this.form.otp_check = '';
    this.saveData();
  }

  saveData(){
    this.errors = {};
    
    if(this.form.otp && this.form.otp.length > 0){
      this.form.otp_check = '1';
    }
    let request = this.apiService.addUser();
    request.data = this.form;    
    this.apiService.submitRequest(request).subscribe( (res:any) => {
      let response =  this.apiService.parseResponse(res); 
      if(response.status == 'success'){
        if(this.form.otp_check == '1'){
          this.showPopup = false;
        }
        this.form.otp = '';
        this.form.otp_check = '';
        this.responseData = response.data;
        
        if(response.message && response.message.otp) {
          this.showPopup = true;
        }

        if(this.isAdmin() && !this.showPopup){
          this.router.navigate(["/dashboard/users"],{ queryParams:{'success':true}});
        }
        
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
