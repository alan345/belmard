import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { QuoteService} from '../../quote/quote.service';
import { Quote} from '../../quote/quote.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';



@Component({
  selector: 'app-quote',
  templateUrl: './quotes.component.html',
  styleUrls: ['../../admin/admin.component.css'],
})
export class QuotesComponent implements OnInit {
  fetchedQuotes: Quote[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy : '',
    search: '',
    quoteType: '',
  };

  constructor(
    private quoteService: QuoteService,
    private authService: AuthService,
  //  private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.search.orderBy = 'name'
    this.getQuotes(this.paginationData.currentPage, this.search)
  }

  openDialog() {

  }

  goBack() {
    this.location.back();
  }

  searchInput() {
    this.getQuotes(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy
    this.getQuotes(this.paginationData.currentPage, this.search)
  }

  onDelete(id: string) {
    this.quoteService.deleteQuote(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {

    this.loading = true;
    this.getQuotes(page, this.search);
  }


  getQuotes(page: number, search: any) {
    this.quoteService.getQuotes(page, search)
      .subscribe(
        res => {
        //  console.log("quotes");
        //  console.log(res);
          this.paginationData = res.paginationData;
          this.fetchedQuotes =  res.data
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }
  isStylist() {
    return this.authService.isStylist();
  }
  isSalesRep(){
    return this.authService.isSalesRep();
  }
  isManager(){
    return this.authService.isManager();
  }

}