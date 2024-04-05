import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EmployeeModel } from '../model/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private http = inject(HttpClient);

list(){
  return this.http.get<EmployeeModel[]>("http://localhost:8080/api/castor/v1/employee/all");
}

get(id: number){
  return this.http.get<EmployeeModel>(`http://localhost:8080/api/castor/v1/employee/${id}`);
}

create(employee: EmployeeModel){
  return this.http.post<EmployeeModel>("http://localhost:8080/api/castor/v1/employee/create",employee.getToSendData());
}

update(id: number, employee: any){
  console.log(id);
  console.log(employee.getToSendData());
  return this.http.put<EmployeeModel>(`http://localhost:8080/api/castor/v1/employee/update/${id}`,employee.getToSendData());
}

delete(id:number){
  return this.http.delete(`http://localhost:8080/api/castor/v1/employee/delete/${id}`);
}

}
