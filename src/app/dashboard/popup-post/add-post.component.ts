import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

	  public id:any  = '';
	  public form:any = {};
	  public errors:any = {};
	  public responseData : any = {};
	  public userPostObj : any = '';
	  public formData : any = {};
	  public image_path : any = {};

	  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    
	    this.form.temp_image = {};
	    this.form.temp_image.fileData = '';
	    this.formData = new FormData();

	    this.userPostObj = this.apiService.userPosts;

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
	    let request = this.apiService.getPopupPost();
	    request.search.id = id;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	      let response =  this.apiService.parseResponse(res); 
	      if(response.status == 'success'){
	        this.form = response.data[0].PopupPost;
	        this.form.temp_image = {
	           fileData: this.form.image_path
	        };
	      }else{
	        this.errors = response.errors;
	      }
	    });
	  }

	  saveData(){
	    this.errors = {};
	    let request = this.apiService.addPopupPost();
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
	        this.router.navigate(["/dashboard/popup-post"],{ queryParams:{'success':true}});
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
        this.image_path = file; 
        
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
