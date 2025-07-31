import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/service/order.service'; // adjust path as needed
import { Order } from '../shared/models/Order.Model';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../shared/models/OrderItem.Model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  imports: [CommonModule] 
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  paginatedOrders: Order[] = [];

  currentPage = 1;
  pageSize = 4; 
  totalPages = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.totalPages = Math.ceil(this.orders.length / this.pageSize);
        this.updatePaginatedOrders();
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  updatePaginatedOrders(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedOrders = this.orders.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedOrders();
    }
  }

  calculateTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

}
