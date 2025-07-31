import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product.model';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/service/cart-service.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddedDialogComponent } from '../product-added-dialog/product-added-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';


@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule, MatCardModule, RouterModule, MatButtonModule, MatDialogModule]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => (this.product = data),
        error: (err) => console.error('Error loading product:', err)
      });
    }
  }
  
addToCart() {
  this.cartService.addToCart(this.product).subscribe({
    next: () => {
      this.dialog.open(ProductAddedDialogComponent, {
        width: '300px'
      });
    },
    error: err => console.error('Failed to add to cart:', err)
  });
}



}
