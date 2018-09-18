import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../dashboard/containers';

import { CommonModule } from '@angular/common';

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

const routes: Routes = [
	{
		path : 'dashboard',
		component : DefaultLayoutComponent,
		children : 	[
			{ 
				path: '', 
				component : HomeComponent,
				data : {
					title : 'Dashboard'
				}
			},
			{ 
				path : 'home',
				component : HomeComponent,
				data : {
					title : 'Dashboard'
				} 
			},
			/*{ 
				path : 'login', 
				component : LoginComponent,
				data : {
					title : 'Login'
				}  
			},*/
			{ 
				path : 'users', 
				component : UsersComponent,
				data : {
					title : 'Users'
				} 
			},
			{ 
				path : 'users/add', 
				component : AddUserComponent,
				data : {
					title : 'Add User'
				} 
			},
			{ 
				path : 'users/add/:id', 
				component : AddUserComponent,
				data : {
					title : 'Edit User'
				} 
			},
			{ 
				path : 'users/my-profile', 
				component : AddUserComponent,
				data : {
					title : 'My Profile'
				} 
			},
			{ 
				path : 'users/tree', 
				component : TreeComponent,
				data : {
					title : 'Genealogy'
				} 
			},
			{ 
				path : 'users/tree/:id', 
				component : TreeComponent,
				data : {
					title : 'Genealogy Child'
				} 
			},
			{ 
				path : 'enquiry', 
				component : InquiryComponent,
				data : {
					title : 'Enquiry'
				} 
			},
			{ 
				path : 'suggestion', 
				component : SuggestionComponent,
				data : {
					title : 'Enquiry'
				} 
			},
			{ 
				path : 'products', 
				component : ProductComponent,
				data : {
					title : 'Product'
				} 
			},
			{ 
				path : 'products/add', 
				component : AddProductComponent,
				data : {
					title : 'Add Product'
				} 
			},
			{ 
				path : 'products/add/:id', 
				component : AddProductComponent,
				data : {
					title : 'Edit Product'
				} 
			},
			{ 
				path : 'products/purchase-request', 
				component : PurchaseRequestComponent,
				data : {
					title : 'Purchase Request'
				} 
			},
			{ 
				path : 'products/purchase-request/add', 
				component : AddPurchaseRequestComponent,
				data : {
					title : 'Add Purchase Request'
				} 
			},
			{ 
				path : 'products/purchase-request/add/:id', 
				component : AddPurchaseRequestComponent,
				data : {
					title : 'Edit Purchase Request'
				} 
			},
			{ 
				path : 'category', 
				component : CategoryComponent,
				data : {
					title : 'Category'
				} 
			},
			{ 
				path : 'category/add', 
				component : AddCategoryComponent,
				data : {
					title : 'Add Category'
				} 
			},
			{ 
				path : 'category/add/:id', 
				component : AddCategoryComponent,
				data : {
					title : 'Edit Category'
				} 
			},
			{ 
				path : 'popup-post', 
				component : PopupPostComponent,
				data : {
					title : 'Popup Post'
				} 
			},
			{ 
				path : 'popup-post/add', 
				component : AddPostComponent,
				data : {
					title : 'Add Post'
				} 
			},
			{ 
				path : 'popup-post/add/:id', 
				component : AddPostComponent,
				data : {
					title : 'Add Post'
				} 
			},
			{ 
				path : 'payments', 
				component : PaymentsComponent,
				data : {
					title : 'Payments'
				} 
			},
			{ 
				path : 'payments/add', 
				component : AddPaymentComponent,
				data : {
					title : 'Add Payment'
				} 
			},
			{ 
				path : 'payments/add/?id', 
				component : AddPaymentComponent,
				data : {
					title : 'Edit Payment'
				} 
			},
			{ 
				path : 'change-password', 
				component : ChangePasswordComponent,
				data : {
					title : 'Change Password'
				} 
			},
			{ 
				path : 'banners', 
				component : BannersComponent,
				data : {
					title : 'Banners'
				} 
			},
			{ 
				path : 'banners/add', 
				component : AddBannerComponent,
				data : {
					title : 'Add Banner'
				} 
			},
			{ 
				path : 'banners/add/:id', 
				component : AddBannerComponent,
				data : {
					title : 'Edit Banner'
				} 
			},
			{ 
				path : 'kyc', 
				component : UserKycComponent,
				data : {
					title : 'User Kyc'
				} 
			},
			{ 
				path : 'kyc/add', 
				component : AddKycComponent,
				data : {
					title : 'Add Kyc'
				} 
			},
			{ 
				path : 'kyc/add/:id', 
				component : AddKycComponent,
				data : {
					title : 'Edit Kyc'
				} 
			},
			{ 
				path : 'accounts', 
				component : AccountsComponent,
				data : {
					title : 'Accounts'
				} 
			},
			{ 
				path : 'accounts/add', 
				component : AddAccountsComponent,
				data : {
					title : 'Add Account'
				} 
			},
			{ 
				path : 'accounts/add/:id', 
				component : AddAccountsComponent,
				data : {
					title : 'Edit Account'
				} 
			},
			{ 
				path : 'purchase-summary', 
				component : BussinessComponent,
				data : {
					title : 'Purchase Summary'
				} 
			},
			{ 
				path : 'direct-sale', 
				component : DirectSaleComponent,
				data : {
					title : 'Direct Sale'
				} 
			},
			{ 
				path : 'invoice', 
				component : InvoiceComponent,
				data : {
					title : 'Invoice'
				} 
			},
			{ 
				path : 'slider', 
				component : SliderComponent,
				data : {
					title : 'Slider'
				} 
			},
			{ 
				path : 'slider/add', 
				component : AddSliderComponent,
				data : {
					title : 'Add Slider'
				} 
			},
			{ 
				path : 'slider/add/:id', 
				component : AddSliderComponent,
				data : {
					title : 'Edit Slider'
				} 
			},
			{ 
				path : 'news', 
				component : NewsComponent,
				data : {
					title : 'News'
				} 
			},
			{ 
				path : 'news/add', 
				component : AddNewsComponent,
				data : {
					title : 'Add News'
				} 
			},
			{ 
				path : 'news/add/:id', 
				component : AddNewsComponent,
				data : {
					title : 'Edit News'
				} 
			}
		] 
	}
];	


@NgModule({
  imports: [
	RouterModule.forChild(routes), 
	CommonModule
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class DashboardRouteModule { }  

/*let dashboardRouteComponentArr:any = [];
for (let key in routes){
	if(routes[key].component){
		dashboardRouteComponentArr.push(routes[key].component);
		if(routes[key].children && routes[key].children.length > 0){
			for (let childKey in routes[key].children){
				dashboardRouteComponentArr.push(routes[key].children[childKey].component);
			}
		}
	}	
}
export const dashboardRoutingComponents = dashboardRouteComponentArr;*/
