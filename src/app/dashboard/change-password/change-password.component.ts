import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public id:any  = '';
	public form:any = {};
	public passError:any = '';
	public responseData : any = {};
	public successMsg = '';

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {

		if(!this.apiService.isLogin()){
		    this.router.navigate(["/login"]);
		}    
		this.activatedRoute.params.subscribe(params => {      
		   this.id = params['id']; 
		});

		this.activatedRoute.queryParams.subscribe(params => {      
		    let success = params.success;
		    if(success === 'true'){
		    	this.form = {};
		        this.successMsg =  'Password Successfully Changed.';
		        setTimeout(()=>{  
			      	this.successMsg = '';
			     	this.router.navigate([], {
					  relativeTo: this.activatedRoute,
					  queryParams: {
					    success: null
					  }
					});
				}, 3000);
			}
		});
	}

	ngOnInit() {

	}	

	resetPasswordFn(myForm){
		this.passError = '';
		this.confirmError = false;	
		if(this.form.confirm_new_password !== this.form.new_password){
			this.confirmError = true;
			return ;
		}	
	    let request:any = this.apiService.updatePassword();
	    request.data = this.form;
	    this.apiService.submitRequest(request).subscribe((res : any) => {
	          let response =  this.apiService.parseResponse(res); 
	          if(response.status === 'success'){
	          	myForm.resetForm();	            
        		this.router.navigate([],{ queryParams:{'success':true}});
		      }else{
		      	if(response.errors[0]){
		      		this.passError = response.errors[0]['1025'];
		      	}else{
		      		this.passErrorLen = response.errors;
		      	}		            
	          }                  
	    });
	}

}
