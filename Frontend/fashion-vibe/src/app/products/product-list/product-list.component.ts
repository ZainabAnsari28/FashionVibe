import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../product-list/filter-dialog/filter-dialog.component';
import { MatOptionModule } from '@angular/material/core';


@Component({
  standalone : true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule
  ] })
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  isFilterApplied: boolean = false;
  sortOption: string = '';
  constructor( private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

applyFilters(filters?: any): void {
  const query = this.searchQuery.toLowerCase().trim();

  this.filteredProducts = this.products.filter(product => {
    const matchesSearch = !query || product.name.toLowerCase().includes(query);
    const matchesCategory = !filters?.category || product.category === filters.category;
    const matchesSize = !filters?.size || product.size === filters.size;
    const matchesPrice = !filters?.maxPrice || product.price <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesSize && matchesPrice;
  });

  this.sortOption = filters?.sortOption || '';
  this.sortProducts();

  this.isFilterApplied = !!query || !!filters?.category || !!filters?.size || !!filters?.maxPrice || !!filters?.sortOption;
}


sortProducts(): void {
  if (this.sortOption === 'lowToHigh') {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  } else if (this.sortOption === 'highToLow') {
    this.filteredProducts.sort((a, b) => b.price - a.price);
  }
}
clearFilters(): void {
  this.searchQuery = '';
  this.filteredProducts = [...this.products];
  this.isFilterApplied = false;
}

openFilterDialog(): void {
  const dialogRef = this.dialog.open(FilterDialogComponent, {
    width: '300px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.sortOption = result.sortOption;  
      this.applyFilters(result);            
      this.sortProducts();                  

      this.isFilterApplied = !!this.searchQuery.trim() || !!result.category || !!result.size || !!result.maxPrice || result.sortOption;
    }
  });
}}
