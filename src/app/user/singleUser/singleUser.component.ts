import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from '../user.model';
import { Form } from '../../form/form.model';
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './singleUser.component.html',
  styleUrls: ['../user.component.css'],
})


export class SingleUserComponent implements OnInit {

  maxPictureToShow = 3
  fetchedUser: User = new User();

  meUser: User = new User();

  public myForm: FormGroup;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }

  getObjects(myForm: any){
     return myForm.get('forms').controls
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      lastVisit: [''],
      forms: this._fb.array([])
    })
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }



  removeNoteDialog(i:number){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.removeNote(i)
      }
    })
  }
  removeNote(i: number){
    this.fetchedUser.notes.splice(i, 1)
    this.save()
  }


  removeFormDialog(i:number){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.removeForm(i)
      }
    })
  }
  removeForm(i: number) {
      this.fetchedUser.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i)
      this.save()
  }
  addForm(form: Form) {
    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
        owner: ['', Validators.required],
        imagePath: ['', Validators.required],
    });
    control.push(addrCtrl);
  }


  goBack() {
    this.location.back();
  }


  seeAllPicture(){
    this.router.navigate(['user/' + this.fetchedUser._id + "/userPictures"]);
  }
  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addForm(result)
        this.fetchedUser.forms.unshift(result)
        this.save()
      }
    })
  }

  save() {
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }



  setDateToday(){
    this.fetchedUser.lastVisit = new Date()
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }
  isMyClient(){
    let isMyClient = false
    this.fetchedUser.profile.parentUser.forEach(parentUser => {
      if(parentUser._id  === this.authService.currentUser.userId)
        isMyClient =  true
    })
    return isMyClient
  }
  // getMeUser() {
  //   let id = this.authService.currentUser.userId
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         this.meUser = res.user
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  // }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = res.user
          this.fetchedUser.forms.forEach((form : Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      );
  }


}
