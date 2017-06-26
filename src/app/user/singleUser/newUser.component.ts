import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { Companie } from '../../companie/companie.model';
import { CompanieService } from '../../companie/companie.service';

import { ToastsManager} from 'ng2-toastr';

import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from '../user.model';
import { Form } from '../../form/form.model';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'


@Component({
  selector: 'app-users',
  templateUrl: './newUser.component.html',
  styleUrls: ['../user.component.css'],

})

export class NewUserComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  fetchedCompanies: Companie[] = []
  autocompleteCompanie: string = '';
  // fetchedCompanieInit : Companie = {
  //   _id: '',
  //   forms:[],
  //   name: '',
  //   typeCompanie: '',
  //   phoneNumber: '',
  //   address: {
  //     address : '',
  //     city :  '',
  //     state :  '',
  //     zip :  ''
  //   },
  //   _users:[]
  // }
  // fetchedCompanieAfter : Companie = {
  //   _id: '',
  //   forms:[],
  //   name: '',
  //   typeCompanie: '',
  //   phoneNumber: '',
  //   address: {
  //     address : '',
  //     city :  '',
  //     state :  '',
  //     zip :  ''
  //   },
  //   _users:[]
  // }
  companieIndexToSelect = ''


  fetchedUser: User = new User();

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService,
    private companieService: CompanieService,
  ) {
  }


  searchCompanies() {
    let search = {
        search: this.autocompleteCompanie,
      };
    this.getCompanies(1, search)
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

  selectCompanie(companie: Companie) {
    this.fetchedCompanies = []
    this.fetchedUser.companies.push(companie)
  }

  removeCompanie(i: number) {
    this.fetchedUser.companies.splice(i, 1);
  }
  ngOnInit() {
    this.myForm = this._fb.group({


        email: [this.emailValidator],

        profile: this._fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            phoneNumber: [''],
            // parentUser: this._fb.array([]),

        })
    })

    // let userId = this.authService.currentUser.userId
    // this.companieService.getCompanieByUserId(userId)
    this.companieService.getCompanieForCurrentUser()
    .subscribe(
      (data => {
        this.fetchedCompanies = data

        if(this.fetchedCompanies.length)
          this.companieIndexToSelect = this.fetchedCompanies[0]._id
        // Ok mes tes clients sont dans quel salon? ==> je prends le premier salon qui nest pas HQ
        // if(data.length)
        //   this.fetchedCompanie = data[0]
      })
    )

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        this.getUser(params['id'])
      }

    })
  }


  emailValidator(control: any) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  goBack() {
    this.location.back();
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedUser._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }

  saveAndCreateProject() {
    this.save('project')
  }
  save(redirect: string) {
    console.log(redirect)
    if(this.fetchedUser._id) {
      this.userService.updateUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            if(redirect == 'profile')
              this.router.navigate(['user/profile/' + res.obj._id])
            if(redirect == 'project')
              this.router.navigate(['project/new/' + res.obj._id])
          },
          error => {
            this.toastr.error('Error!')
            console.log(error)
          }
        )
    } else {
      this.fetchedUser.role=['client']
      this.userService.saveUser(this.fetchedUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            if(redirect == 'profile')
              this.router.navigate(['user/profile/' + res.obj._id])
            if(redirect == 'project')
              this.router.navigate(['project/new/' + res.obj._id])
            // this.addUserIdToCompanie(res.obj)
            //this.router.navigate(['user'])
          },
          error => {
            console.log(error)
            this.toastr.error('Error!')
          }
        );
    }
  }


  // addUserIdToCompanie(user : User) {
  // //  console.log(this.fetchedCompanieInit)
  // //  console.log(this.fetchedCompanieAfter)
  //   //let companieToUpdate = {}
  //
  //
  //     if(this.fetchedCompanieInit._id !== this.fetchedCompanieAfter._id ) {
  //       this.fetchedCompanieInit._users.forEach((userInit, index) =>{
  //         if(userInit._id === this.fetchedUser._id) {
  //           delete this.fetchedCompanieInit._users[index]
  //           this.companieService.updateCompanie(this.fetchedCompanieInit)
  //             .subscribe(
  //               res => {
  //                 //console.log('User removed from previous companie' + this.fetchedCompanieInit.name)
  //                 //this.onPassForm.emit();
  //                 this.toastr.success('Great!', 'User removed from previous companie' + this.fetchedCompanieInit.name)
  //                 //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
  //
  //               },
  //               error => {console.log(error)}
  //             )
  //
  //         }
  //       })
  //     }
  //
  //     this.fetchedCompanies.forEach((companie, index) => {
  //       if(companie._id == this.companieIndexToSelect) {
  //         this.fetchedCompanieAfter = this.fetchedCompanies[index]
  //       }
  //     })
  //
  //     let okAddUserToCompanie = true
  //     this.fetchedCompanieAfter._users.forEach((userFetch) => {
  //       if(userFetch._id === user._id) {
  //         okAddUserToCompanie = false
  //       }
  //     })
  //     if(!okAddUserToCompanie){
  //       console.log('error! user already exists in salon')
  //       //this.toastr.error('error! user already exists in salon')
  //       this.goBack()
  //       //this.router.navigate(['companie/' + this.fetchedCompanieAfter._id]);
  //       //this.navigate(this.fetchedCompanie._id)
  //     } else {
  //       this.fetchedCompanieAfter._users.push(user)
  //       this.companieService.updateCompanie(this.fetchedCompanieAfter)
  //         .subscribe(
  //           res => {
  //             //this.onPassForm.emit();
  //             this.toastr.success('Great!', res.message)
  //             //this.router.navigate(['companie/' + this.fetchedCompanie._id]);
  //             this.goBack()
  //             //this.navigate(user._id)
  //           },
  //           error => {console.log(error)}
  //         )
  //     }
  //
  //
  // }

  navigate(id: string){
    this.router.navigate(['user/' + id])
  }


  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user
        },
        error => {
          console.log(error);
        }
      )
  }


  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userService.deleteUser(id)
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
