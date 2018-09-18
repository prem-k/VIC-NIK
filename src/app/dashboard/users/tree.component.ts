import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

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
	public search : any = {};	
	public user_income : any = {};

	public genealogyLevel:Number = this.apiService.genealogyLevel;

	constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
	    const queryParams = this.activatedRoute.snapshot.queryParams;
	    let success = queryParams.success;
	    if(success === 'true'){
	        this.successMsg = this.apiService.successMsg;
	    }

	    this.search.by = 'text'; 
	    this.activatedRoute.params.subscribe(params => {      
	       this.id = params['id'];
	       this.dataList(); 
	    });
	}

	goBack(){
		this.apiService.genealogyLevel--;
		history.back();
	}

	incrementGenealogyLevel(){
		this.apiService.genealogyLevel++;
	}

	getGenealogyLevel(){
		return this.apiService.genealogyLevel;
	}

	resetSearchInputs(){
		this.searchText.u_id = '';
		this.searchText.mobile_number = '';
		this.searchText.start_time = '';
		this.searchText.end_time = '';
		this.searchText.status = '0';
		this.searchText.designation = '3';
  	}

	ngOnInit() {
		this.searchBy = 'u_id';
		this.resetSearchInputs();
		this.dataList();		
	}

	isAdmin(){
		return this.apiService.isAdmin();
	}

	dataList(){
		let request = this.apiService.getUserChildren();
		if(this.searchBy == 'date'){
	        request.search['start_time'] = this.searchText['start_time'];
	        request.search['end_time'] = this.searchText['end_time'];
	    }else{
	        request.search[this.searchBy] = this.searchText[this.searchBy];
	    }
		request.search.user_id = this.id; 
      	request.search.offset = this.offset;
		this.apiService.submitRequest(request).subscribe( (res:any) => {
  			let response =  this.apiService.parseResponse(res); 
  			if(response.status == 'success'){
  			 	this.rowData = response.data;
  			 	this.user_income = response.user_income;
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

}
