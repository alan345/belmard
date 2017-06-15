import { Component, OnInit} from '@angular/core';
import { ProductService} from './product.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from './product.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
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

  data:Array<Object> =
  [
    {
      'categ':'Serrurerie',
      'subCateg': [
        {
          'categ':'Serrurerie de bâtiment',
          'subCateg': [
            {categ: 'Clés'},
            {categ: 'Cylindres'},
            {categ:'Verrous'}
          ]
        },
        {
          'categ':'Ferme-portes',
          'subCateg': [
            {categ: 'Ferme-portes contemporains'},
            {categ: 'Ferme-portes technologies à came'},
            {categ: 'Ferme-portes technologies pignons à crémaillère'}
          ]
        },
      ]
    },
    {
      'categ':'Menuiserie',
      'subCateg': [
        {
          'categ':'Portes',
          'subCateg': [
            {categ: 'Fenêtres bois ou PVC'},
            {categ: 'Portes et portes fenêtres'},
            {categ: 'Coulissants bois ou PVC'},
          ]
        }
      ]
    }
  ]



  // fetchedProduct: Product = {
  //   _id: '',
  //   title: '',
  //   embed: '',
  //   embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
  //   categories: [],
  //   owner: []
  // }


  fetchedProduct: Product = new Product();

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
  ) {
  }




  getObjects(myForm: any){
     return myForm.get('categories').controls
   }

  ngOnInit() {



    this.myForm = this._fb.group({

      details: this._fb.group({
        referenceName: ['', [Validators.required, Validators.minLength(2)]],
        reference: ['', [Validators.required, Validators.minLength(2)]],
        price: this._fb.group({
          costPrice: ['', [Validators.required, Validators.minLength(5)]],
          sellingPrice: ['', [Validators.required, Validators.minLength(5)]],
        }),
      })
    })



    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProduct(params['id'])
    })
  }


  // removeCategorie(i: number) {
  //     this.fetchedProduct.categories.splice(i, 1)
  //     const control = <FormArray>this.myForm.controls['categories'];
  //     control.removeAt(i);
  //     let _2this = this
  //   //  setTimeout(function(){
  //         _2this.refreshHardCategories()
  //   //  }, 10);
  //
  //
  //     //this.updatecategoriesHard2()
  // }
  addCategorie() {
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
        name: [''],
        type:['']
    });
    control.push(addrCtrl);
  }
  // addCategorieInput() {
  //   this.togglCategorieButton(this.inputCategorie, 'tag')
  //   this.inputCategorie=''
  // }
  // togglCategorieButton(nameCateg: string, type: string) {
  //   var indexFound: number
  //   this.fetchedProduct.categories.forEach((categorie, index) => {
  //     if(categorie.name == nameCateg)
  //       indexFound = index
  //   })
  //
  //   if(indexFound || indexFound== 0 ) {
  //     let _2this = this
  //     setTimeout(function(){
  //         _2this.removeCategorie(+indexFound)
  //     }, 10);
  //
  //   } else {
  //     this.fetchedProduct.categories.push({name:nameCateg, type:type})
  //     this.addCategorie()
  //   }
  // }


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


  save(product : Product) {


    if(product._id) {
      console.log('update')
      this.productService.updateProduct(product)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['product']);
          },
          error => {console.log(error)}
        );
    } else {
      console.log('save')
      this.productService.saveProduct(product)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['product']);
          },
          error => {console.log(error)}
        );
    }
  }

  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard2[indexHard].selected = true
  //       }
  //     })
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard1[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.fetchedProduct.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getProduct(id : string) {
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
