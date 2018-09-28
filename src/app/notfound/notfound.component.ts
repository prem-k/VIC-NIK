import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {  

  ngOnInit(){
     var body = document.getElementsByTagName('body')[0];
     body.classList.remove('header-fixed');
     body.classList.remove('sidebar-lg-show');
     body.classList.remove('sidebar-fixed');     
  }

  goback(){
    window.history.back();
  }

}
