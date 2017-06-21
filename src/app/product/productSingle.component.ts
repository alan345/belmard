import { Component, OnInit} from '@angular/core';
import { ProductService} from './product.service';
import { CompanieService} from '../companie/companie.service';


import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product, ItemSteps } from './product.model';
import { Companie } from '../companie/companie.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'



@Component({
  selector: 'app-products',
  templateUrl: './productSingle.component.html',
  styleUrls: ['./product.component.css'],

})

export class ProductSingleComponent implements OnInit {

  selectedIndex1 = 0
  selectedIndex2 = 0
  show1 = false
  show2 = false

  categ1: string = '';
  categ2: string = '';
  categ3: string = '';
  autocompleteCompanie: string = '';
  itemSteps = ItemSteps;





  fetchedProduct: Product = new Product();
  fetchedCompanies: Companie[] = []

  //
  // inputCategorie = ''



  public myForm: FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private companieService: CompanieService,
  ) {
  }




  ngOnInit() {
    this.myForm = this._fb.group({

      details: this._fb.group({
        referenceName: ['', [Validators.required, Validators.minLength(2)]],
        reference: ['', [Validators.required, Validators.minLength(2)]],
        description: [''],
        price: this._fb.group({
          costPrice: ['', [Validators.required, Validators.minLength(1)]],
          sellingPrice: ['', [Validators.required, Validators.minLength(1)]],
        }),
        dimension: this._fb.group({
          height: ['', [Validators.required, Validators.minLength(1)]],
          width: ['', [Validators.required, Validators.minLength(1)]],
          depth: ['', [Validators.required, Validators.minLength(1)]],
        }),
      })
    })



    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProduct(params['id'])
    })
  }

  changeCascade(selectedIndex1, selectedIndex2) {
    //console.log(selectedIndex1, selectedIndex2)

    this.selectedIndex1 = selectedIndex1
    this.selectedIndex2 = selectedIndex2
  }

  searchCompanies() {
    let search = {
        search: this.autocompleteCompanie,
      };
    this.getCompanies(1, search)
  }

  selectCompanie(companie: Companie) {
    this.fetchedCompanies = []
    this.fetchedProduct.vendors.push(companie)
  }

  removeCompanie(i: number) {
    this.fetchedProduct.vendors.splice(i, 1);
  }

  getCompanies(page: number, search: any) {
    this.companieService.getCompanies(page, search)
      .subscribe(
        res => {
          this.fetchedCompanies = res.data
        },
        error => {
          console.log(error);
        }
      );
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedProduct._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedProduct.forms.push( result)
      }
    })
  }


  save() {
    console.log(this.categ1)

    this.fetchedProduct.categorie.categ1 = [{name: this.categ1}]
    this.fetchedProduct.categorie.categ2 = [{name: this.categ2}]
    this.fetchedProduct.categorie.categ3 = [{name: this.categ3}]
    if(this.fetchedProduct._id) {

      this.productService.updateProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['product']);
          },
          error => {console.log(error)}
        );
    } else {

      this.productService.saveProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['product']);
          },
          error => {console.log(error)}
        );
    }
  }




  getProduct(id: string) {
    this.productService.getProduct(id)
      .subscribe(
        res => {

          this.fetchedProduct = <Product>res
          this.categ1 = this.fetchedProduct.categorie.categ1[0].name
          this.categ2 = this.fetchedProduct.categorie.categ2[0].name
          this.categ3 = this.fetchedProduct.categorie.categ3[0].name

          let categ1Index:number = 0
          let categ2Index:number = 0
          this.itemSteps.forEach((categ1,index) => {
            if(categ1.categ === this.categ1)
              categ1Index = index
          })
          this.itemSteps[categ1Index].subCateg.forEach((categ2,index) => {
            if(categ2.categ === this.categ2)
              categ2Index = index
          })

          this.changeCascade(categ1Index, categ2Index)
        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.productService.deleteProduct(id)
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


}
