import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(product: Product): Observable<any> {
    const body = {
      productId: product.id,
      quantity: 1
    };
    return this.http.post(`${this.baseUrl}/add`, body);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  removeItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${id}`);
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`http://localhost:8080/api/cart/update/${productId}`, quantity, { headers });
  }
}
