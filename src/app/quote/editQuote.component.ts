import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {QuoteService} from './quote.service';
import {ProductService} from '../product/product.service';


import {Quote, DevisDetails} from './quote.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';




@Component({
  selector: 'app-quote',
  templateUrl: './editQuote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class EditQuoteComponent implements OnInit {
  fetchedQuote : Quote = new Quote()
  fetchedProducts: Product[] = []
  userAdmins : User[] = []
  userManagers : User[] = []
  userClients : User[] = []
  usersSalesRep : User[] = []
  userStylists : User[] = []
  myForm: FormGroup;
  autocompleteProduct: String = ''

  constructor(
    private quoteService: QuoteService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      address: this._fb.group({
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zip: ['', [Validators.required, Validators.minLength(2)]],
      }),
      _users: this._fb.array([])
    })


    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getQuote(params['id'])
    })
  }

  removeUserFromQuote(i:number, typeUser: string){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this[typeUser].splice(i, 1)
        this.save()
      }
    })
  }

  save() {

    if(this.fetchedQuote._id) {
      this.quoteService.updateQuote(this.fetchedQuote)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['quote/' + this.fetchedQuote._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.quoteService.saveQuote(this.fetchedQuote)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
              this.router.navigate(['quote/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }



    searchProducts() {
      let search = {
          search: this.autocompleteProduct,
        };
      this.getProducts(1, search)
    }

    selectProduct(product: Product) {
      this.fetchedProducts = []
      let devisDetails: DevisDetails = {
        productInit: product,
        vat: 20,
        finalPrice: product.details.price.sellingPrice,
        quantity: 0,
        discount: 0,
      }
      this.fetchedQuote.devisDetails.push(devisDetails)
    }

    removeProduct(i: number) {
      this.fetchedQuote.devisDetails.splice(i, 1);
    }

    getProducts(page: number, search: any) {
      this.productService.getProducts(page, search)
        .subscribe(
          res => {
            this.fetchedProducts = res.data
          },
          error => {
            console.log(error);
          }
        );
    }



  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


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

  goBack() {
    this.location.back();
  }

  // addUser(user) {
  //   const control = <FormArray>this.myForm.controls['_users'];
  //   const addrCtrl = this._fb.group({
  //       _id: ['', Validators.required],
  //   });
  //   control.push(addrCtrl);
  // }

  getQuote(id: string) {
    this.quoteService.getQuote(id, {})
      .subscribe(
        res => {
          this.fetchedQuote = res
          this.fetchedQuote._users.forEach((user) => {
            if(user.role[0] === 'admin')
              this.userAdmins.push(user)
            if(user.role[0] === 'salesRep')
              this.usersSalesRep.push(user)
            if(user.role[0] === 'client')
              this.userClients.push(user)
            if(user.role[0] === 'stylist')
              this.userStylists.push(user)
            if(user.role[0] === 'manager')
              this.userManagers.push(user)
          //  this.addUser(user)
          })
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  isManager() {
    return this.authService.isManager();
  }
  isSalesRep() {
    return this.authService.isSalesRep();
  }
  isHQquote(){
    if(this.fetchedQuote.typeQuote === 'HQ')
      return true
    return false
  }

}
