import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PaiementQuoteService} from '../paiementQuote.service';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {PaiementQuote} from '../paiementQuote.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';





@Component({
  selector: 'app-paiementQuote',
  templateUrl: './editPaiementQuote.component.html',
  styleUrls: ['../paiementQuote.component.css'],
})
export class EditPaiementQuoteComponent implements OnInit {
  @Output() newPaiementQuoteSaved: EventEmitter<any> = new EventEmitter();
  @Input() showHeader = true;

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

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' }
]
  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private productService: ProductService,
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
      amount: [''],
      type: [''],
    })
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
      if(params['idPaiementQuote'])
        this.getPaiementQuote(params['idPaiementQuote'])
      if(params['idQuote'])
       this.getQuote(params['idQuote'])
    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }


    selectQuote(quote: Quote){
      this.fetchedPaiementQuote.quotes = [quote]
    }

    editDateMode() {
      this.fetchedPaiementQuote.editDateMode = !this.fetchedPaiementQuote.editDateMode
    }

    getQuote(idQuote: string) {
      this.quoteService.getQuote(idQuote, {})
        .subscribe(
          res => {
            this.fetchedPaiementQuote.quotes = [res]
          },
          error => { console.log(error) }
        )
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
            this.newPaiementQuoteSaved.emit()
              // this.router.navigate(['paiementQuote/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }







  goBack() {
    this.location.back();
  }





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
