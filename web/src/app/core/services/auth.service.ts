import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  userRegister(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}
