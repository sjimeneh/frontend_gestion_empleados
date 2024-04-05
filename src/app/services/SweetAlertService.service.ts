import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SweetAlertServiceService {

  constructor() { }

  public showErrorMessage(title: string, text: string): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: 'error'
    });
  }

  public showSuccessMessage(title: string, text: string): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: 'success'
    });
  }

  public ShowQuestionMessage(title: string, text: string, subtTex: string): Promise<boolean>{
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, ${subtTex}`,
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }

}
