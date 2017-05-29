import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { User, ProductBought } from '../user.model';
import { FormBuilder } from '@angular/forms';
import { ProductService} from '../../product/product.service';
import { Product } from '../../product/product.model';


@Component({
  selector: 'app-users',
  templateUrl: './userProductsHistory.component.html',
  styleUrls: ['../user.component.css'],

})

export class UserProductsHistory implements OnInit {
  loading: boolean = false;
  fetchedUser: User = new User();
  inputBoughtProduct: string = '';
  fetchedBoughtProducts: Product[] = [];


  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private productService: ProductService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {}




  ngOnInit() {
    // this.myForm = this._fb.group({
    //     newDate: ['', [Validators.required, Validators.minLength(2)]],
    // });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id']);
    });
  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user;
        },
        error => {
          console.log(error);
        }
      );
  }

  searchBoughtProducts() {
    let search: any = {
      categories : [],
      search: this.inputBoughtProduct
    };
    this.getProducts(1, search);
  }


  getProducts(page: number, search: any) {
    this.loading = true;
    this.productService.getProducts(page, search)
      .subscribe(
        res => {
          this.fetchedBoughtProducts = [];
          this.fetchedBoughtProducts = res.data;
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  selectProduct(product: Product) {
    let productBought: ProductBought = {
      dateProductAdded: new Date(),
      product: product
    }
    this.fetchedUser.products.push(productBought);

    this.fetchedBoughtProducts = [];
    this.inputBoughtProduct = '';
  }
  removeProduct(i: number) {
    this.fetchedUser.products.splice(i, 1);
  }


  goBack() {
    this.location.back();
  }


  save() {
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
    this.goBack()
    }

}
