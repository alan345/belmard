import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {PromotionService} from './promotion.service';
import {Promotion} from './promotion.model';
import {ToastsManager} from 'ng2-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotion.component.css'],

})
export class PromotionsComponent implements OnInit {
  fetchedPromotions: Promotion[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy: '',
    search: '',
    filterDate: true
  };

  constructor(
    private promotionService: PromotionService,
    private toastr: ToastsManager,
    private location: Location,
    private authService: AuthService,
  ) {
    this.getPromotions(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
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

  getPromotions(page: number) {
    this.promotionService.getPromotions(page, this.search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedPromotions = res.data;
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
