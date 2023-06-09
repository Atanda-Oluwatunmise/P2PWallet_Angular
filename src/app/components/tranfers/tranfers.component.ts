import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-tranfers',
  templateUrl: './tranfers.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class TranfersComponent {
  public detailHolder: any = [];
  public errMsgHolder: any;
  public accountSearch = "";
  public status = "";
  public question: string = "";
  public answer: string = "";
  public pin: string = "";
  public users: any = [];
  public acctdetail: any = { accountSearch: "" };
  public pinObect: any = {
    userPin: ""
  };
  formModal: any;
  public element: any;
  public errorMessage: any;
  public btn: any;
  public selectedCurrency: any;
  public walletamount: any;
  public naira: any;
  public nairaamount: any;
  public localtxnContainer: any;
  public fundforeignAcc: any;
  public CurrencyDto: any = {
    currency: "",
    amount: ""
  }

  constructor(private auth: AuthService, private api: ApiService, private router: Router, private loader: LoaderService) { }


  ngOnInit(): void {
    this.api.getuserDetails()
      .subscribe(res => {
        console.log(res)
        this.users = res.data;
      })

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModalToggle2')
    )
  }

  onCompleteTransaction(details: { accountSearch: string, amount: any }) {
    this.pinObect["userPin"] = this.pin
    this.btn = document.getElementById('submitButton') as HTMLButtonElement | null;
    this.btn?.setAttribute('disabled', '');
    this.api.verifyUserPin(this.pinObect)
      .subscribe((res: any) => {
        console.log(res)
        if (res.status == true) {
          console.log(details.accountSearch)
          console.log(details);
          this.api.transfer(details)
            .subscribe((res: any) => {
              this.formModal.hide();
              console.log(res);
              Swal.fire({
                title: 'Success!',
                text: 'Transfer Successful',
                confirmButtonColor: '#53277E',
                icon: 'success',
              });
              this.router.navigate(['dashboard']);
            })
        } else if (res.status != true) {
          Swal.fire({
            title: 'Oops!',
            text: res.data,
            confirmButtonColor: '#53277E',
            icon: 'error',
          });
        }
      })
  }

  goToFundPage() {
    this.localtxnContainer = document.getElementById('localtxnContainer');
    this.localtxnContainer.style.display = 'none';

    this.fundforeignAcc = document.getElementById('fundforeignAcc');
    this.fundforeignAcc.style.display = '';
  }
  localTransferPage() {
    this.localtxnContainer = document.getElementById('localtxnContainer');
    this.localtxnContainer.style.display = '';

    this.fundforeignAcc = document.getElementById('fundforeignAcc');
    this.fundforeignAcc.style.display = 'none';
  }

  fundWallets(event: any) {
    this.CurrencyDto["currency"] = this.selectedCurrency;
    console.log(this.selectedCurrency);
    this.CurrencyDto["amount"] = event.target.value;
    console.log(this.CurrencyDto["amount"]);

    if (this.CurrencyDto["amount"] == '') {
      this.nairaamount = ' ';
      return;
    }
    this.api.ConvertCurrency(this.CurrencyDto)
      .subscribe((res: any) => {
        console.log(res);
        this.naira = res.nairaAmount;
      })
  }

  fundForeignAccount() {
    this.loader.setLoading(true);
    this.CurrencyDto["currency"] = this.selectedCurrency;
    this.CurrencyDto["amount"] = this.walletamount;
    this.api.FundForeignAccount(this.CurrencyDto)
      .subscribe((res: any) => {
        console.log(res)
        this.loader.getLoading();
        if (res.status != true) {
          Swal.fire({
            title: 'Error',
            text: res.statusMessage,
            confirmButtonColor: '#53277E',
            icon: 'error'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }

        Swal.fire({
          title: 'Success',
          text: res.data,
          confirmButtonColor: '#53277E',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })

      })
  }

  onSearch() {
    this.acctdetail['accountSearch'] = this.accountSearch
    console.log(this.acctdetail);
    this.btn = document.getElementById('acntSearchBtn') as HTMLButtonElement | null;
    this.btn?.setAttribute('disabled', '');
    this.api.getuserAccountDetails(this.acctdetail)
      .subscribe((res: any) => {
        console.log(res);
        console.log(res.data)
        this.detailHolder = res.data
        if (res.status == true) {
          //display the detail and amount box
          this.element = document.getElementById('showDetail');
          this.element.style.display = 'block';
        } else {
          //display the error message
          this.errMsgHolder = res.statusMessage;
          this.errorMessage = document.getElementById('errorMsg');
          this.errorMessage.style.display = 'block';
        }
      })
  }

  showBtn() {
    this.errorMessage = document.getElementById('errorMsg');
    this.errorMessage.style.display = 'none';

    this.element = document.getElementById('showDetail');
    this.element.style.display = 'none';

    this.btn = document.getElementById('acntSearchBtn') as HTMLButtonElement | null;
    this.btn?.removeAttribute('disabled');
  }

}
