import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SignalrService } from 'src/app/services/signal-r.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kycverification',
  templateUrl: './kycverification.component.html',
  styleUrls: ['./kycverification.component.css']
})
export class KycverificationComponent {
  public requiredDocs: any;
  public documents:any= [];

  public formdataList:any= [];
  public docOne: any;
  public kycmessage: any;
  public users: any;
  public username: any;
  public uploadedImage: any;
  public docTwo: any;
  public fileOne: any;
  public fileTwo: any;
  public notificationMessage: any;
  public element: any;
  public loading: boolean = false;
  public formData = new FormData();

  constructor(private api: ApiService, private signalr: SignalrService){}

  ngOnInit(){
    this.signalr.startConnection(); 
    this.api.getuserDetails()
    .subscribe((res:any)=> {
      console.log(res);
      this.users = res.data;
      this.username = this.users[0].username;
    })

    this.api.kycUpgrade().subscribe((res)=>{
      console.log(res);
      if(res.status == true){
      Swal.fire({
        title: "Info!",
        text: `KYC Documents ${res.data}`,
        icon: "info",
        confirmButtonColor: '#53277E' 
      })
    }
    })

    this.api.getListofKycDocs()
    .subscribe((res:any) =>{
      this.requiredDocs = res.data;
      for(let i=0; i< this.requiredDocs.length; i++)
      {
        this.docOne = this.requiredDocs[0].name;
        console.log(this.docOne);
        this.docTwo = this.requiredDocs[1].name;
      }
    })

    this.signalr.kycAlert((user, message)=>{
      if (this.users[0].username == user){
        console.log(message)
        Swal.fire({
          title: "Info!",
          text: `${message} has been rejected, please re-upload!`,
          icon: "info",
          confirmButtonColor: '#53277E' 
        })
        this.notificationMessage = message.split('.');
        this.kycmessage = this.notificationMessage[0];
        if (this.docOne !== this.kycmessage){
          this.element = document.getElementById(`${this.docOne}`);
          this.element.style.display = 'none';
        }
        if (this.docTwo !== this.kycmessage){
          this.element = document.getElementById(`${this.docTwo}`);
          this.element.style.display = 'none';
        }
      }
    })
  }

  DocOneOnChange(event:any){
    let element = event.target || event.srcElement || event.currentTarget;
    this.fileOne = event.target.files[0];
    console.log(this.fileOne);
    var elementid = element.id;
    if (elementid === this.docOne){
      let fileName:string = this.docOne;
      let fileExtension:string = this.fileOne.name.split('?')[0].split('.').pop();
      console.log(fileExtension);
      //const formData = new FormData();
      this.formData.append('uploadedImage', this.fileOne, fileName+'.'+fileExtension);
      //this.formdataList.push(formData);
      console.log(this.formData);
    }
  }

  DocTwoOnChange(event:any){
    let element = event.target || event.srcElement || event.currentTarget;
    this.fileTwo = event.target.files[0];
    var elementid = element.id;
    if (elementid === this.docTwo){
      let fileName:string = this.docTwo;
      let fileExtension:string = this.fileTwo.name.split('?')[0].split('.').pop();
      console.log(fileExtension);
      //const formData = new FormData();
      this.formData.append('uploadedImage', this.fileTwo, fileName+'.'+fileExtension);
      //this.formdataList.push(formData);

    }
  }

  UploadDocuments(){
    this.loading = !this.loading;
    this.kycmessage = "Uploading ...."
    this.api.kycFileUpload(this.formData)
    .subscribe((res:any) => {
      if(res.status == true){
        this.element = document.getElementById("formContainer");
        this.element.style.display = 'none';
        this.kycmessage = "Upload Successful, Approval Pending!"    
      }
    })
  }

}
