import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  public rowData : any = [];
  public search : any = {};
  public p1:number = 1;
  public id:any  = '';
  public errors : any = '';
  public currentPage:number = 1;
  public searchBy:any = '';
  public searchText:any = {}; 
  public limit:number = this.apiService.pageLimit;
  public offset:number = 0;
  public total_records:number = 0;
  public successMsg : any = '';	
  public userPostObj : any = '';

  constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      let success = queryParams.success;
      this.userPostObj = this.apiService.userPosts;
      if(success === 'true'){
        this.successMsg = this.apiService.successMsg;
      }
      this.searchBy = 'u_id';
  }

	ngOnInit() {
		this.dataList();
    this.resetSearchInputs();
	}

  isAdmin(){
    return this.apiService.isAdmin();
  }

  resetSearchInputs(){
      this.searchText.u_id = '';
      //this.searchText.mobile_number = '';
      this.searchText.first_name = '';
      this.searchText.start_time = '';
      this.searchText.end_time = '';
      this.searchText.status = '0';
      this.searchText.designation = '3';
  }

	dataList(){
		let request = this.apiService.usersList();	
    if(this.searchBy == 'date'){
        request.search['start_time'] = this.searchText['start_time'];
        request.search['end_time'] = this.searchText['end_time'];
    }else{
        request.search[this.searchBy] = this.searchText[this.searchBy];
    }
     
    request.search.offset = this.offset;
		this.apiService.submitRequest(request).subscribe( (res:any) => {
  			let response =  this.apiService.parseResponse(res); 
  			if(response.status == 'success'){
  			 	this.rowData = response.data;
  			 	this.total_records = response.count; 
        }else{
         	this.errors = response.errors;
      	}
		});
	}

	onPageChange(pageNo){
    this.currentPage = pageNo;
    this.offset = ((this.currentPage - 1) * this.limit);
    this.dataList();
  }

  changeUserStatus(id,status){
    let request = this.apiService.changeUserStatus();    
    request.data.user_id = id; 
    request.data.status = status;
    this.apiService.submitRequest(request).subscribe( (res:any) => {
        let response =  this.apiService.parseResponse(res); 
        if(response.status == 'success'){
          this.successMsg = 'Status changed successfully';
        } 
    });
  }

}
