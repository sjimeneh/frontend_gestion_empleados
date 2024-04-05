import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeModel } from '../model/EmployeeModel';
import { SweetAlertServiceService } from '../services/SweetAlertService.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export default class EmployeeListComponent implements OnInit{
  private employeeService = inject(EmployeeService);
  private sweetAlert = inject(SweetAlertServiceService);
  private router = inject(Router);

  employees: EmployeeModel[] = [];


  ngOnInit(): void {
    this.LoadDataList();
  }

  LoadDataList(){
    this.employeeService.list()
    .subscribe((employee: EmployeeModel[]) => {
      this.employees = employee;
    });
  }



  DeleteEmployee(id:number){
    
    this.sweetAlert.ShowQuestionMessage("¡Eliminar Usuario!","¿Está seguro de eliminar este usuario?","Eliminar")
    .then((resultMessage) => {
      if(resultMessage) {
        console.log("Se elimino el usuario");
        console.log("El ID ES "+id);
        this.employeeService.delete(id)
        .subscribe(()=>{
          this.sweetAlert.showSuccessMessage("Empleado Eliminado!","El Empleado se ha eliminado satisfactoriamente")
          .then(()=>{
            this.LoadDataList();
          })
          
        })
      } else {
        console.log('Usuario canceló');
      }
    });
  }


}
