import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public newsRowData : any = [];
  public errors : any = {};
  public profile : any = {};
  public bussiness:any = {};

    constructor(private router: Router, private apiService : ApiService, private activatedRoute : ActivatedRoute) {
        
    }

    ngOnInit() {
      this.dataList(); 
      this.getUser();
      this.getUserReport();
    }

    dataList() {
      let request = this.apiService.getNews();
      request.search.status = '1';
      this.apiService.submitRequest(request).subscribe( (res:any) => {
          let response =  this.apiService.parseResponse(res); 
          if(response.status == 'success'){
            this.newsRowData = response.data;
          }else{
            this.errors = response.errors;
          }
      });
    }

    getUser(){
        let request = this.apiService.getUser();        
        this.apiService.submitRequest(request).subscribe( (res:any) => {
          let response =  this.apiService.parseResponse(res); 
          if(response.status == 'success'){            
            this.profile = response.data;            
          }else{
            this.errors = response.errors;
          }
        });
    }

    getPost(id){
      for(let index in this.apiService.userPosts){
        if(this.apiService.userPosts[index].id == id){
          return this.apiService.userPosts[index].name;
        }
      }
    }

    getUserReport(){
      let request = this.apiService.getUserReport();
      this.apiService.submitRequest(request).subscribe( (res:any) => {
        let response =  this.apiService.parseResponse(res); 
        if(response.status == 'success'){
          this.bussiness = response.data;
        }else{
          this.errors = response.errors;
        }
      });
  }

}