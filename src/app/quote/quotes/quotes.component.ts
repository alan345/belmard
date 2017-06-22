import { Component, OnInit, Input} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { QuoteService} from '../../quote/quote.service';
import { Quote} from '../../quote/quote.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';



@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['../../admin/admin.component.css'],
})
export class QuotesComponent implements OnInit {
  @Input() userId = '';
  @Input() projectId = '';

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
    userId:'',
    projectId:'',
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
    let this2 = this
    setTimeout(function(){
      //console.log(this2.userId)
      this2.search.userId = this2.userId
      this2.search.projectId = this2.projectId


      this2.search.orderBy = 'name'
      this2.getQuotes(this2.paginationData.currentPage, this2.search)
    }, 200);

  }

  // ngAfterViewInit(){
  //   console.log(this.userId)
  //   this.search.userId = this.userId
  //   this.search.orderBy = 'name'
  //   this.getQuotes(this.paginationData.currentPage, this.search)
  // }


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
