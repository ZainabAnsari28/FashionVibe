import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../shared/service/cart-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderSuccessDialogComponent } from './order-success-dialog/order-success-dialog.component';
import { OrderFailedDialogComponent } from './order-failed-dialog/order-failed-dialog.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  paymentForm!: FormGroup;
  cartItems: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient , private cartService: CartService , private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {}
  
  ngOnInit(): void {
  this.paymentForm = this.fb.group({
    method: ['', Validators.required],
    upiId: [''],
    cardNumber: [''],
    expiry: [''],
    cvv: ['']
  });

  this.cartService.getCartItems().subscribe({
    next: (items) => this.cartItems = items,
    error: (err) => console.error('Failed to load cart items:', err)
  });
}
getTotal(): number {
  return this.cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

submitPayment() {
  this.http.post<any>(`${environment.apiUrl}/orders/checkout`, this.paymentForm.value)
    .subscribe({
      next: (res) => {
        console.log('Response from backend:', res); 

        if (res && res.id) {
          this.dialog.open(OrderSuccessDialogComponent, {
            data: { orderId: res.id }, 
            width: '600px'
          });
        } else {
          console.error('Order ID not found in response:', res);
        }
      },
      error: (err) => {
        console.error('Payment failed:', err);
        this.dialog.open(OrderFailedDialogComponent, {
          width: '600px'
        });
      }
    });
}

}

