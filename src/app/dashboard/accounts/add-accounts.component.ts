import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.scss']
})
export class AddAccountsComponent implements OnInit {

	public id:any  = '';
	public form:any = {};
	public errors:any = {};
	public responseData : any = {};
	public userPostObj : any = '';
	public formData : any = {};

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.userPostObj = this.apiService.userPosts;
	    this.form.bank_copy_attachment = {};
	    if(!this.apiService.isLogin()){
	        this.router.navigate(["/login"]);
	    }    
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id']; 
	    });

	    this.formData = new FormData();
	}

	ngOnInit() {
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{	      
	      this.id = '';

	    }
	}

	getSingleRecord(id){
	    let request = this.apiService.getUserAccount();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	      	this.form = response.data[0].UserBankAccount;
	      	this.form.bank_copy_attachment = {
	           fileData: this.form.bank_copy_attachment
	        };	        
	      }else{
	        this.errors = response.errors;
	      }
	    });
	}

	saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateAccount();
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
	        this.router.navigate(["/dashboard/accounts"],{ queryParams:{'success':true}});
	      }else{
	        this.errors = response.errors;
	      }
	    });
	}

	attachedBankcopy(event){
      event.preventDefault();
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        this.formData.append('bank_copy_attachment',file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.bank_copy_attachment = {
            filename: file.name,
            filetype: file.type,
            fileData: reader.result
          };
        };
      }
    }

}
