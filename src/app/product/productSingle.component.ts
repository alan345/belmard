import { Component, OnInit} from '@angular/core';
import { ProductService} from './product.service';
import { CompanieService} from '../companie/companie.service';


import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product, ProductSteps } from './product.model';
import { Companie } from '../companie/companie.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-products',
  templateUrl: './productSingle.component.html',
  styleUrls: ['./product.component.css'],

})

export class ProductSingleComponent implements OnInit {

  categ1: string = 'Serrurerie';
  categ2: string = 'Serrurerie de bâtiment';
  categ3: string = 'Clés';
  autocompleteCompanie: string = '';
  productSteps = ProductSteps;



  // fetchedProduct: Product = {
  //   _id: '',
  //   title: '',
  //   embed: '',
  //   embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
  //   categories: [],
  //   owner: []
  // }


  fetchedProduct: Product = new Product();
  fetchedCompanies: Companie[] = []
  // categoriesHard2 = [
  //   { name:'Through your eyes', selected : false },
  //   { name:'How to', selected : false },
  //   { name:'Fashion', selected : false },
  //   { name:'Merchandising', selected : false },
  //   { name:'Behind the Scene & Testimonials', selected : false }
  // ]


  //
  // categoriesHard1 = [{
  //     name:'phyto',
  //     selected : false
  //   },
  //   {
  //     name:'phytoSpecific',
  //     selected : false
  //   },
  //   {
  //     name:'subtil',
  //     selected : false
  //   }]

  inputCategorie = ''



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




  // getObjects(myForm: any){
  //    return myForm.get('categories').controls
  //  }

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

  searchCompanies() {
    let search = {
        search: this.autocompleteCompanie,
      };
    this.getCompanies(1, search)
  }

  selectCompanie(companie: Companie){
    this.fetchedProduct.vendors.push(companie)
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




  goBack() {
    this.location.back();
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        this.fetchedProduct.forms.push( result)
      }
    })
  }


  save() {

    // this.fetchedProduct.categorie.categ1[0].name = this.categ1
    // this.fetchedProduct.categorie.categ2[0].name = this.categ2
    // this.fetchedProduct.categorie.categ3[0].name = this.categ3

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

          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          // this.fetchedProduct.categories.forEach((categorie) => {
          //   this.addCategorie()
          // })
          // this.refreshHardCategories()
        },
        error => {
          console.log(error);
        }
      )
  }

  onDelete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      )
  }
}
