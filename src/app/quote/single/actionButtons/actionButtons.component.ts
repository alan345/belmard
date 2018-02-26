import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QuoteService} from '../../quote.service';
import {Quote} from '../../quote.model';
import {ToastsManager} from 'ng2-toastr';
import {Router } from '@angular/router';
import {DeleteDialogComponent } from '../../../nav/deleteDialog/deleteDialog.component';
import {MatDialog } from '@angular/material';
import {AuthService} from '../../../auth/auth.service';
// import {TemplateQuoteService} from '../templateQuote.service';

// import { DragulaService } from 'ng2-dragula';
// import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';

// import {Quote, DevisDetail, BucketProduct, StatusQuotes, StatusQuotesInvoice, Signature, PriceQuoteTaxe, ModelVATs } from '../quote.model';
// import {TemplateQuote } from '../../templateQuote.model';

// import {Router, ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { UserService} from '../../user/user.service';

@Component({
  selector: 'app-actionButtons',
  templateUrl: './actionButtons.component.html',
  styleUrls: ['./actionButtons.component.css'],
})
export class ActionButtonsComponent implements OnInit {
  // @ViewChild(SignaturePad) signaturePad: SignaturePad;
  // @ViewChild(PaiementQuotesComponent) paiementQuotesComponent: PaiementQuotesComponent;

  // loading = false;
  @Output() saveEmmit: EventEmitter<any> = new EventEmitter();
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() saveSignatureEmit: EventEmitter<any> = new EventEmitter();
  //
  // @Input() search: Search = new Search()
  //
  // showPaiements = false;
  @Input() fetchedQuote: Quote = new Quote()
  @Input() showDeleteButton = true;
  @Input() showSaveButton = true;
  @Input() showSaveSignatureButton = false;
  @Input() isDialog = false;
  // @Input() showDLQuoteButton = false;
  @Input() step: number

  loading = false;

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    public authService: AuthService,
    // private activatedRoute: ActivatedRoute,
    // private location: Location,
    // private _fb: FormBuilder,
    // private dragulaService: DragulaService,
    // private translateService: TranslateService,
  ) {

  }

  nextStepEmit() {
    // if (this.fetchedQuote.statusQuote === 'pending') {
      // this.save()
    // }
    this.nextStep.emit(this.fetchedQuote)

  }

  close() {
    this.closeDialog.emit()
  }
  ngOnInit() {
  }

  saveSignature() {
    // if(this.fetchedQuote.drawingSignature.base64Temp) {
    //   this.fetchedQuote.drawingSignature.base64 = this.fetchedQuote.drawingSignature.base64Temp
    // }
    this.saveSignatureEmit.emit()
    //
    //   this.quoteService.updateSignature(this.fetchedQuote)
    //     .subscribe(
    //     res => {
    //
    //       this.authService.successNotif(res.message)
    //       this.nextStep.emit(this.fetchedQuote)
    //     },
    //     error => { console.log(error) }
    //     )
  }

  save() {
    this.saveEmmit.emit();
    // if (this.fetchedQuote._id) {
    //   this.quoteService.updateQuote(this.fetchedQuote)
    //     .subscribe(
    //     res => {
    //       this.authService.successNotif(res.message)
    //       // this.getQuote(res.obj._id)
    //       this.saved.emit(res)
    //       //this.router.navigate(['quote/edit/' + this.fetchedQuote._id])
    //     },
    //     error => {
    //       this.toastr.error('error!', error)
    //     }
    //     )
    // } else {
    //   this.quoteService.saveQuote(this.fetchedQuote)
    //     .subscribe(
    //     res => {
    //       console.log(res)
    //       this.authService.successNotif(res.message)
    //       // this.router.navigate(['quote/' + res.obj._id])
    //       this.saved.emit(res)
    //     },
    //     error => { console.log(error) }
    //     )
    // }
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


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.quoteService.deleteQuote(id)
        .subscribe(
        res => {
          this2.authService.successNotif(res.message);
          resolve(res)
        },
        error => {
          console.log(error);
          reject(error)
        }
        )
    })
  }


  openDialogDelete() {
    const this2 = this
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(this.fetchedQuote._id).then(function() {
          this2.router.navigate(['quote/list/quote']);
        })

      }
    })
  }



}
