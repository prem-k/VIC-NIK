import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { ConfigService } from './config.service';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';

// Import containers
import { DashboardModule } from './dashboard/dashboard.module';

// Import routing module
import { AppRoutesModule } from './app.routing';

// Import 3rd party components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './dashboard/login/login.component';
import { RegisterComponent } from './register/register.component';

/*import { NgDatepickerModule } from 'ng2-datepicker';*/

const APP_CONTAINERS = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent
];


@NgModule({
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule,
    HttpModule,
    DashboardModule,
    NgxPaginationModule
  ],
  declarations: [
    ...APP_CONTAINERS
  ],
  providers: [ ConfigService,ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
