import { Component, OnInit} from '@angular/core';
import { ProjectService} from './project.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, ItemSteps } from './project.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
import { UserService} from '../user/user.service';
import { QuoteService} from '../quote/quote.service';

import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';



@Component({
  selector: 'app-projects',
  templateUrl: './projectSingle.component.html',
  styleUrls: ['./project.component.css'],

})

export class ProjectSingleComponent implements OnInit {

  selectedIndex1 = 0
  selectedIndex2 = 0
  show1 = false
  show2 = false
  categ1: string = '';
  categ2: string = '';
  categ3: string = '';
  itemSteps = ItemSteps;


  status = [
    {index: 0, label: 'RDV planifié'},
    {index: 1, label: 'Rappeler'},
    {index: 2, label: 'Stand-By'},
    {index: 3, label: 'Devis à faire'},
    {index: 4, label: 'Attente Validation'},
    {index: 5, label: 'Devis validée, A envoyer'},
    {index: 6, label: 'Attente approbation'},
    {index: 7, label: 'Devis refusé'},
    {index: 8, label: 'Devis accepté – Attente acompte'},
    {index: 9, label: 'En cours de réalisation'},
    {index: 10, label: 'Terminé'},
  ]
  categ: string = 'Electricité';

  subCateg: string = 'file';
  autocompleteUser: string = '';
  autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  fetchedQuotes: Quote[] = [];
  // data:Array<Object> =
  // [
  //   {
  //     'categ':'Plomberie',
  //     'subCategD': ['robinet', 'douche', 'joint']},
  //   {
  //     'categ':'Electricité',
  //     'subCategD': ['lampe', 'file', 'douille']},
  //   {
  //     'categ':'Serrurerie',
  //     'subCategD': ['cle', 'verou', 'porte']}
  // ];



  fetchedProject: Project = new Project();

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

  // inputCategorie = ''
  //


  public myForm: FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    private quoteService: QuoteService,
  ) {
  }




  // getObjects(myForm: any){
  //    return myForm.get('categories').controls
  //  }

  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProject(params['id'])

      if(params['idClient'])
       this.getUser(params['idClient'])
    })
  }

  selectUser(user: User) {
    this.fetchedUsers = []
    this.fetchedProject.clients.push(user)
  }

  searchUsers() {
    let search = {
        search: this.autocompleteUser,
      };
    this.getUsers(1, search)
  }
  changeCascade(selectedIndex1, selectedIndex2) {
    this.selectedIndex1 = selectedIndex1
    this.selectedIndex2 = selectedIndex2
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
    this.fetchedProject.clients.splice(i, 1);
  }







    selectQuote(quote: Quote) {
      this.fetchedQuotes = []
      this.fetchedProject.quotes.push(quote)
    }

    searchQuotes() {
      let search = {
          search: this.autocompleteQuote,
        };
      this.getQuotes(1, search)
    }

    getQuotes(page: number, search: any) {
      this.quoteService.getQuotes(page, search)
        .subscribe(
          res => {
            this.fetchedQuotes = res.data
          },
          error => {
            console.log(error);
          }
        );
    }

    removeQuote(i: number) {
      this.fetchedProject.clients.splice(i, 1);
    }
  // removeCategorie(i: number) {
  //     this.fetchedProject.categories.splice(i, 1)
  //     const control = <FormArray>this.myForm.controls['categories'];
  //     control.removeAt(i);
  //     //let _2this = this
  //   //  setTimeout(function(){
  //       //  _2this.refreshHardCategories()
  //   //  }, 10);
  //
  //
  //     //this.updatecategoriesHard2()
  // }

  // searchUsers(){
  //   //this.getUsers(1,
  // }

  // getUsers(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //         this.paginationData = res.paginationData;
  //         this.fetchedUsers =  res.data;
  //         this.loading = false;
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  // addCategorie() {
  //   const control = <FormArray>this.myForm.controls['categories'];
  //   const addrCtrl = this._fb.group({
  //       name: [''],
  //       type:['']
  //   });
  //   control.push(addrCtrl);
  // }
  // addCategorieInput() {
  //   this.togglCategorieButton(this.inputCategorie, 'tag')
  //   this.inputCategorie=''
  // }
  // togglCategorieButton(nameCateg: string, type: string) {
  //   var indexFound: number
  //   this.fetchedProject.categories.forEach((categorie, index) => {
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
  //     this.fetchedProject.categories.push({name:nameCateg, type:type})
  //   //  this.addCategorie()
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
        this.fetchedProject.forms.push( result)
      }
    })
  }


  save() {
    if(this.fetchedProject._id) {

      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['project']);
          },
          error => {console.log(error)}
        );
    } else {

      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['project']);
          },
          error => {console.log(error)}
        );
    }
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedProject._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }


  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedProject.categories.forEach((fetchedCategorie, indexFetched) => {
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
  //     this.fetchedProject.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getProject(id : string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProject = <Project>res

          //this.fetchedProject.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/project/' + res.embed )
          //this.fetchedProject.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          // this.fetchedProject.categories.forEach((categorie) => {
          //   //this.addCategorie()
          // })
          //this.refreshHardCategories()
        },
        error => {
          console.log(error);
        }
      )
  }


    onDelete(id: string) {
      let this2 = this
      return new Promise(function(resolve, reject) {
        this2.projectService.deleteProject(id)
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
