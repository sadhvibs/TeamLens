import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) { }

  createProject(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getProjects(){
    return this.http.get(this.baseUrl);
  }

  getProjectMembers(){
    return this.http.get(`${this.baseUrl}/all`)
  }
}
