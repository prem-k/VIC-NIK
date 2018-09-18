import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRouteModule } from './dashboard-route.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { DefaultLayoutComponent } from '../dashboard/containers';


import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category.component';
import { TreeComponent } from './users/tree.component';
import { PopupPostComponent } from './popup-post/popup-post.component';
import { AddPostComponent } from './popup-post/add-post.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentComponent } from './payments/add-payment.component';
import { BannersComponent } from './banners/banners.component';
import { AddBannerComponent } from './banners/add-banner.component';

import { UserKycComponent } from './user-kyc/user-kyc.component';
import { AddKycComponent } from './user-kyc/add-kyc.component';

import { PurchaseRequestComponent } from './product/purchase-request.component';
import { AddPurchaseRequestComponent } from './product/add-purchase-request.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountsComponent } from './accounts/add-accounts.component';

import { BussinessComponent } from './bussiness/bussiness.component';
import { DirectSaleComponent } from './bussiness/direct-sale.component';

import { InvoiceComponent } from './invoice/invoice.component';

import { SliderComponent } from './slider/slider.component';
import { AddSliderComponent } from './slider/add-slider.component';

import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './news/add-news.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
/*import { NgDatepickerModule } from 'ng2-datepicker';
*/
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    DashboardRouteModule,
    FormsModule,
    AppAsideModule,
  	AppBreadcrumbModule.forRoot(),
  	AppHeaderModule,
  	AppFooterModule,
  	AppSidebarModule,
  	PerfectScrollbarModule,
  	TabsModule.forRoot(),
  ],
  declarations: [
    DefaultLayoutComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    HomeComponent,
    InquiryComponent,
    SuggestionComponent,
    ProductComponent,
    AddProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    TreeComponent,
    PopupPostComponent,
    AddPostComponent,
    ChangePasswordComponent,
    PaymentsComponent,
    AddPaymentComponent,
    BannersComponent,
    AddBannerComponent,
    UserKycComponent,
    AddKycComponent,
    PurchaseRequestComponent,
    AddPurchaseRequestComponent,
    AccountsComponent,
    AddAccountsComponent,
    BussinessComponent,
    DirectSaleComponent,
    InvoiceComponent,
    SliderComponent,
    AddSliderComponent,
    NewsComponent,
    AddNewsComponent
  ]
})
export class DashboardModule { }
