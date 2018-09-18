import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-kyc',
  templateUrl: './add-kyc.component.html',
  styleUrls: ['./add-kyc.component.scss']
})
export class AddKycComponent implements OnInit {

	public id:any  = '';
	public form:any = {};
	public errors:any = {};
	public responseData : any = {};
	public userPostObj : any = '';
	public formData : any = {};

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.form.country = 0;
	    this.form.status = 0;
	    this.form.pan_card_attachment = {};
	    this.form.aadhar_card_attachment = {};	    
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
	    if(this.id > 0){
	      this.getSingleRecord(this.id);
	    }else{
	      this.form.user_role = 2;
	      this.form.gender = 1;
	      this.form.user_post = '3';
	      this.form.gender = '1';
	      this.id = '';

	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getUserskyc();
	    request.search.id = id;
	    //request.search.user_id = '2';
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].UserKyc;
	        this.form.aadhar_card_attachment = {
	           fileData: this.form.aadhar_card_attachment
	        };
	        this.form.pan_card_attachment = {
	           fileData: this.form.pan_card_attachment
	        };
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateUserKyc();
	    this.formData.append('pan_card_number',this.form.pan_card_number);
	    this.formData.append('aadhar_card_number',this.form.aadhar_card_number);
	    request.data = this.formData;

	    this.apiService.postRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.responseData = response.data;
	        this.router.navigate(["/dashboard/kyc"],{ queryParams:{'success':true}});
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
        this.formData.append('aadhar_card_attachment',file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.aadhar_card_attachment = {
            filename: file.name,
            filetype: file.type,
            fileData: reader.result
          };
        };
      }
    }  

    attachedPancard(event){
    	event.preventDefault();
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        this.formData.append('pan_card_attachment',file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.pan_card_attachment = {
            filename: file.name,
            filetype: file.type,
            fileData: reader.result
          };
        };
      }
    } 

}
