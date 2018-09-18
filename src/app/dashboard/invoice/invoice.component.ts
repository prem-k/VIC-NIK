import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public rowData : any = [];
  public search : any = {};
  public p1:number = 1;
  public id:any  = '';
  public errors : any = '';
  public currentPage:number = 1;
  public searchKey:any = ''; 
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
      this.search.by = 'text';
  }

	ngOnInit() {
		this.dataList();
    this.resetSearchInputs();
	}

  resetSearchInputs(){
      this.search.text = '';
      this.search.date_from = '';
      this.search.date_to = '';
      this.search.position = '3';
  }

	dataList(){
		let request = this.apiService.usersList();		
		request.search = this.search; 
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
