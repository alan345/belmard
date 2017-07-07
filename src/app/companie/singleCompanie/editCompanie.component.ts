import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../companie.service';
import {UserService} from '../../user/user.service';


import {Companie} from '../companie.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';

import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  fetchedCompanie: Companie = new Companie()

  userAdmins : User[] = []
  userManagers : User[] = []
  userClients : User[] = []
  usersSalesRep : User[] = []
  userStylists : User[] = []
  myForm: FormGroup;

  constructor(
    private companieService: CompanieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      categJson: this._fb.group({
        categProduct: ['']
      }),
      option: this._fb.group({
        calendar: this._fb.group({
          timeBegin: ['', [Validators.required, Validators.minLength(1)]],
          timeEnd: ['', [Validators.required, Validators.minLength(1)]],
        }),
      }),
      address: this._fb.group({
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zip: ['', [Validators.required, Validators.minLength(2)]],
      }),
      _users: this._fb.array([])
    })

    this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {

      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getCompanie('')
        } else {
          this.getCompanie(params['id'])
        }
      }

    })
  }

  fetchedCurrentUser: User = new User()
  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => { this.fetchedCurrentUser = res },
        error => { console.log(error) }
      )
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedCompanie.forms.push(result)
      }
    })
  }

  removeForm(i: number) {
      this.fetchedCompanie.forms.splice(i, 1)
      this.save();
  }

  // removeUserFromCompanie(i:number, typeUser: string){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this[typeUser].splice(i, 1)
  //       this.save()
  //     }
  //   })
  // }

  save() {
    //this.fetchedCompanie.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedCompanie.categJson.categProduct))
    if(this.fetchedCompanie._id) {
      this.companieService.updateCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          //  this.router.navigate(['companie/' + this.fetchedCompanie._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.companieService.saveCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //  this.router.navigate(['companie/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }


saveToMyCompanie(){
  this.companieService.saveCompanie(this.fetchedCompanie)
    .subscribe(
      res => {
        this.userService.addCompanieToMyself(res.obj)
          .subscribe(
            res => {
              // this.userService.cleanCurrentUserInSession()
              location.reload();
              this.toastr.success('Great!', res.message)
            },
            error => {console.log(error)}
          )
        this.toastr.success('Great!', res.message)
      },
      error => {console.log(error)}
    )
}
  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['companie/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  goBack() {
    this.location.back();
  }



  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }


}