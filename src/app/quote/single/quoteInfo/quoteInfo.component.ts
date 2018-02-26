import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Quote } from '../../quote.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Search} from '../../../shared/shared.model'
import { AuthService} from '../../../auth/auth.service';
import { Companie} from '../../../companie/companie.model';
// import { Location } from '@angular/common';
// import { DragulaService } from 'ng2-dragula';
// import {ToastsManager} from 'ng2-toastr';
// import {Router, ActivatedRoute, Params } from '@angular/router';
// import {QuoteService} from '../../quote.service';
// import { PaiementQuote } from '../../../paiementQuote/paiementQuote.model';
  // import {AuthService} from '../../../auth/auth.service';
  // import {TemplateQuoteService} from '../../templateQuote.service';

  // import {ProductService} from '../../../product/product.service';
  // import { ProjectService} from '../../../project/project.service';
// import {TemplateQuote } from '../../templateQuote.model';

// import {MatDialog } from '@angular/material';
// import { UserService} from '../../../user/user.service';
// import { DeleteDialog } from '../../../deleteDialog/deleteDialog.component';
// import { User } from '../../../user/user.model';
// import { Product } from '../../../product/product.model';
// import { Project } from '../../../project/project.model';
// import { PaiementQuoteDialogComponent } from '../../paiementQuote/single/dialog/paiementQuoteDialog.component';
// import { PaiementQuoteDialogComponent } from '../../../paiementQuote/single/dialog/paiementQuoteDialog.component'

// import { TranslateService } from '../../../translate/translate.service';
// declare let jsPDF;
// import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { SignaturePad } from '../../../angular2-signaturepad/signature-pad';

// import { PaiementQuotesComponent } from '../../../paiementQuote/paiementQuotes/paiementQuotes.component';
// import { DateAdapter, NativeDateAdapter } from '@angular/material';

@Component({
  selector: 'app-quoteInfo',
  templateUrl: './quoteInfo.component.html',
  styleUrls: ['../../quote.component.css'],
})
export class QuoteInfoComponent implements OnInit {
  loading = false;
  @Output() quoteStatusChangedEmit: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() fetchedQuote: Quote = new Quote();
  @Input() myCompanie: Companie = new Companie();
  myForm: FormGroup;
  typeInterventions: string[] = [];
  // typeInterventionTempBool: boolean[]= []
  // statusQuotes = StatusQuotes
  // fetchedProducts: Product[] = []
  // fetchedPaiementQuotes: PaiementQuote[] = []

  // totalPaiementAmount = 0;
  // showPaiements = false;

  constructor(
    // private toastr: ToastsManager,
    private _fb: FormBuilder,
    // dateAdapter: DateAdapter<NativeDateAdapter>,
    public authService: AuthService,
    // private activatedRoute: ActivatedRoute,
    // private router: Router,
    // private quoteService: QuoteService,
    // private translateService: TranslateService,
    // private location: Location,
    // public dialog: MatDialog,
    // public authService: AuthService,
    // private dragulaService: DragulaService,
  ) {
    // dateAdapter.setLocale(authService.getLanguage());
  }
  //
  // changeStatutsQuote(statusQuoteSelect){
  //   // console.log(statusQuoteSelect)
  // }

  ngOnInit() {

    this.myForm = this._fb.group({
      name: [''],
      quoteNumber: [''],
      statusQuote: [''],
      issueDate: [''],
      // currency: ['', [Validators.required, Validators.minLength(1)]],
      // quoteRef: ['', [Validators.required, Validators.minLength(1)]],
    })

    // this.authService.getCurrentUser().ownerCompanies.forEach(companie => {
    //   this.typeInterventions = companie.typeInterventions
    // })
  }
  // ngOnChanges() {
  //   this.myCompanie.forEach(companie => {
  //     this.typeInterventions = myCompanie.typeInterventions
  //   })
  // }




  changetypeIntervention() {
    this.fetchedQuote.name = this.fetchedQuote.typeIntervention

    this.fetchedQuote.clients.forEach(client => {
      this.fetchedQuote.name += ' - ' + client.profile.name
    })
  }

  quoteStatusChanged() {
    this.quoteStatusChangedEmit.emit()
  }
  clearAutocompleteClient() {
    this.search.userId = '';
    this.save.emit()
  }
  // quoteDetailsUpdated(result) {
  //   // console.log(result)
  //   this.fetchedQuote = result
  // }
  // togglePaiements() {
  //   this.showPaiements = !this.showPaiements
  // }


}
