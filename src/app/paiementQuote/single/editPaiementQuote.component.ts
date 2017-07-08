import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PaiementQuoteService} from '../paiementQuote.service';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {PaiementQuote} from '../paiementQuote.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';

declare let jsPDF;


import { SignaturePad } from 'angular2-signaturepad/signature-pad';



@Component({
  selector: 'app-paiementQuote',
  templateUrl: './editPaiementQuote.component.html',
  styleUrls: ['../paiementQuote.component.css'],
})
export class EditPaiementQuoteComponent implements OnInit {

  showPaiements: boolean = false
  fetchedPaiementQuote : PaiementQuote = new PaiementQuote()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []
  fetchedProjects: Project[] = []
  // currentUser: User = new User()
  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []

  myForm: FormGroup;
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]
  constructor(
    private paiementQuoteService: PaiementQuoteService,
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



    this.activatedRoute.params.subscribe((params: Params) => {

      if(params['id'])
        this.getPaiementQuote(params['id'])
    //   if(params['idClient'])
    //    this.getUser(params['idClient'])
    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }



    private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
      minWidth: 1,
      maxWidth: 7,
      canvasWidth: 250,
      canvasHeight: 200,
      penColor: "rgb(36, 41, 46)"
    };

    togglePaiements(){
      this.showPaiements = !this.showPaiements
    }



















  save() {
    // this.fetchedPaiementQuote.paiements.forEach((paiement, index) =>{
    //   let year = Number(this.fetchedPaiementQuote.paiements[index].datePaiement.toString().substring(0, 4))
    //   let month = Number(this.fetchedPaiementQuote.paiements[index].datePaiement.toString().substring(5, 7))
    //   let day = Number(this.fetchedPaiementQuote.paiements[index].datePaiement.toString().substring(8, 10))
    //   this.fetchedPaiementQuote.paiements[index].datePaiement = new Date(year, month-1, day)
    // })
    if(this.fetchedPaiementQuote._id) {
      this.paiementQuoteService.updatePaiementQuote(this.fetchedPaiementQuote)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['paiementQuote/edit/' + this.fetchedPaiementQuote._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.paiementQuoteService.savePaiementQuote(this.fetchedPaiementQuote)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
              this.router.navigate(['paiementQuote/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }



    searchProducts() {

      if(!this.autocompleteProduct) {
        this.fetchedProducts = []
      } else {
        let search = {
            search: this.autocompleteProduct,
          };
        this.getProducts(1, search)
      }
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
      this2.paiementQuoteService.deletePaiementQuote(id)
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
        this.onDelete(this.fetchedPaiementQuote._id).then(function(){
          this2.router.navigate(['paiementQuote']);
        })

      }
    })
  }


  getPaiementQuote(id: string) {
    this.paiementQuoteService.getPaiementQuote(id, {})
      .subscribe(
        res => {
          this.fetchedPaiementQuote = res

        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }



}
