import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../shared/service/cart-service.service';
import { Product } from '../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['image' ,'name', 'price', 'quantity', 'total', 'actions'];
  cartItems: { product: Product; quantity: number }[] = [];


  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error('Failed to load cart items:', err)
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

increaseQuantity(item: any) {
  item.quantity++;
  this.cartService.updateQuantity(item.product.id, item.quantity).subscribe({
    error: err => console.error('Failed to update quantity:', err)
  });
}

decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
    this.cartService.updateQuantity(item.product.id, item.quantity).subscribe({
      error: err => console.error('Failed to update quantity:', err)
    });
  }
}
  removeItem(item: any) {
    this.cartService.removeItem(item.id).subscribe({
      next: () => this.loadCart(),
      error: err => console.error('Failed to remove item:', err)
    });
  }

 
  checkout() {
    this.router.navigate(['/checkout']);
  }

}
