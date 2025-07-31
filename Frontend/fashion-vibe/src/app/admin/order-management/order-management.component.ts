import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Order } from '../../shared/models/Order.Model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule
  ]
})

export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  dataSource = new MatTableDataSource<Order>();
  pageSize = 5;
  currentPage = 0;


  statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private adminService: AdminService) {}


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders().subscribe(data => {
      this.orders = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateStatus(orderId: number, status: string) {
    this.adminService.updateOrderStatus(orderId, status).subscribe(() => this.loadOrders());
  }

  
  get paginatedOrders(): Order[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.orders.slice(start, end);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}

