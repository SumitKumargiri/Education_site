import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  apiUrl="https://localhost:7166/api/Admin";

  apiUrlLogin = 'https://localhost:7166';

  
  constructor(private http:HttpClient) { }


  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }

 
  searchStudentById(studentId: number): Observable<Student> {
    const searchUrl = `${this.apiUrl}/${studentId}`;
    return this.http.get<Student>(searchUrl);
  }


  deleteStudent(studentId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${studentId}`;
    return this.http.delete(deleteUrl);
  }
 

  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlLogin}/Login/login`,data);
  }



  register(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlLogin}/Login/register`,data);
  }

}
