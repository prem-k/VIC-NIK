import { Injectable} from '@angular/core';
import { ConfigService } from './config.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ApiService {

	public apiLoader:boolean = false;
	public tdsCharge : Number = 0;
	public handlingCharge : Number = 0;
	public pageLimit:number = 10; 
	public baseUrl : any = '';
	public uploadPath : any = '';
	public genealogyLevel : Number = 0;

	public successMsg:any = 'Record Save';

	public userPosts:any = [
						{
							'id' : '1',
							'name' : 'Associate'
						},
						{
							'id' : '2',
							'name' : 'District Manager'
						},
						{
							'id' : '3',
							'name' : 'Regional Manager'
						},
						{
							'id' : '4',
							'name' : 'State Manager'
						},
						{
							'id' : '5',
							'name' : 'Senior Manager'
						},
						{
							'id' : '6',
							'name' : 'Chief Manager'
						}
					];

  	constructor(private http : Http, private configService : ConfigService) {
  		this.baseUrl = configService.apiUrl;
  		this.tdsCharge = this.configService.tdsCharge;
		this.handlingCharge = this.configService.handlingCharge;

  		this.uploadPath = this.configService.apiUrl.replace('index.php/','')+'assets/uploads/';
  	}  

  	isLogin(){
  		if(localStorage.getItem('access_token') !=''){
  			if(localStorage.getItem('access_token') == null){
  				return false;
  			}
  			return true;
  		}else{
  			return false;
  		}
  	}

  	isAdmin(){
  		var type = parseInt(localStorage.getItem('type'),10);
  		if(type == 1){
  			return true;
  		}
  		return false;
  	}

  	getToken(){
  		return localStorage.getItem('access_token');
  	}

  	filterData(data){
  		return data.json();
  	}

  	showApiLoader() {
  		return this.apiLoader;
  	}

  	submitRequest(aRequest){ 

	    setTimeout(() => {
			this.apiLoader = true;
		});

  		let headers  = new Headers({ 'Content-Type': 'application/json','token': this.getToken()}); // ... Set content type to JSON
       
		if(aRequest.method === 'POST'){
			//headers  = new Headers({ 'token': this.getToken()});
			let options  = new RequestOptions({ 
									headers: headers,
									search : Object.assign({},aRequest.search) 
							}); // Create a request option
			let body = JSON.stringify(aRequest.data);
			return this.http.post(aRequest.url, body, options);
		}else{
			let options  = new RequestOptions({ 
									headers: headers,
									search : Object.assign({},aRequest.search) 
							}); // Create a request option
			return this.http.get(aRequest.url,options);
		}
        
    }

    postRequest(aRequest){ 

    	setTimeout(() => {
			this.apiLoader = true;
		});

  		let headers  = new Headers({'token': this.getToken()}); // ... Set content type to JSON
		if(aRequest.method === 'POST'){
			let options  = new RequestOptions({ 
									headers: headers,
									search : Object.assign({},aRequest.search) 
							}); 
			return this.http.post(aRequest.url, aRequest.data, options);
		}else{
			let options  = new RequestOptions({ 
									headers: headers,
									search : Object.assign({},aRequest.search) 
							}); 
			return this.http.get(aRequest.url,options);
		}
        
    }

    parseResponse(res){
    	setTimeout(() => {
			this.apiLoader = false;
		});
    	if(res){
    		let response = res.json();
    		return response.apiResponse;
    	}
    	return {};
    }

    login(){
		return {
			url: this.baseUrl+'users/userLogin.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'u_id' : '',
				'password' : ''
				
			}
		};
	};

	addUser(){
		return {
			url: this.baseUrl+'users/register.json',
			method : 'POST',
			dataType: 'json',			
			data: {

			}
		};
	};

	usersList(){
		return {
			url: this.baseUrl+'users/getUsers.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				u_id : '0',
				designation : '',
				mobile_number : '',
				start_time : '0',
				end_time : '',				
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getUser(){
		return {
			url: this.baseUrl+'users/getUser.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				u_id : '0',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getSponsorName(){
		return {
			url: this.baseUrl+'users/getParentUser.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				u_id : '0',
			}
		};
	};

	addUpdateInquary(){
		return {
			url: this.baseUrl+'inquiries/addUpdateInquiry.json',
			method : 'POST',
			dataType: 'json',			
			data : {
			 type : '1',
			 message : ''
				
			}
		};
	};

	getInquries(){
		return {
			url: this.baseUrl+'Inquiries/getInquiries.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				key : '',
				type : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};	

	getCategories(){
		return {
			url: this.baseUrl+'products/getCategories.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	addUpdateCategory(){
		return {
			url: this.baseUrl+'products/addUpdateCategory.json',
			method : 'POST',
			dataType: 'json',			
			data: {

			}
		};
	};

	deleteCategories(){
		return {
			url: this.baseUrl+'products/deleteCategories.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getProducts(){
		return {
			url: this.baseUrl+'products/getProducts.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				status : '',
				limit : this.pageLimit	
			}
		};
	};

	addUpdateProduct(){

		return {
			url: this.baseUrl+'products/addUpdateProduct.json',
			method : 'POST',
			dataType: 'json',			
			data : {
			}
		};

	};

	addPopupPost(){
		return {
			url: this.baseUrl+'commons/addPopupPost.json',
			method : 'POST',
			dataType: 'json',			
			data: {

			}
		};
	};


	getPopupPost(){
		return {
			url: this.baseUrl+'commons/getPopupPost.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getCountries(){
		return {
			url: this.baseUrl+'commons/getCountries.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getStates(){
		return {
			url: this.baseUrl+'commons/getStates.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				country_id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getCities(){
		return {
			url: this.baseUrl+'commons/getCities.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				state_id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	getUserChildren(){
		return {
			url: this.baseUrl+'users/getUserChildren.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				user_id : '',
				u_id : '0',
				designation : '',
				first_name : '',
				mobile_number : '',
				start_time : '0',
				end_time : '', 
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	forgotPassword(){
		return {
			url: this.baseUrl+'users/forgotPassword.json',
			method : 'POST',
			dataType: 'json',			
			data : {
					
			}
		};
	};

	updatePassword(){
		return {
			url: this.baseUrl+'users/updatePassword.json',
			method : 'POST',
			dataType: 'json',			
			data : {
			}
		};
	};

	passwordExpireApi(){
		return {
			url: this.baseUrl+'users/updateUserPassword.json',
			method : 'POST',
			dataType: 'json',			
			data : {
			}
		};
	};

	getBanners(){
		return {
			url: this.baseUrl+'commons/getBanners.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				type : '1',
				status : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	addUpdateBanner(){
		return {
			url: this.baseUrl+'commons/addUpdateBanner.json',
			method : 'POST',
			dataType: 'json',			
			data : {
				type : '1'
			}
		};
	};

	getUserskyc(){
		return {
			url: this.baseUrl+'users/getUserskyc.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				user_id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	addUpdateUserKyc(){
		return {
			url: this.baseUrl+'users/addUpdateUserKyc.json',
			method : 'POST',
			dataType: 'json',			
			data: {

			}
		};
	};

	getAllPurchaseRequest(){
		return {
			url: this.baseUrl+'products/getAllPurchaseRequest.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	productsPurchaseRequest(){
		return {
			url: this.baseUrl+'products/productsPurchaseRequest.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : ''
			}
		};
	};

	statusUpdatePurchaseRequest(){
		return {
			url: this.baseUrl+'products/statusUpdatePurchaseRequest.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : '',
				'status' : ''
			}
		};
	};

	getAllPaymentRequest(){
		return {
			url: this.baseUrl+'commons/getAllPaymentRequest.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				limit : this.pageLimit	
			}
		};
	};

	addUpdatePaymentRequest(){
		return {
			url: this.baseUrl+'commons/addUpdatePaymentRequest.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : ''
			}
		};
	};

	getUserAccount(){
		return {
			url: this.baseUrl+'users/getUserAccount.json',
			method : 'GET',
			dataType: 'json',			
			search : {
				id : '',
				key : '',
				offset : 0,
				status : '',
				limit : this.pageLimit	
			}
		};
	};

	addUpdateAccount(){
		return {
			url: this.baseUrl+'users/addUpdateBankAccount.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : ''
			}
		};
	};

	changePopupPostStatus(){
		return {
			url: this.baseUrl+'commons/changePopupPostStatus.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : '',
				'status' : '1'
			}
		};
	};

	changeUserStatus(){
		return {
			url: this.baseUrl+'users/changeUserStatus.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'user_id' : '',
				'status' : '1'
			}
		};
	};

	changePaymentStatus(){
		return {
			url: this.baseUrl+'commons/changePaymentStatus.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : '',
				'user_id' : '',
				'status' : '1'
			}
		};
	};


	changeUserBankAccountStatus(){
		return {
			url: this.baseUrl+'users/changeUserBankAccountStatus.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'id' : '',
				'status' : ''
			}
		};
	};


	addUpdateNews(){
		return {
			url: this.baseUrl+'commons/addUpdateNews.json',
			method : 'POST',
			dataType: 'json',			
			data: {
				'title' : '',
				'description' : ''
			}
		};
	}

	getNews(){
		return {
			url : this.baseUrl+'commons/getNews.json',
			method : 'GET',
			dataType : 'json',			
			search : {
				id : 0,
				key : '',
				type : '',
				offset : 0,
				status : '',
				limit : this.pageLimit
			}
		};
	}

	changeNewsStatus(){
		return {
			url : this.baseUrl+'commons/changeNewsStatus.json',
			method : 'POST',
			dataType : 'json',			
			data : {
				'id' : '',
				'status' : ''
			}
		};
	}

	changeBannerStatus(){
		return {
			url : this.baseUrl+'commons/changeBannerStatus.json',
			method : 'POST',
			dataType : 'json',			
			data : {
				'id' : '',
				'type' : '1',
				'status' : ''
			}
		};
	}

	changeStatus(){
		return {
			url : this.baseUrl+'inquiries/changeStatus.json',
			method : 'POST',
			dataType : 'json',			
			data : {
				'id' : '',
				'type' : '1',
				'status' : ''
			}
		};
	}

	changeKycStatus(){
		return {
			url : this.baseUrl+'users/changekycStatus.json',
			method : 'POST',
			dataType : 'json',			
			data : {
				'id' : '',
				'status' : ''
			}
		};
	}

	getUserReport(){
		return {
			url : this.baseUrl+'commons/getUserReport.json',
			method : 'GET',
			dataType : 'json',			
			search : {
				
			}
		};
	}

	getUserWithdrawAmount(){
		return {
			url : this.baseUrl+'commons/getUserWithdrawAmount.json',
			method : 'GET',
			dataType : 'json',			
			search : {
				
			}
		};
	}
	
}