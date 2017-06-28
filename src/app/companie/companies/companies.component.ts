import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { CompanieService} from '../../companie/companie.service';
import { Companie} from '../../companie/companie.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';



@Component({
  selector: 'app-companie',
  templateUrl: './companies.component.html',
  styleUrls: ['../../admin/admin.component.css'],
})
export class CompaniesComponent implements OnInit {
  fetchedCompanies: Companie[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy : '',
    search: '',
    companieType: '',
  };

  constructor(
    private companieService: CompanieService,
    private authService: AuthService,
  //  private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.search.orderBy = 'name'
    this.getCompanies(this.paginationData.currentPage, this.search)
  }

  openDialog() {

  }

  goBack() {
    this.location.back();
  }

  searchInput() {
    this.getCompanies(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy
    this.getCompanies(this.paginationData.currentPage, this.search)
  }

  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
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


  searchCompanies() {
    this.getCompanies(1, this.search)
  }


  getPage(page: number) {

    this.loading = true;
    this.getCompanies(page, this.search);
  }


  getCompanies(page: number, search: any) {
    this.companieService.getCompanies(page, search)
      .subscribe(
        res => {
        //  console.log("companies");
        //  console.log(res);
          this.paginationData = res.paginationData;
          this.fetchedCompanies =  res.data
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
