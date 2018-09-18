import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-kyc',
  templateUrl: './user-kyc.component.html',
  styleUrls: ['./user-kyc.component.scss']
})
export class UserKycComponent implements OnInit {

	public rowData : any = [];
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
	public type:any = 1;	

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    const queryParams = this.activatedRoute.snapshot.queryParams;
	    let success = queryParams.success;
	    if(success === 'true'){
	        this.successMsg = this.apiService.successMsg;
	    }	    
	}

	ngOnInit() {
		this.searchBy = 'u_id';
		this.resetSearchInputs();
		this.dataList('');		
	}

	resetSearchInputs(){
		this.searchText.u_id = '';
		this.searchText.aadhar_card_number = '';
		this.searchText.pan_card_number = '';
		this.searchText.start_time = '';
		this.searchText.end_time = '';
		this.searchText.status = '0';		
	}

	isAdmin(){
		return this.apiService.isAdmin();
	}

	allowAddKyc(){
		if(this.rowData.length >0 || this.isAdmin()){
			return false;
		}
		return true;
	}

	dataList(search){
		let request = this.apiService.getUserskyc();		
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
		this.dataList('');
	}

	changeStatus(id,status){
	    let request = this.apiService.changeKycStatus();    
	    request.data.id = id; 
	    request.data.status = status;
	    this.apiService.submitRequest(request).subscribe( (res:any) => {
	        let response =  this.apiService.parseResponse(res); 
	        if(response.status == 'success'){
	          this.successMsg = 'Status changed successfully';
	        } 
	    });
	}
	
}
