import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

	public email:any;
	public password:any;
	public loginError:any;
	public forgetPassword = false;
	public fg_email = '';
	public forgetPasswordError = '';
	public showPopup = false;
	public responseData : any = {};
	public errors:any = {};
	public form : any = {};
	public successMsg = '';


	constructor(private router: Router, private apiService : ApiService,
	 private activatedRoute : ActivatedRoute) { 

		this.activatedRoute.queryParams.subscribe(params => {      
		    let fPasswordSent = params.fPasswordSent;
		    if(fPasswordSent === 'true'){
		    	this.forgetPassword = false;
		    	this.form = {};
		        this.successMsg =  'Your new password has been sent on your registered mobile number.';
		        setTimeout(()=>{  
			      	this.successMsg = '';
			     	this.router.navigate([], {
					  relativeTo: this.activatedRoute,
					  queryParams: {
					    fPasswordSent: null
					  }
					});
				}, 3000);
			}

			let logout = params.logout;
		    if(logout === 'true'){
	          	localStorage.removeItem('access_token');
	          	localStorage.clear();
	          	this.router.navigate([], {
					  relativeTo: this.activatedRoute,
					  queryParams: {
					    logout: null
					  }
				});
				var body = document.getElementsByTagName('body')[0];
	    		body.classList.remove('header-fixed');
	    		body.classList.remove('sidebar-lg-show');
	    		body.classList.remove('sidebar-fixed');
		    }

		});

		if(this.apiService.isLogin()){
		    this.router.navigate(["/dashboard"]);
		}

		this.form.otp = '';
	    
	}

	setForgetPassword(status){
		this.forgetPassword = status;
	}

	ngOnInit() {

	}	

	ngDoCheck() {
	    // check if values changes
	}

	validateEmail(email ){
		return true;
	}

	resendForgetPasswordFn(){
		this.form.otp = '';
		this.form.otp_check = '';
		this.forgetPasswordFn();
	}

	forgetPasswordFn(){

		this.errors = {};
		if(this.form.otp && this.form.otp.length > 0){
	      this.form.otp_check = '1';
	    }
		this.forgetPasswordError = '';
	    let request:any = this.apiService.forgotPassword();
	    request.data.u_id = this.fg_email;
	    request.data.otp_check = this.form.otp_check;
	    request.data.otp = this.form.otp;
	    this.apiService.submitRequest(request).subscribe((res : any) => {
	          let response =  this.apiService.parseResponse(res); 
	          if(response.status === 'success'){
	            if(this.form.otp_check == '1'){
		          this.showPopup = false;
		        }
		        this.form.otp = '';
		        this.form.otp_check = '';
		        this.responseData = response.data;
		        
		        if(response.message && response.message.otp) {
		          this.showPopup = true;
		        }

		        if(!this.showPopup){
		          	//this.router.navigate(["/dashboard/login"],{ queryParams:{'fPasswordSent':true}});
		          	this.router.navigate([], {
					  relativeTo: this.activatedRoute,
					  queryParams: {
					    //...this.activatedRoute.snapshot.queryParams,
					    fPasswordSent: true
					  }
					});
		        }
	          }else{		            
	            this.errors = response.errors;
	          }                  
	    });
		
	}

	login(){

		this.errors = {};
		this.loginError = '';
		if(this.validateEmail(this.email)){
		    let request:any = this.apiService.login();
		    request.data.u_id = this.email;
		    request.data.password = this.password;
		    this.apiService.submitRequest(request).subscribe((res : any) => {
		          var data = this.apiService.parseResponse(res); 
		          if(data.status === 'success'){

		            let userInfo = data.data.User;
		            localStorage.setItem('access_token',data.token.value);
		            localStorage.setItem('id', userInfo.id);
		            localStorage.setItem('name', userInfo.first_name);
		            localStorage.setItem('type', userInfo.user_role);
		            localStorage.setItem('email', userInfo.email);
		            localStorage.setItem('phone', userInfo.mobile_number);
		            this.router.navigate(["/dashboard"]);
		            //this.router.navigateByUrl('/dashboard');
		          }else{
		            //this.loginError = 'Please check your login credantials.';
		            this.errors = data.errors;
		          }                  
		    });
		}
	}


	passwordExpire(){
		this.errors = {};
	    let request:any = this.apiService.passwordExpireApi();
	    request.data.u_id = this.email;
	    request.data.old_password = this.password;
	    this.apiService.submitRequest(request).subscribe((res : any) => {
	          let response =  this.apiService.parseResponse(res); 
	          if(response.status === 'success'){	            

        		this.successMsg =  'Your new password has been sent on your registered mobile number.';
		        setTimeout(()=>{  
			      	this.successMsg = '';
				}, 3000);


		      }else{		            
	            this.errors = response.errors;
	          }                  
	    });
	}

}
