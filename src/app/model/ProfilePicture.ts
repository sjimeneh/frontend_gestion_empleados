export class ProfilePicture {

  id:number;
  name:string;
  type: string;
  source: string;
  data: Blob;

  constructor() {
    this.id=0;
    this.name="";
    this.type="";
    this.source="";
    this.data=new Blob();
   }

}
