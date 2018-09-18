import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  	  public id:any  = '';
	  public form:any = {};
	  public account : any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public userPostObj : any = '';
	  public accountsList : any = '';
	  public showPopup = false;
	  public withdrawAmount : any= {};
	  public tdsCharge : any = 0;
	  public handlingCharge : any = 0;
	  public finalAmount : any = '';

	  public tdsAmount : any = '';
	  public handlingChargeAmount : any = '';

	  public userData : any = {};


	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.userPostObj = this.apiService.userPosts;
	    this.tdsCharge = this.apiService.tdsCharge;
		this.handlingCharge = this.apiService.handlingCharge;

	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });
	  }

	  isAdmin(){
	    return this.apiService.isAdmin();
	  }

	  finalAmountFn(amount){
	  	this.tdsAmount = (amount * this.tdsCharge)/100;
	  	this.handlingChargeAmount = (amount * this.handlingCharge)/100;
	  	this.finalAmount = (amount - (this.tdsAmount + this.handlingChargeAmount));
	  }

	  ngOnInit() {
	  	this.getUserAccounts(0);
	  	this.getUserWithdrawAmount();
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{	      
	      this.id = '';
	      this.form.account_id = 0;
	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getAllPaymentRequest();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].UserBankAccount;
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
	  	if(this.form.otp && this.form.otp.length > 0){
	      this.form.otp_check = '1';
	    }
	    this.errors = {};
	    let request = this.apiService.addUpdatePaymentRequest();
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

	        if(!this.showPopup){
	          this.router.navigate(["/dashboard/payments"],{ queryParams:{'success':true}});
		    }

	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

    /***************************************/

	getUserAccounts(id:0){
	    let request = this.apiService.getUserAccount();
	    if(id > 0){
	    	request.search.id = id.toString();
	    }
	    request.search.status = "1";
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	      	if(id>0){
	      		this.userData = response.data[0].User;
	      		this.account = response.data[0].UserBankAccount;
	      		this.account.pan_number = response.data[0].User.pan_no;
	      		this.form.user_bank_account_id = this.account.id;
	      	}else{
	        	this.accountsList = response.data;
	    	}
	      }else{
	        this.errors = response.errors;
	      }
	    });
	}

	getAccountDetails(id){
		this.account = {};
		this.account.pan_number = '';
		this.form.user_bank_account_id = '';
	    this.getUserAccounts(id);
	}

	getUserWithdrawAmount(){
		let request = this.apiService.getUserWithdrawAmount();
		this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	      	this.withdrawAmount = response.data;
	      }else{
	        this.errors = response.errors;
	      }
	    });
	}

}
