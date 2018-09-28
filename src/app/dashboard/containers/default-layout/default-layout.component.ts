import { Component, Input, OnInit , HostListener} from '@angular/core';
import { adminNavItems, userNavItems } from '../../_nav';

import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  
  public tempNavItems = adminNavItems;
  public navItem : any = [];

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public showPopup : any = false;
  public popupData : any = {};

  constructor(private router: Router, private apiService : ApiService, 
              private activatedRoute : ActivatedRoute) {
  
    if(!this.apiService.isLogin()){
      this.router.navigate(["/dashboard/login"]);
    }

    this.navItem = userNavItems;

    if( this.isAdmin() ||  this.isModrator()) {
      this.navItem = adminNavItems;
    }

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });    
    
  }  
    
  @HostListener('window:keyup',['$event']) 
    keyEvent(event:KeyboardEvent){
      if(event.keyCode == 27){
        this.showPopup = false;
      }      
  }

  ngOnInit(){

    if(!this.isAdmin()) {
      this.getPopupPost();      
    }
  }

  changeOfRoutes(event){
    if(window.location.href.indexOf('tree') == -1){
      this.apiService.genealogyLevel = 0;
    }
  }

  isAdmin(){
    return this.apiService.isAdmin();
  }

  isModrator  (){
    return this.apiService.isModrator ();
  }

  logginAs(){
    return localStorage.name;
  }

  getPopupPost(){
    let request = this.apiService.getPopupPost();
    this.apiService.submitRequest(request).subscribe( (res:any) => {
        let response =  this.apiService.parseResponse(res); 
        if(response.status == 'success'){
          if(response.data && response.data.length > 0) {
            this.showPopup = true;
            this.popupData = response.data[0].PopupPost;
          }
        }
    });
  }


}
