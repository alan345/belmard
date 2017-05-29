import { Component, OnInit} from '@angular/core';
import { ProductService} from './product.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product, categPhyto, categPhytoSpecific, categSubtil } from './product.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-products',
  templateUrl: './productEdit.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductEditComponent implements OnInit {
  loading: boolean = false
  urlMagento = 'http://52.2.61.43/pub/media/catalog/product'
  fetchedProduct: Product = new Product(this.sanitizer);
  fetchedRelatedProducts: Product[] = [];

  categoriesHard2 = []

  categoriesHard1 = [
    { name:'Phyto', selected : false },
    { name:'Phyto Specific', selected : false },
    { name:'Subtil', selected : false }
  ]
  categories3 = [
    { name:'COLORED', selected : false},
    { name:'FINE', selected : false },
    { name:'GRAY/PLATINUM', selected : false },
    { name:'CURLY', selected : false },
    { name:'NORMAL', selected : false },
    { name:'RELAXED', selected : false },
    { name:'UNRULY', selected : false },
  ]
  categories4 = [
    { name:'DAMAGED', selected : false},
    { name:'AGING', selected : false },
    { name:'DRY', selected : false },
    { name:'DANDRUFF', selected : false },
    { name:'UNBALANCED SCALP', selected : false },
    { name:'SENSITIVE SCALP', selected : false },
    { name:'THINNING', selected : false },
    { name:'LIFE-STRESSED', selected : false },
  ]

  inputCategorie: string = '';
  inputRelatedProduct: string = '';
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
  ) {}




  getObjects(myForm: any) {
     return myForm.get('categories').controls
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],
      description: this._fb.group({
        benefitsAndResults: [''],
        howToApply: [''],
        activeIngredients: [''],
        title : this._fb.group({
          prononciation : [''],
          embed: [''],
        })
      }),
      categories: this._fb.array([])
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']){
        this.getProduct(params['id'])
      }

    })
  }



  removeCategorie(i: number) {
      this.fetchedProduct.categories.splice(i, 1)
      const control = <FormArray>this.myForm.controls['categories'];
      control.removeAt(i);
      this.refreshHardCategories()
  }
  addCategorie() {
    //console.log('addCategorie')
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
      name: [''],
      type:['']
    });
    control.push(addrCtrl);

  }
  addCategorieInput() {
    //console.log('addCategorieInput')
    this.togglCategorieButton(this.inputCategorie, 'tag')
    this.inputCategorie = ''
  }

  refreshDynamicCateg() {
      let this2 = this
      setTimeout(function(){
        this2.categoriesHard2 = []
        if(this2.categoriesHard1[0].selected)
          categPhyto.forEach(categ => this2.categoriesHard2.push(categ))
        if(this2.categoriesHard1[1].selected)
          categPhytoSpecific.forEach(categ => this2.categoriesHard2.push(categ))
        if(this2.categoriesHard1[2].selected)
          categSubtil.forEach(categ => this2.categoriesHard2.push(categ))
      }, 50);
  }
  togglCategorieButton(nameCateg: string, type: string) {

    this.refreshDynamicCateg();



    //console.log('togglCategorieButton')
    var indexFound: number
    this.fetchedProduct.categories.forEach((categorie, index) => {
      if(categorie.name == nameCateg)
        indexFound = index
    })

    if(indexFound || indexFound == 0 ) {
      let this2 = this
      setTimeout(function(){
          this2.removeCategorie(+indexFound)
      }, 10);

    } else {
      this.fetchedProduct.categories.push({name:nameCateg, type:type})
      this.addCategorie()
    }
  }

  searchRelatedProducts(){
    let search : any = {
      categories : [],
      search: this.inputRelatedProduct
    }
    this.getProducts(1, search)
  }



  getProducts(page: number, search: any) {
    this.loading = true;
    this.productService.getProducts(page, search)
      .subscribe(
        res => {
          this.fetchedRelatedProducts = []
          this.fetchedRelatedProducts = res.data
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  selectProduct(product: Product){
    this.fetchedProduct.relatedProducts.push(product);
    this.fetchedRelatedProducts = [];
    this.inputRelatedProduct = '';
  }
  removeProduct(i: number) {
    this.fetchedProduct.relatedProducts.splice(i, 1)
  }

  goBack() {
    this.location.back();
  }

  disableInputRelatedProduct() {
    if(this.fetchedProduct.relatedProducts.length < 3)
      return false;
    return true;
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedProduct[positionImage] = result
      }
    })
  }


  save(product: Product) {
    if(!this.fetchedProduct.categories.length){
      this.toastr.error('Error!', 'Please select at least one categorie')
      return
    }

    if(this.fetchedProduct._id) {
      this.productService.updateProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['product']);
            this.goBack()
          },
          error => {console.log(error)}
        );
    } else {
      this.productService.saveProduct(this.fetchedProduct)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['product']);
            this.goBack()
          },
          error => {console.log(error)}
        );
    }
  }


  refreshHardCategories(){

    // console.log(this.categoriesHard2)

    // console.log(this.categoriesHard2)

    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.categoriesHard2[indexHard].selected = false
    })
    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard2[indexHard].selected = true
        }
      })
    })


    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.categoriesHard1[indexHard].selected = false
    })
    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard1[indexHard].selected = true
        }
      })
    })


    this.categories3.forEach((categorie, index) => {
      this.categories3[index].selected = false
    })
    this.categories3.forEach((categorie, index) => {
      this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
        if(categorie.name == fetchedCategorie.name) {
          this.categories3[index].selected = true
        }
      })
    })


    this.categories4.forEach((categorie, index) => {
      this.categories4[index].selected = false
    })
    this.categories4.forEach((categorie, index) => {
      this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
        if(categorie.name == fetchedCategorie.name) {
          this.categories4[index].selected = true
        }
      })
    })


  }




  getProduct(id : string) {
    this.productService.getProduct(id)
      .subscribe(
        res => {
          this.fetchedProduct = <Product>res

        //  this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          this.fetchedProduct.categories.forEach((categorie) => {
            this.addCategorie()
          })
          this.refreshHardCategories()
          this.refreshDynamicCateg()
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
