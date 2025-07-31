import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, userData, { responseType: 'text' });
  }

  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials);
  }

  forgotPassword(data: { email: string }): Observable<string> {
  return this.http.post(`${this.baseUrl}/forgot-password`, data, { responseType: 'text' });
}

resetPassword(data: { token: string, newPassword: string }): Observable<string> {
  return this.http.post(`${this.baseUrl}/reset-password`, data, { responseType: 'text' });
}

}
