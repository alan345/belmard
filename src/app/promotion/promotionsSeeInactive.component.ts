import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {PromotionService} from './promotion.service';
import {Promotion} from './promotion.model';
import {ToastsManager} from 'ng2-toastr';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotionsSeeInactive.component.html',
  styleUrls: ['./promotion.component.css'],

})
export class PromotionsSeeInactiveComponent implements OnInit {
  fetchedPromotions: Promotion[] = [];
  loading: boolean;

  search = {
    orderBy : 'name',
    search: '',
    filterDate: false
  }

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  constructor(
    private promotionService: PromotionService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) {
    this.getPromotions(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }

  searchInput(){
    this.getPromotions(1)
  }

  onDelete(id: string) {
    this.promotionService.deletePromotion(id)
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
    this.getPromotions(page);
  }

  // loadMore(){
  //   this.paginationData.currentPage = this.paginationData.currentPage+1
  //   this.getPromotions(this.paginationData.currentPage)
  // }

  orderBy(orderBy:string) {
    this.search.orderBy = orderBy
    this.getPromotions(1)
  }

  getPromotions(page : number) {
    this.loading = true
    this.promotionService.getPromotions(page, this.search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          if(this.paginationData.currentPage ===1)
            this.fetchedPromotions = []

            this.fetchedPromotions =  res.data

          // res.data.forEach(obj => {
          //   this.fetchedPromotions.push(obj)
          // })
          this.loading = false
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {}

  isAdmin() {
    return this.authService.isAdmin();
  }
}
