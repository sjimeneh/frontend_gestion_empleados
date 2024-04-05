import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { profilePictureDTO } from '../model/profilePictureDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  private http = inject(HttpClient);

  create(data: profilePictureDTO){
    const formData = new FormData();
    formData.append('file', data?.file);
    formData.append('idUser', String(data?.idEmployee));
    return this.http.post<profilePictureDTO>("http://localhost:8080/api/castor/v1/profilepicture/upload",formData)
    .subscribe(response => {
      console.log(response);
    });;
  }

}
