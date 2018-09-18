import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

	  public id:any  = '';
	  public form:any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public userPostObj : any = '';
	  public formData : any = {};

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.form.status = '1';
	    this.form.temp_image = {};
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
	      this.id = '';

	    }
	  }

	  getSingleRecord(id){
	    let request = this.apiService.getBanners();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].Banner;
	        this.form.temp_image = {
	           fileData: this.form.image
	        };
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addUpdateBanner();
	    this.formData.append('id',this.id);
	    this.formData.append('type','1');
	    this.formData.append('title',this.form.title);
	    this.formData.append('status',this.form.status);

	    request.data = this.formData;

	    this.apiService.postRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.responseData = response.data;
	        this.router.navigate(["/dashboard/banners"],{ queryParams:{'success':true}});
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
	    this.formData.append('image',file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.temp_image = {
            filename: file.name,
            filetype: file.type,
            fileData: reader.result
          };
        };
      }
    }  


}
