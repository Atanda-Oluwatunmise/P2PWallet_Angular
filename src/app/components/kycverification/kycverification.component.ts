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
  public documents: any = [];

  public formdataList: any = [];
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
  public labelid: any;
  public loading: boolean = false;
  public formData = new FormData();
  public unuploadeDocs: any;
  public imgElement: any;
  public kycResponseObj: any;
  public rowidOne: any;
  public rowidTwo: any;
  public labelidOne: any;
  public labelidTwo: any;

  constructor(private api: ApiService, private signalr: SignalrService) { }

  ngOnInit() {
    this.signalr.startConnection();

    this.api.getuserDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.data;
        this.username = this.users[0].username;
      })

    this.api.kycUpgrade().subscribe((res:any) => {
      console.log(res);
      this.kycResponseObj = res;
      if (res.status == true) {
        this.imgElement = document.getElementById("voidImageHolder");
        this.imgElement.style.display = "none";
        this.imgElement = document.getElementById("mainCardId");
        this.imgElement.style.display = "none";
        this.imgElement = document.getElementById("approvedImageHolder");
        this.imgElement.style.display = "";
      }
    })
    this.getListsOfDocs();
  }

  getListsOfDocs() {
    this.api.getListofKycDocs()
      .subscribe((res: any) => {
        this.requiredDocs = res.data;
        for (let i = 0; i < this.requiredDocs.length; i++) {
          let label = document.createElement('label');
          label.classList.add('d-none')
          label.id = `${this.requiredDocs[i].name}-label`;
          label.innerText = `${this.requiredDocs[i].name}`.toUpperCase();
          let row = document.createElement('div');
          row.classList.add('form-group', 'pb-4', 'd-none');
          row.id = `${this.requiredDocs[i].name}-user`;

          row.innerHTML = `<input type="file" class="form-control d-flex" id="${this.requiredDocs[i].name}">`;
          row.addEventListener('change', (event: any) => {
            let element = event.target || event.srcElement || event.currentTarget;
            this.fileOne = event.target.files[0];
            console.log(this.fileOne);
            var elementid = element.id;
            if (elementid === this.requiredDocs[i].name) {
              let fileName: string = this.requiredDocs[i].name;
              let fileExtension: string = this.fileOne.name.split('?')[0].split('.').pop();
              this.formData.append('uploadedImage', this.fileOne, fileName + '.' + fileExtension);
            }
          })

          let btn = document.createElement('input');
          btn.setAttribute('type', 'button');
          btn.setAttribute('value', 'Upload');
          btn.classList.add('btn-tertiary', 'd-flex');
          btn.addEventListener('click', () => {
            this.loading = !this.loading;
            this.kycmessage = "Uploading ...."
            this.api.kycFileUpload(this.formData)
              .subscribe((res: any) => {
                if (res.status == true) {
                  window.location.reload();
                  // this.element = document.getElementById(row.id);
                  // console.log(row.id);
                  // this.element.style.display = 'none';
                  // this.kycmessage = "Upload Successful"
                }
              })
          })

          this.api.unUploadedoRRejectedDocs()
            .subscribe((res) => {
              console.log(res);
              if (res.status == true) {
                this.unuploadeDocs = res.data;
                for(let x = 0; x < this.unuploadeDocs.length; x++){
                console.log(this.unuploadeDocs[0].name); if (`${this.unuploadeDocs[x].name}-user` == row.id) {
                  this.labelid = document.getElementById(`${this.requiredDocs[i].name}-label`);
                  this.labelid.classList.remove('d-none');
                  //this.element= document.getElementById(row.id);
                  row.classList.remove('d-none');
                  row.classList.add("d-flex");
                }
              }
              }

              if (res.status != true && this.kycResponseObj.status != true) {
                this.imgElement = document.getElementById("voidImageHolder");
                this.imgElement.style.display = "";
                this.imgElement = document.getElementById("mainCardId");
                this.imgElement.style.display = "none";
              }
            })

          document.getElementById("formContainer")?.appendChild(label);
          document.getElementById("formContainer")?.appendChild(row);
          document.getElementById(`${this.requiredDocs[i].name}-user`)?.appendChild(btn);

        }
      })
  }

}
