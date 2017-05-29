import { Component, OnInit} from '@angular/core';
import { ProductService} from './product.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Product } from './product.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './productSingle.component.html',
  styleUrls: ['./product.component.css'],

})

export class ProductSingleComponent implements OnInit {

  urlMagento: string = 'http://52.2.61.43/pub/media/catalog/product';
  fetchedProduct: Product = new Product(this.sanitizer);

  // fetchedProduct: Product = {
  //   _id: '',
  //   categories: [],
  //   categoriesTag: [],
  //   description: {
  //     benefitsAndResults: '',
  //     howToApply: '',
  //     activeIngredients: '',
  //     title : {
  //       prononciation: '',
  //       embed: '',
  //       embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
  //     }
  //   },
  //   magento : {
  //     id: '',
  //     sku: '',
  //     name: '',
  //     price: 0,
  //     weight: '',
  //     custom_attributes: [],
  //   }
  // };

  categories5 = [
    { name: 'Benefits & Results', selected : false},
    { name: 'How to apply', selected : false },
    { name: 'Active Ingredients', selected : false },

  ]


  categoriesHard2 = [
    {
      name:'treatments',
      selected : false
    },
    {
      name:'knowledges',
      selected : false
    },
    {
      name:'testimonials',
      selected : false
    },
    {
      name:'merchandising',
      selected : false
    },
    {
      name:'promotions',
      selected : false
    }
  ]

  categoriesHard1 = [{
      name:'phyto',
      selected : false
    },
    {
      name:'phytoSpecific',
      selected : false
    },
    {
      name:'subtil',
      selected : false
    }]

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
  ) {
  }




  getObjects(myForm: any){
    //console.log(myForm.get('categories').controls)
     return myForm.get('categories').controls
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],

      categories: this._fb.array([])
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProduct(params['id'])
    })
  }

  onSelectChange = ($event: any): void => {
    //
  }

  removeCategorie(i: number) {
      this.fetchedProduct.categories.splice(i, 1)
      const control = <FormArray>this.myForm.controls['categories'];
      control.removeAt(i);
      let _2this = this
    //  setTimeout(function(){
          _2this.refreshHardCategories()
    //  }, 10);


      //this.updatecategoriesHard2()
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
    this.inputCategorie=''
  }
  togglCategorieButton(nameCateg: string, type: string) {
    //console.log('togglCategorieButton')
    var indexFound:number;
    this.fetchedProduct.categories.forEach((categorie, index) => {
      if(categorie.name == nameCateg)
        indexFound = index
    })

    if(indexFound || indexFound== 0 ) {
      let _2this = this
      setTimeout(function(){
          _2this.removeCategorie(+indexFound)
      }, 10);

    } else {
      this.fetchedProduct.categories.push({name:nameCateg, type:type})
      this.addCategorie()
    }
  }


  goBack() {
    this.location.back();
  }
  // openDialogWhereProduct(){
  //   let dialogRefDelete = this.dialog.open(ProductWhereDialogComponent)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     // if(result) {
  //     //   this.onDelete(this.fetchedProduct._id)
  //     //   this.router.navigate(['product']);
  //     // }
  //   })
  // }
  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedProduct[positionImage] = result
      }
    })
  }

  // openDialogDelete(){
  //   let dialogRefDelete = this.dialog.open(ProductDeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedProduct._id)
  //       this.router.navigate(['product']);
  //     }
  //   })
  // }

  save(product : Product) {
    //console.log(this.fetchedProduct)
    if(!this.fetchedProduct.categories.length){
      this.toastr.error('Error!', 'Please select at least one categorie')
      return
    }

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


  refreshHardCategories(){
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
  }




  getProduct(id : string) {
    this.productService.getProduct(id)
      .subscribe(
        res => {

          this.fetchedProduct = <Product>res

        //  this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)


            this.fetchedProduct.description.title.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.fetchedProduct.description.title.embed )

            this.fetchedProduct['categoriesTag'] = []
            this.fetchedProduct.categories.forEach((categorie) => {
              this.addCategorie()
              if(categorie.type === 'tag') {
                this.fetchedProduct['categoriesTag'].push(categorie)
              }
            })
            //this.fetchedProducts.push(product)




          // this.fetchedProduct.categories.forEach((categorie) => {
          //   this.addCategorie()
          // })
          this.refreshHardCategories()
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
