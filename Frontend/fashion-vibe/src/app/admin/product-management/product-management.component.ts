import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
imports: [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
MatTooltipModule,
FormsModule

]


})
export class ProductManagementComponent implements OnInit {
  
  dataSource = new MatTableDataSource<Product>();

  displayedColumns = ['id', 'name', 'price', 'category', 'size', 'actions'];
  searchQuery: string = '';


  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
  const term = filter.toLowerCase();
  return data.name.toLowerCase().includes(term) || data.price.toString().includes(term);
};

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadProducts() {
   this.adminService.getProducts().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

applyFilters() {
  this.dataSource.filter = this.searchQuery.trim().toLowerCase();
}


}
