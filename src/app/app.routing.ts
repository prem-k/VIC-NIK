import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
// Import Containers
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './dashboard/login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [  
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Site Home'
    }
  },
  {
    path: 'dashboard/login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'dashboard/register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  }, 
  {
    path: '404',
    component: NotfoundComponent,
    data: {
      title: '404 Not Found'
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }/*,
  { 
    path: '**', 
    redirectTo: '404' 
  }*/
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true/*, enableTracing: true */ })
  ],
  exports : [
  RouterModule,
  BrowserModule
  ],
  declarations: []
})
export class AppRoutesModule { 

  constructor(private router: Router) { 
    this.router.errorHandler = (error: any) => { 
        this.router.navigate(['404']); // or redirect to default route
    } 
  }

};

/*export const routing = RouterModule.forRoot(routes,{ useHash: true });

let routeComponentArr:any = [];
for (let key in routes){
  if(routes[key].component){
    routeComponentArr.push(routes[key].component);
    if(routes[key].children && routes[key].children.length > 0){
      for (let childKey in routes[key].children){
        routeComponentArr.push(routes[key].children[childKey].component);
      }
    }
  } 
}

export const routingComponents = routeComponentArr;*/
