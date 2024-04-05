export class profilePictureDTO {
  idEmployee: number;
  file: File;

  constructor(idEmployee: number,file: File) {
    this.idEmployee = idEmployee;
    this.file = file;
  }

}
