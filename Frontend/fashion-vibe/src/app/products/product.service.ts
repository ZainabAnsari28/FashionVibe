import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from  '../shared/models/product.model'

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  filterProducts(category: string, size: string, minPrice: number, maxPrice: number): Observable<Product[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (size) params = params.set('size', size);
    if (minPrice != null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());

    return this.http.get<Product[]>(`${this.baseUrl}/filter`, { params });
}



}
