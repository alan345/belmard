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

  categ: string = 'Electricité';

  subCateg: string = 'file';

  data:Array<Object> =
  [
    {
      'categ':'Plomberie',
      'subCategD': ['robinet', 'douche', 'joint']},
    {
      'categ':'Electricité',
      'subCategD': ['lampe', 'file', 'douille']},
    {
      'categ':'Serrurerie',
      'subCategD': ['cle', 'verou', 'porte']}
  ];

  // fetchedProduct: Product = {
  //   _id: '',
  //   title: '',
  //   embed: '',
  //   embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
  //   categories: [],
  //   owner: []
  // }


  fetchedProduct: Product = new Product();

  categoriesHard2 = [
    { name:'Through your eyes', selected : false },
    { name:'How to', selected : false },
    { name:'Fashion', selected : false },
    { name:'Merchandising', selected : false },
    { name:'Behind the Scene & Testimonials', selected : false }
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
     return myForm.get('categories').controls
   }

  ngOnInit() {



    this.myForm = this._fb.group({
      _id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      embed: ['', [Validators.required, Validators.minLength(5)]],
      categories: this._fb.array([])
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProduct(params['id'])
    })
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
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
        name: [''],
        type:['']
    });
    control.push(addrCtrl);
  }
  addCategorieInput() {
    this.togglCategorieButton(this.inputCategorie, 'tag')
    this.inputCategorie=''
  }
  togglCategorieButton(nameCateg: string, type: string) {
    var indexFound: number
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
    if(!this.fetchedProduct.categories.length){
      this.toastr.error('Error!', 'Please select at least one categorie')
      return
    }

    if(product._id) {
      this.productService.updateProduct(product)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['product']);
          },
          error => {console.log(error)}
        );
    } else {
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

          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + res.embed )
          //this.fetchedProduct.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          this.fetchedProduct.categories.forEach((categorie) => {
            this.addCategorie()
          })
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
