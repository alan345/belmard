import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {QuoteService} from './quote.service';
import {ProductService} from '../product/product.service';
import { ProjectService} from '../project/project.service';

import {Quote, DevisDetails} from './quote.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../user/user.service';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Project } from '../project/project.model';





@Component({
  selector: 'app-quote',
  templateUrl: './editQuote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class EditQuoteComponent implements OnInit {
  fetchedQuote : Quote = new Quote()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []
  fetchedProjects: Project[] = []
  userAdmins : User[] = []
  userManagers : User[] = []
  userClients : User[] = []
  usersSalesRep : User[] = []
  userStylists : User[] = []
  myForm: FormGroup;
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];

  constructor(
    private quoteService: QuoteService,
  //  private projectService: ProjectService,
    private projectService: ProjectService,
    private userService: UserService,
    private productService: ProductService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,




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
      if(params['idClient'])
       this.getUser(params['idClient'])
     if(params['idProject'])
      this.getProject(params['idProject'])
    })
  }

  // removeUserFromQuote(i:number, typeUser: string){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this[typeUser].splice(i, 1)
  //       this.save()
  //     }
  //   })
  // }







    selectUser(user: User) {
      this.fetchedUsers = []
      this.fetchedQuote.clients.push(user)
    }

    searchUsers() {
      let search = {
          search: this.autocompleteUser,
        };
      this.getUsers(1, search)
    }


    getUser(id: string) {
      this.userService.getUser(id)
        .subscribe(
          res => {
            this.selectUser(res.user)
          },
          error => {
            console.log(error);
          }
        );
    }

    getUsers(page: number, search: any) {
      this.userService.getUsers(page, search)
        .subscribe(
          res => {
            this.fetchedUsers = res.data
          },
          error => {
            console.log(error);
          }
        );
    }

    removeUser(i: number) {
      this.fetchedQuote.clients.splice(i, 1);
    }










    selectProject(project: Project) {
      this.fetchedProjects = []
      this.fetchedQuote.projects.push(project)
    }

    searchProjects() {
      let search = {
          search: this.autocompleteProject,
        };
      this.getProjects(1, search)
    }


    getProject(id: string) {
      this.projectService.getProject(id)
        .subscribe(
          res => {

            this.selectProject(res)
          },
          error => {
            console.log(error);
          }
        );
    }

    getProjects(page: number, search: any) {
      this.projectService.getProjects(page, search)
        .subscribe(
          res => {
            this.fetchedProjects = res.data
          },
          error => {
            console.log(error);
          }
        );
    }

    removeProject(i: number) {
      this.fetchedQuote.projects.splice(i, 1);
    }





  save() {

    if(this.fetchedQuote._id) {
      this.quoteService.updateQuote(this.fetchedQuote)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['quote/edit/' + this.fetchedQuote._id])
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
              this.router.navigate(['quote/edit/' + res.obj._id])
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
        priceWithoutTaxes: product.details.price.sellingPrice,
        priceWithTaxes:0,
        totalPriceWithTaxes:0,
        totalPriceWithoutTaxes:0,
        quantity: 1,
        discount: 0,
      }
      this.autocompleteProduct = ''
      this.fetchedQuote.devisDetails.push(devisDetails)
      this.calculateQuote()


    }
    calculateQuote() {
      let this2 = this;
      setTimeout(function(){
        this2.fetchedQuote.priceQuote.priceQuoteWithTaxes = 0
        this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = 0
        this2.fetchedQuote.devisDetails.forEach((product, i) => {

          this2.fetchedQuote.devisDetails[i].priceWithTaxes = product.priceWithoutTaxes * 1 + (product.priceWithoutTaxes * product.vat / 100)
          this2.fetchedQuote.devisDetails[i].totalPriceWithTaxes = this2.fetchedQuote.devisDetails[i].priceWithTaxes * product.quantity
          this2.fetchedQuote.devisDetails[i].totalPriceWithoutTaxes = product.priceWithoutTaxes * product.quantity

          this2.fetchedQuote.priceQuote.priceQuoteWithTaxes = this2.fetchedQuote.priceQuote.priceQuoteWithTaxes*1 + this2.fetchedQuote.devisDetails[i].totalPriceWithTaxes*1
          this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes = this2.fetchedQuote.priceQuote.priceQuoteWithoutTaxes*1 + this2.fetchedQuote.devisDetails[i].totalPriceWithoutTaxes*1

        })
        //this2.save()
      }, 20)

    }
    removeProduct(i: number) {
      this.fetchedQuote.devisDetails.splice(i, 1);
      this.calculateQuote()
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




  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.quoteService.deleteQuote(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }


  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedQuote._id).then(function(){
          this2.router.navigate(['quote']);
        })

      }
    })
  }


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
