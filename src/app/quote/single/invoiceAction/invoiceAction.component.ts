import {Component, Input} from '@angular/core';
import {QuoteService} from '../../quote.service';
import {Quote} from '../../quote.model';
import {AuthService} from '../../../auth/auth.service';
// import {ToastsManager} from 'ng2-toastr';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoiceAction.component.html',
  styleUrls: ['./invoiceAction.component.css'],
})
export class InvoiceActionComponent {

  @Input() fetchedQuote: Quote = new Quote()
  loading = false;


  constructor(
    private quoteService: QuoteService,
    public authService: AuthService,
    // private toastr: ToastsManager,

  ) {

  }


    // downloadPDF() {
    //   this.loading = true
    //   this.quoteService.downloadPDF(this.fetchedQuote._id)
    //     .subscribe(
    //       res => {
    //          window.open( '/uploads/pdf/' + res );
    //          this.loading = false
    //       },
    //       error => {
    //         this.loading = false
    //         console.log(error)
    //       }
    //     )
    // }

    // downloadInvoicePDF() {
    //   this.loading = true
    //   this.quoteService.downloadInvoicePDF(this.fetchedQuote._id)
    //     .subscribe(
    //       res => {
    //          window.open( '/uploads/pdf/' + res );
    //          this.loading = false
    //       },
    //       error => {
    //         this.loading = false
    //         console.log(error)
    //       }
    //     )
    // }

    sendQuoteByEmailToClient() {
      this.loading = true
      this.quoteService.sendQuoteByEmailToClient(this.fetchedQuote._id)
        .subscribe(
          res => {
            // console.log(res)
            this.authService.successNotif('Mail envoyeé!')
            //  window.open( '/uploads/pdf/' + res );
             this.loading = false
          },
          error => {
            this.loading = false
            console.log(error)
          }
        )
    }

    sendInvoiceByEmailToClient() {
      this.loading = true
      this.quoteService.sendInvoiceByEmailToClient(this.fetchedQuote._id)
        .subscribe(
          res => {
            this.authService.successNotif('Mail envoyeé!')
             this.loading = false
          },
          error => {
            this.loading = false
            console.log(error)
          }
        )
    }





}
