import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { PaiementQuoteService} from '../../paiementQuote/paiementQuote.service';
import { PaiementQuote} from '../../paiementQuote/paiementQuote.model';
import { MatDialog} from '@angular/material';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Search, PaginationData} from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';
import { PaiementQuoteDialogComponent } from '../single/dialog/paiementQuoteDialog.component';
// import { ToastsManager} from 'ng2-toastr';
// import { Location} from '@angular/common';



@Component({
  selector: 'app-paiementQuotes',
  templateUrl: './paiementQuotes.component.html',
  styleUrls: ['../paiementQuote.component.css'],
})
export class PaiementQuotesComponent implements OnInit, OnChanges {
  @Output() getPaiementQuotesCross: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() showBack: number = -1;
  loading = false;
  fetchedPaiementQuotes: PaiementQuote[] = [];

  paginationData = new PaginationData();

  // @Input() userId = '';
  // @Input() idQuote = '';
  // @Input() showHeader = true;
  // @Output() newPaiementSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showCreate = true;
  // search = {
  //   orderBy : '',
  //   search: '',
  //   idQuote:'',
  //   isExpense: false
  // };

  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    // private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    // private location: Location,
    private globalEventsManager: GlobalEventsManager,
  ) {}



  ngOnChanges() {
    // console.log(this.search)
    this.getPaiementQuotes(this.paginationData.currentPage, this.search);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['isExpense'] === 'true') {
        this.search.isExpense = true
      } else {
        this.search.isExpense = false
      }
      this.getPaiementQuotesInit();
    })
  }


  getPaiementQuotesInit() {
    const this2 = this
    setTimeout(function(){
      // this2.search.quoteId = this2.idQuote
      this2.search.orderBy = 'name';
      this2.getPaiementQuotes(1, this2.search)
    }, 200);
  }
  // searchPaiementQuotes() {}


  // goBack() {
  //   this.location.back();
  // }

  searchInput() {
    this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy
    this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  // onDelete(id: string) {
  //   this.paiementQuoteService.deletePaiementQuote(id)
  //     .subscribe(
  //       res => {
  //         this.getPaiementQuotesInit()
  //         this.authService.successNotif(res.message);
  //         this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
  //         // console.log(res);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }


  getPage(page: number) {
    this.getPaiementQuotes(page, this.search);
  }


  getPaiementQuotes(page: number, search: any) {
    this.loading = true;
    this.paiementQuoteService.getPaiementQuotes(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedPaiementQuotes =  res.data
          this.loading = false;
          this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }
  saved(result) {
    // this.getPaiementQuotesInit()
    // console.log('saved')
    // this.newPaiementSaved.emit()
    this.getPaiementQuotes(1, this.search)
  }

  openDialogPaiement(paiementQuoteId: string) {
    const this2 = this
    const dialogRef = this.dialog.open(PaiementQuoteDialogComponent, {
      data : {
        search: {
          paiementQuoteId: paiementQuoteId
        }
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log('ab')
      // if (result) {
      //   console.log('a')
      // console.log(this.search)
        this.getPaiementQuotes(this.paginationData.currentPage, this.search)
        // this.onDelete(this.fetchedPaiementQuote._id).then(function(){
        //   this2.router.navigate(['paiementQuote/list']);
        // })
      // }
    })
  }

  // isAdmin() {
  //   return this.authService.isAdmin();
  // }


}
