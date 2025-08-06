import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { AdminGuard } from './admin/admin.guard';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { OrderSuccessDialogComponent } from './checkout/order-success-dialog/order-success-dialog.component';

export const routes: Routes = [
  { 
    path: '', redirectTo: 'auth', pathMatch: 'full' 
  },
  { 
    path: 'auth', component: AuthComponent
  },
  {
    path: 'product', component: ProductListComponent
  },
  {
  path: 'products/:id',
  loadComponent: () =>
    import('./products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
  path: 'cart',
  loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
  path: 'checkout',
  loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'orders' , component: OrderHistoryComponent
  },
{ path: 'admin/products', component: ProductManagementComponent, canActivate: [AdminGuard] },
{ path: 'admin/orders', component: OrderManagementComponent, canActivate: [AdminGuard] },
{ path: 'about', component: AboutComponent },

{ path: 'forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
{ path: 'reset-password', loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
{ path: 'order-success/:orderId', component: OrderSuccessDialogComponent }

];



