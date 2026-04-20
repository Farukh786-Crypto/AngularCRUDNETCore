import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeMst } from '../models/EmployeeMst';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = 'https://localhost:7261/api/';

  // inject HttpClient in constructor
  //private http = Inject(HttpClient);
  constructor(private http: HttpClient) {


  }

  getEmployees() {
    return this.http.get(`${this.baseUrl}Employees/GetEmployeeList`);
  }

  getEmployeeById(empId: number) {
    return this.http.get(`${this.baseUrl}Employees/GetEmployeeListById/${empId}`);
  }

  addEmployee(employee: EmployeeMst) {
    debugger
    return this.http.post(`${this.baseUrl}Employees`, employee);
  }

  updateEmployee(employee: EmployeeMst) {
    return this.http.put(`${this.baseUrl}Employees`, employee);
  }

  deleteEmployee(empId: number) {
    return this.http.delete(`${this.baseUrl}Employees/${empId}`);
  }

}
