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

declare let jsPDF;



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
  currentUser: User = new User()
  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []

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

    this.getCurrentUser();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getQuote(params['id'])
      if(params['idClient'])
       this.getUser(params['idClient'])
     if(params['idProject'])
      this.getProject(params['idProject'])
    })
  }


  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => {
          this.currentUser = res
          this.currentUser.companies.forEach(companie => {
            companie.forms.forEach(form => {
              this.imgLogoUrl = "./uploads/forms/" + form.owner + "/" + form.imagePath
            });

          });
        },
        error => {
          console.log(error);
        }
      )
  }

  getBase64Image(imgUrl) {
    return new Promise(
      function(resolve, reject) {

        var img = new Image();
        img.src = imgUrl;
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function() {
          var canvas = document.createElement("canvas");
          // console.log(img.width, img.height)
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          let dataImg = {
            dataURL : dataURL,
            width: img.width,
            height: img.height,
            ratioImg: img.width / img.height
          }
          resolve(dataImg);
        }
        img.onerror = function() {
          reject("The image could not be loaded.");
        }

      });

  }


  downloadPDF() {
      //var imgUrl = './uploads/forms/5942c4a999bc0023cc518c0a/1b90.screen%20shot%202017-06-15%20at%2012.50.08%20pm.png';
      let base64image = this.getBase64Image(this.imgLogoUrl).then(function(dataImg: any) {
              let heightLogo = 50
              var doc = new jsPDF();

              //doc.addPage();
              doc.addImage( dataImg.dataURL, 'png', 15, 20, heightLogo * dataImg.ratioImg, heightLogo);
              doc.setFontSize(22);
              doc.text(20, 90, 'Devis');
              doc.setFontSize(16);
              doc.text(20, 100, 'Pour un cleint de Ouf');

              //doc.text(20, 20, 'Do you like that?');

              // Save the PDF
              doc.save('Test.pdf');

      }, function(reason) {
        console.log(reason); // Error!
      });



  }

    getUser(id: string) {
      this.userService.getUser(id)
        .subscribe(
          res => {
            this.selectUser(res)
          },
          error => { console.log(error) }
        );
    }


    // Autocomplete User
    selectUser(user: User) {
      this.autocompleteUser = ''
      this.fetchedUsers = []
      this.fetchedQuote.clients.push(user)
    }

    searchUsers() {
      if(!this.autocompleteUser) {
        this.fetchedUsers = []
      } else {
        let search = {
            search: this.autocompleteUser,
          };
        this.getUsers(1, search)
      }
    }
    getUsers(page: number, search: any) {
      this.userService.getUsers(page, search)
        .subscribe(
          res => { this.fetchedUsers = res.data },
          error => { console.log(error) }
        );
    }
    removeUser(i: number) {
      this.fetchedQuote.clients.splice(i, 1);
    }
    // Autocomplete User






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


    // autocomplete project
    selectProject(project: Project) {
      this.autocompleteProject = ''
      this.fetchedProjects = []
      this.fetchedQuote.projects.push(project)
    }

    searchProjects() {
      if(!this.autocompleteProject) {
        this.fetchedProjects = []
      } else {
        let search = {
            search: this.autocompleteProject,
          };
        this.getProjects(1, search)
      }
    }
    getProjects(page: number, search: any) {
      this.projectService.getProjects(page, search)
        .subscribe(
          res => { this.fetchedProjects = res.data },
          error => { console.log(error) }
        );
    }
    removeProject(i: number) {
      this.fetchedQuote.projects.splice(i, 1);
    }
    // autocomplete project





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

      if(!this.autocompleteProduct) {
        this.fetchedProducts = []
      } else {
        let search = {
            search: this.autocompleteProduct,
          };
        this.getProducts(1, search)
      }
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


}
