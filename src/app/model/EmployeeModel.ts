import { JobPositionModel } from "./JobPositionModel";
import { ProfilePicture } from "./ProfilePicture";
//import { ProfilePicture } from "./profilePictureDTO";

export class EmployeeModel {
  id: number;
  dni: string;
  name: string;
  dateEntry: Date;
  jobPosition: JobPositionModel;

  profilePicture: ProfilePicture;

  constructor(dni: string, name: string, dateEntry: Date, jobPosition: JobPositionModel) {
    this.id = 0;
    this.dni = dni;
    this.name = name;
    this.dateEntry = dateEntry;
    this.jobPosition = jobPosition;
    this.profilePicture = new ProfilePicture();
  }

  getToSendData() {
    const { jobPosition,profilePicture, ...sendData } = this;
    const jobPositionToSend = {
      id: jobPosition.id
    };
    return {...sendData, jobPosition: jobPositionToSend };
  }
}
