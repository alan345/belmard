import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { PaiementService} from '../paiement/paiement.service';
import { Companie } from '../../companie.model';
import { Location } from '@angular/common';
import { AccountConnectStripe} from './connectStripe.model';
// import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-connect-stripe',
  templateUrl: './connectStripe.component.html',
})
export class ConnectStripeComponent implements OnInit, OnChanges {
  // @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() fetchedCompanie: Companie = new Companie();
  accountConnectStripe: AccountConnectStripe = new AccountConnectStripe();
  loading = false;

  constructor(
    // private toastr: ToastsManager,
    private paiementService: PaiementService,
    private location: Location,
  ) { }


  ngOnInit() {
    // this.paiementService.getUserInfosConnect()
    //   .subscribe(res => {
    //     this.accountConnectStripe = res.customer
    //   }, error => { console.log(error) })
  }
  ngOnChanges() {
    // if(this.fetchedCompanie.banck.stripe.stripe_user_id) {
      this.loading = true;
      this.paiementService.getUserInfosConnect()
        .subscribe(res => {
          this.loading = false;
          this.accountConnectStripe = res.customer;
        }, error => {
          this.loading = false;
          console.log(error);
        });
    // }


  }


  deauthorizeConnect() {
    this.loading = true;
    this.paiementService.deauthorizeConnect()
      .subscribe(res => {
        this.loading = false;
        this.accountConnectStripe = new AccountConnectStripe();
      }, error => {
        this.loading = false
        console.log(error) })
  }
  goToLinkAuthorizeConnect() {
    this.loading = true
    this.paiementService.goToLinkAuthorizeConnect()
      .subscribe(res => {
        window.location.href = res.url;
      }, error => { console.log(error) })
  }



}
