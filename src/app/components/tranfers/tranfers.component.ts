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
  public foreigndetailHolder: any = [];
  public errMsgHolder: any;
  public accountSearch = "";
  public foreignaccountSearch = "";
  public status = "";
  public question: string = "";
  public answer: string = "";
  public pin: string = "";
  public foreignpin: any;
  public users: any = [];
  public acctdetail: any = { accountSearch: "" };
  public pinObect: any = {
    userPin: ""
  };
  formModal: any;
  public element: any;
  public selectElememt: any;
  public amountElememt: any;
  public errorMessage: any;
  public btn: any;
  public selectedCurrency: any;
  public walletamount: any;
  public naira: any;
  public nairaamount: any;
  public localtxnContainer: any;
  public fundforeignAcc: any;
  public foreignamount: any;
  public foreignTransfers: any;
  public CurrencyDto: any = {
    currency: "",
    amount: ""
  }

  public DataDto: any = {
    accountSearch: "",
    currency: ""
  }

  public foreignTransfersDto: any = {
    accountSearch: "",
    currency: "",
    amount: ""
  }

  public foreigncurrencyObj: any = {
    currency: ""
  };

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

  displayBalance(){
    this.foreigncurrencyObj["currency"] = this.selectedCurrency;
    console.log(this.foreigncurrencyObj)
    this.api.verifyAccount(this.foreigncurrencyObj)
    .subscribe((res:any) => {
      if(res.status == true){
         this.users = res.data;
      }
    })
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

  onCompleteForeignTransaction() {
    this.DataDto["accountSearch"] = this.foreignaccountSearch;
    this.DataDto["currency"] = this.selectedCurrency;
    console.log(this.DataDto);
    this.api.getuserForeignAccountDetails(this.DataDto)
      .subscribe((res: any) => {
        if (res.status != true) {
          Swal.fire({
            title: 'Error!',
            text: res.statusMessage,
            icon: 'error',
            confirmButtonColor: '#53277E'
          })
        }
        if (res.status == true) {

          Swal.fire({
            title: 'Enter your pin',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            html: `<input type="password" id="pin" class="swal2-input" placeholder="Pin">`,

            focusConfirm: false,
            confirmButtonText: 'Submit',
            confirmButtonColor: '#53277E',
            preConfirm: () => {
              this.foreignpin = Swal.getPopup()?.querySelector('#pin') as HTMLButtonElement | null;
              this.foreignpin = this.foreignpin.value;
              console.log(this.foreignpin);
              //var pinData =getPin();
              this.pinObect["userPin"] = this.foreignpin;
              this.api.verifyUserPin(this.pinObect)
                .subscribe((res: any) => {
                  if (res.status != true) {
                    Swal.fire({
                      title: 'Error!',
                      text: 'Pin Not Correct! :)',
                      icon: 'error',
                      confirmButtonColor: '#53277E'
                    })
                  }
                  if (res.status == true) {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#53277E',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, Make Transfer!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.foreignTransfersDto["accountSearch"] = this.foreignaccountSearch;
                        this.foreignTransfersDto["currency"] = this.selectedCurrency;
                        this.foreignTransfersDto["amount"] = this.foreignamount;

                        this.api.ForeignAccountTransfers(this.foreignTransfersDto)
                          .subscribe((res: any) => {
                            if (res.status != true) {
                              Swal.fire({
                                title: 'Error!',
                                text: res.statusMessage,
                                icon: 'error',
                                confirmButtonColor: '#53277E'
                              }).then((result) => {
                                if (result.isConfirmed) {
                              window.location.reload();
                                }
                                })
                            }
                            else {
                              Swal.fire({
                                title: 'Success!',
                                text: res.data,
                                confirmButtonColor: '#53277E',
                                icon: 'success',
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  this.router.navigate(["dashboard"]);
                                }
                                })
                            }
                          })
                      }
                    })
                  }

                })
            }
          })

        }
      })




    // this.pinObect["userPin"] = this.pin
    // this.btn = document.getElementById('submitButton') as HTMLButtonElement | null;
    // this.btn?.setAttribute('disabled', '');
    // this.api.verifyUserPin(this.pinObect)
    //   .subscribe((res: any) => {
    //     console.log(res)
    //     if (res.status == true) {
    //       console.log(details.accountSearch)
    //       console.log(details);
    //       this.api.transfer(details)
    //         .subscribe((res: any) => {
    //           this.formModal.hide();
    //           console.log(res);
    //           Swal.fire({
    //             title: 'Success!',
    //             text: 'Transfer Successful',
    //             confirmButtonColor: '#53277E',
    //             icon: 'success',
    //           });
    //           this.router.navigate(['dashboard']);
    //         })
    //     } else if (res.status != true) {
    //       Swal.fire({
    //         title: 'Oops!',
    //         text: res.data,
    //         confirmButtonColor: '#53277E',
    //         icon: 'error',
    //       });
    //     }
    //   })
  }

  goToFundPage() {
    this.localtxnContainer = document.getElementById('localtxnContainer');
    this.localtxnContainer.style.display = 'none';

    this.fundforeignAcc = document.getElementById('fundforeignAcc');
    this.fundforeignAcc.style.display = '';

    this.foreignTransfers = document.getElementById('foreigntransfers');
    this.foreignTransfers.style.display = 'none';

  }
  localTransferPage() {
    this.localtxnContainer = document.getElementById('localtxnContainer');
    this.localtxnContainer.style.display = '';

    this.fundforeignAcc = document.getElementById('fundforeignAcc');
    this.fundforeignAcc.style.display = 'none';

    this.foreignTransfers = document.getElementById('foreigntransfers');
    this.foreignTransfers.style.display = 'none';
  }

  ForeignTransfersPage() {
    this.foreignTransfers = document.getElementById('foreigntransfers');
    this.foreignTransfers.style.display = '';

    this.localtxnContainer = document.getElementById('localtxnContainer');
    this.localtxnContainer.style.display = 'none';

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

  onForeignSearch() {
    this.acctdetail['accountSearch'] = this.foreignaccountSearch
    console.log(this.acctdetail);
    this.btn = document.getElementById('foreignacntSearchBtn') as HTMLButtonElement | null;
    this.btn?.setAttribute('disabled', '');
    this.api.getuserAccountDetails(this.acctdetail)
      .subscribe((res: any) => {
        console.log(res);
        console.log(res.data)
        this.foreigndetailHolder = res.data
        if (res.status == true) {
          //display the detail and amount box
          this.element = document.getElementById('showForeignDetail');
          this.element.style.display = '';
        } else {
          //display the error message
          this.errMsgHolder = res.statusMessage;
          this.errorMessage = document.getElementById('foreignerrorMsg');
          this.errorMessage.style.display = 'block';
        }
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


  showForeignBtn() {
    this.errorMessage = document.getElementById('foreignerrorMsg');
    this.errorMessage.style.display = 'none';

    this.element = document.getElementById('showForeignDetail');
    this.element.style.display = 'none';

    this.btn = document.getElementById('foreignacntSearchBtn') as HTMLButtonElement | null;
    this.btn?.removeAttribute('disabled');

    this.selectElememt = document.getElementById('currencyclass') as any;
    this.selectElememt.value = null;
    console.log(this.selectElememt.value);

    this.foreigncurrencyObj["currency"] = "NGN";
    this.api.verifyAccount(this.foreigncurrencyObj)
    .subscribe((res:any) => {
      if(res.status == true){
         this.users = res.data;
      }
    })

    this.amountElememt = document.getElementById('foreignamount');
    this.amountElememt.value = '';
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
