import { Component, OnInit, inject } from '@angular/core';
import { JobpositionService } from '../services/jobposition.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { JobPositionModel } from '../model/JobPositionModel';
import { EmployeeModel } from '../model/EmployeeModel';
import { profilePictureDTO } from '../model/profilePictureDTO';
import { ProfilePictureService } from '../services/profilePicture.service';
import { SweetAlertServiceService } from '../services/SweetAlertService.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export default class EmployeeFormComponent implements OnInit{

  private jobPostionService = inject(JobpositionService);
  private profilePictureService = inject(ProfilePictureService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private sweetAlert = inject(SweetAlertServiceService);

  jobPositions: any[] = [];
  form?: FormGroup;
  employee? : EmployeeModel;
  selectedFile!: File ;
  imageSelectedShow: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    const idEmployee = this.activateRoute.snapshot.paramMap.get('id');

    if(idEmployee){
      this.employeeService.get(parseInt(idEmployee))
      .subscribe((employeeResponse:any) =>{
        this.employee = employeeResponse;
        this.form = this.fb.group({
              dni: [employeeResponse.dni, [Validators.required]],
              name: [employeeResponse.name, [Validators.required]],
              dateEntry: [employeeResponse.dateEntry, [Validators.required]],
              jobPosition: [employeeResponse.jobPosition.id, [Validators.required]],
              image: ['']
        });

        if(employeeResponse?.profilePicture?.source != null){
          this.imageSelectedShow = employeeResponse.profilePicture.source;
        }
      });
    }else{
          this.form = this.fb.group({
          dni: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
          name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\\s]+$")]],
          dateEntry: ['', [Validators.required]],
          jobPosition: ['', [Validators.required]],
          image: ['']
        });
    }

    this.LoadJobPosition();  
  }


  LoadJobPosition(){
    this.jobPostionService.list()
    .subscribe((jobposition: any) => {
      this.jobPositions = jobposition;
    });
  }




  save(){
    
    if(this.form?.invalid){
      return
    }

    const  dataEmployee = this.form?.value;
    const dataEmployeeFill = this.fillEmployee(dataEmployee);

    if(this.employee){

      this.employeeService.update(this.employee.id,dataEmployeeFill)
    .subscribe((response: EmployeeModel)=>{
      this.createPictureProfile(dataEmployee,response.id);
      this.sweetAlert.showSuccessMessage("¡Usuario Editado!","El usuario se ha editado satisfactoriamente")
      .then(()=>{
        this.router.navigate(['/']);
      });
      
    });

    }else{
    //const jobPosition = new JobPositionModel(dataEmployee.jobPosition,'');
    

    this.employeeService.create(dataEmployeeFill)
    .subscribe((response: EmployeeModel)=>{
      
      this.createPictureProfile(dataEmployee,response.id);
      this.sweetAlert.showSuccessMessage("¡Usuario Creado!","El usuario se ha creado satisfactoriamente")
      .then(()=>{
        this.router.navigate(['/']);
      });
    });

    }//End if



  }

  createPictureProfile(data: any,id:any){
    if(data.image != ""){

         const file = this.selectedFile;
         const imagen = new profilePictureDTO(id,file);
         this.profilePictureService.create(imagen);

    }
  }

  onFileSelected(event: any) {
     this.selectedFile = event.target.files[0] as File;
     const file = event.target.files[0];
     if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSelectedShow = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  fillEmployee(data:any){
    return new EmployeeModel(data.dni,data.name,data.dateEntry,this.fillJobPostion(data));
  }

  fillJobPostion(dataEmployee:any){
    let id: number | undefined = dataEmployee.jobPosition;
    return new JobPositionModel(id);
  }
}
