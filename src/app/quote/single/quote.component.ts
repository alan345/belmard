import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { QuoteService } from '../quote.service';
import { Quote, PriceQuoteTaxe, ModelVATs } from '../quote.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Search } from '../../shared/shared.model';
import { PaiementQuote } from '../../paiementQuote/paiementQuote.model';
import { DrawingSignatureComponent } from './drawingSignature/drawingSignature.component';
import { ToastsManager} from 'ng2-toastr';
import { CompanieService} from '../../companie/companie.service';
import { Companie} from '../../companie/companie.model';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ActionButtonsComponent } from './actionButtons/actionButtons.component';
// import { TranslateService } from '../../translate/translate.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['../quote.component.css'],
})
export class QuoteComponent implements OnInit {
  @ViewChild(DrawingSignatureComponent) drawingSignatureComponent: DrawingSignatureComponent
  loading = false;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() isDialog = false;

  fetchedPaiementQuotes: PaiementQuote[] = [];
  fetchedQuote: Quote = new Quote();
  signatureBase64Temp = '';
  step = -1;
  myCompanie: Companie = new Companie();
  VATs = ModelVATs;
  // @ViewChild(SignaturePad) signaturePad: SignaturePad;
  // @ViewChild(PaiementQuotesComponent) paiementQuotesComponent: PaiementQuotesComponent;
  // @ViewChild(ActionButtonsComponent) actionButtonsComponent: ActionButtonsComponent
  // showPaiements = false;
  // totalPaiementAmount = 0;





  constructor(
    private quoteService: QuoteService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private toastr: ToastsManager,
    private companieService: CompanieService,
    // private router: Router,
    // private location: Location,
    // private _fb: FormBuilder,
    // private dragulaService: DragulaService,
    // private translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => { this.step = 0});
    this.getMyCompanie()

    this.authService.getCurrentUser().ownerCompanies.forEach((companie: Companie) => {
      this.fetchedQuote.detail.currency = companie.option.currency;
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['idQuote']) {
        this.search.quoteId = params['idQuote'];
        this.getQuote(params['idQuote']).then(quote => {
        }).catch(err => {
          console.log(err);
        })
      } else {
        this.getMaxQuoteNumber();
        if (params['userId']) {
          this.search.userId = params['userId'];
        }
        if (params['assignedToId']) {
          this.search.assignedToId = params['assignedToId'];
        } else {
          this.search.assignedToId = this.authService.getCurrentUser()._id;
        }
      }
      // else if (params['parentQuoteId']) {
      //   // this.getQuote(params['parentQuoteId']).then((parentQuote: Quote) => {
      //   //   this.search.parentQuoteId = params['parentQuoteId']
      //   //   this.fetchedQuote._id = ''
      //   //   this.fetchedQuote.typeQuote = 'invoice'
      //   //   this.fetchedQuote.drawingSignature.isSigned = false
      //   //   this.fetchedQuote.quoteNumber = null
      //   //   this.getMaxQuoteNumber()
      //   // })
      // }

    })



    // if (this.search.parentQuoteId) {
    //   this.getQuote(this.search.parentQuoteId).then((parentQuote: Quote) => {
    //     this.fetchedQuote._id = ''
    //     this.fetchedQuote.typeQuote = 'invoice'
    //     this.fetchedQuote.quoteNumber = null
    //     this.getMaxQuoteNumber()
    //
    //   })
    // } else {
    //   // this.fetchedQuote.typeQuote = this.search.typeQuote
    //   this.activatedRoute.params.subscribe((params: Params) => {
    //     if (params['idQuote']) {
    //       this.search.quoteId = params['idQuote']
    //       this.getQuote(params['idQuote'])
    //     } else {
    //       this.getMaxQuoteNumber()
    //     }
    //   })
    // }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.save();

  }
  clearDrawing() {
    this.drawingSignatureComponent.clearDrawing();
    // this.saveSignature()
  }
  // clearedDrawing() {
  //   this.fetchedQuote.drawingSignature.base64 = ''
  //   this.fetchedQuote.drawingSignature.base64Temp = ''
  //   this.fetchedQuote.statusQuote = 'pending'
  //   this.actionButtonsComponent.saveSignature()
  // }
  buttonSaved(quote: Quote) {
    this.getQuote(quote._id)
    this.nextStep()
  }
  closeDialog() {
    this.close.emit()
  }
  getMaxQuoteNumber() {
    this.quoteService.maxQuoteNumber()
      .subscribe(
      res => {
        this.fetchedQuote.quoteNumber = res
      },
      error => { console.log(error) }
      )
  }

  getQuote(id: string) {
    this.loading = true
    const this2 = this
    return new Promise(function(resolve, reject) {
      this2.quoteService.getQuote(id)
        .subscribe(
        res => {
          this2.loading = false
          this2.fetchedQuote = res
          this2.fetchedQuote.clients.forEach(user => { this2.search.userId = user._id })
          resolve(this2.fetchedQuote)
        },
        error => {
          this2.loading = false
          // console.log(error)
          reject(error)
        }
        )
    })
  }


  getMyCompanie() {
    this.companieService.getCompanie('', {})
      .subscribe(
        res => {
          this.myCompanie = res
        },
        error => {
          console.log(error);
        }
      )
  }


  drawingSignatureUpdated(result) {
    // this.fetchedQuote.drawingSignature.isSigned = true
    this.fetchedQuote.drawingSignature.base64Temp = result

    // this.actionButtonsComponent.save()
  }
  // drawingUpdated(result) {
  //   this.fetchedQuote.drawing.base64 = result
  //   // this.actionButtonsComponent.save()
  // }

  saveSignature() {
    this.fetchedQuote.statusQuote = 'signed'
    if(this.fetchedQuote.drawingSignature.base64Temp) {
      this.fetchedQuote.drawingSignature.base64 = this.fetchedQuote.drawingSignature.base64Temp
    }

      this.quoteService.updateSignature(this.fetchedQuote)
        .subscribe(
        res => {
          this.fetchedQuote = res.obj
          this.authService.successNotif(res.message)
          // this.nextStep.emit(this.fetchedQuote)
          this.nextStep()
        },
        error => { console.log(error) }
        )
  }


  savedQuote(result) {
    this.getQuote(result.obj._id)
  }
  quoteDetailsUpdated() {

  }
  getPaiementQuotes(event) {
    // console.log(event)
    this.fetchedQuote.priceQuote.totalPaiementAmount = 0
    this.fetchedPaiementQuotes = event
    this.fetchedPaiementQuotes.forEach(paiement => {
      this.fetchedQuote.priceQuote.totalPaiementAmount += paiement.amount
    })

    this.fetchedQuote.priceQuote.
    outstandingBalance = this.fetchedQuote
    .priceQuote.priceGlobalWithTaxesWithDiscount * 1 - this.fetchedQuote.
    priceQuote.totalPaiementAmount * 1

    if(
      this.fetchedQuote.priceQuote.totalPaiementAmount >= this.fetchedQuote.priceQuote.priceGlobalWithTaxesWithDiscount &&
      this.fetchedQuote.priceQuote.priceQuoteWithoutTaxes &&
      this.fetchedQuote.statusQuote !== 'paid' ) {
        this.fetchedQuote.statusQuote = 'paid'
    }
    this.save()
  }

  save() {
    if(!this.fetchedQuote.clients.length) {
      this.toastr.error('Error!', 'Select a client!')
      return;
    }
    if (this.fetchedQuote._id) {
      this.quoteService.updateQuote(this.fetchedQuote)
        .subscribe(
        res => {
          this.authService.successNotif(res.message)
          this.fetchedQuote = res.obj
          this.fetchedQuote.clients.forEach(user => { this.search.userId = user._id })
          this.search.quoteId = this.fetchedQuote._id
          // this.getQuote(res.obj._id)
          // this.saved.emit(res)
        },
        error => {
          this.toastr.error('error!', error)
        }
        )
    } else {
      this.quoteService.saveQuote(this.fetchedQuote)
        .subscribe(
        res => {
          this.authService.successNotif(res.message)
          this.fetchedQuote = res.obj
          this.fetchedQuote.clients.forEach(user => { this.search.userId = user._id })
          this.search.quoteId = this.fetchedQuote._id
          // this.getQuote(res.obj._id)
          // this.router.navigate(['quote/' + res.obj._id])
          // this.saved.emit(res)
        },
        error => { console.log(error) }
        )
    }
  }
  calculateQuote() {
    let this2 = this;
    setTimeout(() => {
      this2.fetchedQuote.priceQuote.priceQuoteWithTaxes = 0
      this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = 0
      this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = 0
      this2.fetchedQuote.priceQuote.priceGlobalWithDiscount = 0
      this2.fetchedQuote.priceQuote.priceGlobalWithDiscount = 0
      this2.fetchedQuote.priceQuote.priceGlobalWithTaxesWithDiscount = 0

      this2.fetchedQuote.priceQuote.priceQuoteTaxes = []
      this2.VATs.forEach(VAT => {
        const newPriceQuoteTaxe = new PriceQuoteTaxe()
        newPriceQuoteTaxe.VAT = VAT
        this2.fetchedQuote.priceQuote.priceQuoteTaxes.push(newPriceQuoteTaxe)
      })

      this2.fetchedQuote.devisDetails.forEach((devisDetails, i) => {
        this2.fetchedQuote.devisDetails[i].bucketProducts.forEach((product, j) => {

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .surface = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .width * this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .length


          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithDiscount = product.priceWithoutTaxes
            * (1 - this2.fetchedQuote.devisDetails[i].bucketProducts[j].discount / 100)

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithTaxes = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithoutTaxes * (1 + this2.fetchedQuote.devisDetails[i].bucketProducts[j].vat / 100)

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithTaxesWithDiscount = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithTaxes * (1 - this2.fetchedQuote.devisDetails[i].bucketProducts[j].discount / 100)

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithTaxesWithQuantity = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithTaxes * this2.fetchedQuote.devisDetails[i].bucketProducts[j].quantity

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithTaxesWithQuantityWithDiscount = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithTaxesWithQuantity
            * (1 - this2.fetchedQuote.devisDetails[i].bucketProducts[j].discount / 100)



          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithQuantity = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithoutTaxes * this2.fetchedQuote.devisDetails[i].bucketProducts[j].quantity


          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithQuantityWithDiscount = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithQuantity * (1 - this2.fetchedQuote.devisDetails[i].bucketProducts[j]
                .discount / 100)


          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithQuantityWithDiscount = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithQuantityWithDiscount * this2.fetchedQuote.devisDetails[i].bucketProducts[j].surface

          this2.fetchedQuote.devisDetails[i].bucketProducts[j]
            .priceWithTaxesWithQuantityWithDiscount = this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithQuantityWithDiscount * (1 - this2.fetchedQuote.devisDetails[i].bucketProducts[j].vat / 100)


          this2.fetchedQuote.priceQuote
            .priceQuoteWithTaxes += this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithTaxesWithQuantityWithDiscount * 1


          this2.fetchedQuote.priceQuote
            .priceQuoteWithoutTaxes += this2.fetchedQuote.devisDetails[i].bucketProducts[j]
              .priceWithQuantityWithDiscount * 1


          this2.fetchedQuote.priceQuote
            .priceGlobalWithDiscount = this2.fetchedQuote.priceQuote
              .priceQuoteWithoutTaxes
            * (1 - this2.fetchedQuote.priceQuote.discountGlobal / 100)

          this2.fetchedQuote.priceQuote
            .priceGlobalWithDiscount = this2.fetchedQuote.priceQuote
              .priceGlobalWithDiscount * (1 + this2.fetchedQuote.priceQuote.painfulnessGlobal / 100)

          this2.fetchedQuote.priceQuote
            .priceGlobalWithTaxesWithDiscount = this2.fetchedQuote.priceQuote
              .priceGlobalWithDiscount * (1 + this2.fetchedQuote.priceQuote.vatGlobal / 100)

          this2.fetchedQuote.priceQuote.priceQuoteTaxes.forEach((priceQuoteTaxe, i) => {
            if (priceQuoteTaxe.VAT === product.vat) {
              this2.fetchedQuote.priceQuote.priceQuoteTaxes[i]
                .TotalVAT += (product.priceWithDiscount * product.vat / 100) * product.quantity
            }
          })
        })
      })
      // this2.quoteDetailsUpdated.emit(this2.fetchedQuote)
    })
  }
}
