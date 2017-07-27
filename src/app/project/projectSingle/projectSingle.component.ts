import { Component, OnInit, Input} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, ItemSteps, StatusProject } from '../project.model';
import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
import { QuoteService} from '../../quote/quote.service';

import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { AuthService} from '../../auth/auth.service';



@Component({
  selector: 'app-projectSingle',
  templateUrl: './projectSingle.component.html',
  styleUrls: ['../project.component.css'],

})

export class ProjectSingleComponent implements OnInit {

  @Input() showBackButton: Boolean = true;

  // listBoxers: Array<string> = ['Sugar Ray Robinson', 'Muhammad Ali', 'George Foreman', 'Joe Frazier', 'Jake LaMotta', 'Joe Louis', 'Jack Dempsey', 'Rocky Marciano', 'Mike Tyson', 'Oscar De La Hoya'];
  // listTeamOne: Array<string> = ['aaa'];
  // listTeamTwo: Array<string> = [];
  //



  selectedIndex0: number = -1
  selectedIndex1: number = -1
  selectedIndex2: number = -1
  // show1 = false
  // show2 = false
  // categ0: string = '';
  // categ1: string = '';
  // categ2: string = '';

  itemSteps = ItemSteps;


  status = StatusProject
  categ: string = 'Electricité';
  subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  fetchedQuotes: Quote[] = [];


  fetchedProject: Project = new Project();


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
    private authService: AuthService,
  ) {
  }





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

    this.getItemSteps()
  }

  getItemSteps() {


    let currentUser = this.authService.getCurrentUser()
    currentUser.companies.forEach((companie,index) => {
      // console.log(companie)
      // console.log(JSON.parse(currentUser.companies[index].categJson.categProject))
      if(currentUser.companies[index].categories.categProject)
        this.itemSteps = currentUser.companies[index].categories.categProject
    })
  }


  addCalendar(){
    let queryParams = {}
    queryParams['new'] = true
    if(this.fetchedProject.assignedTos.length) {queryParams['idUserNew'] = this.fetchedProject.assignedTos[0]._id}
    if(this.fetchedProject._id) {queryParams['idProjectNew'] = this.fetchedProject._id}
    if(this.fetchedProject.clients.length) {queryParams['idClientNew'] = this.fetchedProject.clients[0]._id }
    this.router.navigate(['userCalendar/', queryParams])
  }
  seeCalendar(){
    let queryParams = {}
    if(this.fetchedProject.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedProject.assignedTos[0]._id }
    if(this.fetchedProject._id)                 {queryParams['idProjectSearch'] = this.fetchedProject._id}
    if(this.fetchedProject.clients.length)      {queryParams['idClientSearch'] = this.fetchedProject.clients[0]._id}
    this.router.navigate(['userCalendar/', queryParams])
  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          //this.fetchedUsers[0] = res.user
          this.selectUser(res)
        },
        error => {
          console.log(error);
        }
      );
  }

  changeCascade(selectedIndex0, selectedIndex1, selectedIndex2) {
    this.selectedIndex0 = selectedIndex0
    this.selectedIndex1 = selectedIndex1
    this.selectedIndex2 = selectedIndex2

  }



  // autocomplete user
  selectUser(user: User) {
    // this.autocompleteUser=''
    // this.fetchedUsers = []
    this.fetchedProject.clients = [user]
  }
  // searchUsers() {
  //   if(!this.autocompleteUser) {
  //      this.fetchedUsers = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteUser,
  //       };
  //     this.getUsers(1, search)
  //   }
  // }
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
  // removeUser(i: number) {
  //   this.fetchedProject.clients.splice(i, 1);
  // }
  // autocomplete user


  removePic(i) {
    this.fetchedProject.forms.splice(i, 1);
  }



    // autocomplete AssignedTo
    // autocompleteAssignedTo: string = '';
    // fetchedAssignedTos: User[] = [];
    selectAssignedTo(user: User) {
      // this.autocompleteAssignedTo=''
      // this.fetchedAssignedTos = []
      this.fetchedProject.assignedTos = [user]
    }
    // searchAssignedTos() {
    //   if(!this.autocompleteAssignedTo) {
    //      this.fetchedAssignedTos = []
    //   } else {
    //     let search = {
    //         search: this.autocompleteAssignedTo,
    //       };
    //     this.getAssignedTos(1, search)
    //   }
    // }
    // getAssignedTos(page: number, search: any) {
    //   this.userService.getUsers(page, search)
    //     .subscribe(
    //       res => {
    //         this.fetchedAssignedTos = res.data
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    // }
    // removeAssignedTo(i: number) {
    //   this.fetchedProject.assignedTos.splice(i, 1);
    // }
    // autocomplete user





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

    this.fetchedProject.dateProject.creationDate = this.authService.HTMLDatetoIsoDate(this.fetchedProject.dateProject.creationDateString)

    let categName0 = ''
    let categName1 = ''
    let categName2 = ''

    if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
    if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
    if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}


    this.fetchedProject.categorie.categ0 = [{name: categName0}]
    this.fetchedProject.categorie.categ1 = [{name: categName1}]
    this.fetchedProject.categorie.categ2 = [{name: categName2}]



    if(this.fetchedProject._id) {


      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedProject = res.obj
            // this.router.navigate(['project/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {

      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedProject = res.obj
            // this.router.navigate(['project/' + res.obj._id]);
          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedProject._id).then(function(){
          // this2.router.navigate(['user']);
          this2.goBack();
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
          let categName0 = ''
          let categName1 = ''
          let categName2 = ''
          this.fetchedProject = <Project>res
          // console.log(this.fetchedProject.categorie)
          if(this.fetchedProject.categorie.categ0.length)
            categName0 = this.fetchedProject.categorie.categ0[0].name
          if(this.fetchedProject.categorie.categ1.length)
            categName1 = this.fetchedProject.categorie.categ1[0].name
          if(this.fetchedProject.categorie.categ2.length)
            categName2 = this.fetchedProject.categorie.categ2[0].name

          this.itemSteps.forEach((categ0, index) => {
            if(categ0.categ === categName0)
              this.selectedIndex0 = index
          })

          if(this.selectedIndex0 >= 0)
          this.itemSteps[this.selectedIndex0].subCateg.forEach((categ1,index) => {
            if(categ1.categ === categName1)
              this.selectedIndex1 = index
          })
          if(this.selectedIndex1 >= 0)
          this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg.forEach((categ2,index) => {
            if(categ2.categ === categName2)
              this.selectedIndex2 = index
          })


          this.fetchedProject.dateProject.creationDateString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.creationDate)



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
