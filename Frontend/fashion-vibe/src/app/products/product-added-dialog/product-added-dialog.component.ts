import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product-added-dialog',
  templateUrl: './product-added-dialog.component.html',
  styleUrls: ['./product-added-dialog.component.scss'],
  imports:[MatButtonModule],
  standalone: true
})

export class ProductAddedDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ProductAddedDialogComponent>,
    private router: Router
  ) {}

  goToCart() {
    this.dialogRef.close();
    this.router.navigate(['/cart']);
  }

  addMoreProducts() {
    this.dialogRef.close();
    this.router.navigate(['/product']);
  }
}
