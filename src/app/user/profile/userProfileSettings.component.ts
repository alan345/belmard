import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../user.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from '../user.model';
import { Form } from '../../form/form.model';
import { Companie } from '../../companie/companie.model';
import { EditOptionsComponentDialog } from '../../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { CompanieService} from '../../companie/companie.service';



@Component({
  selector: 'app-users',
  templateUrl: './userProfileSettings.component.html',
  styleUrls: ['./userProfile.component.css'],
})


export class UserProfileSettingsComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  maxPictureToShow = 3;
  instapic = 1;
  companies: Companie[] = []
  isEditMode: boolean = false
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

  getObjects(myForm: any){
     return myForm.get('forms').controls
   }

   editMode(){
     this.isEditMode = !this.isEditMode
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      lastVisit: [''],
      profile: this._fb.group({
        _profilePicture: this._fb.group({
          _id: ['', [Validators.required, Validators.minLength(5)]]
        }),
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        title: ['', [Validators.required, Validators.minLength(2)]]
      }),
      forms: this._fb.array([])
    })

    //let userId = this.authService.currentUser.userId


    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['id']
      this.getUser(userId)
      this.companieService.getCompanieByUserId(userId)
      .subscribe(
        (data => this.companies = data)
      )
    })
  }


  getUser(id : string) {
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
    this.router.navigate(['user/profile/' + this.fetchedUser._id + "/userProfilePictures"]);
  }


  openDialog(positionImage: string) {
    if(positionImage == '_profilePicture') {
      let dialogRef = this.dialog.open(EditOptionsComponentDialog);
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.fetchedUser.profile._profilePicture[0] = result
          this.save()
        }
      })
    } else {
      let dialogRef = this.dialog.open(EditOptionsComponentDialog);
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.addForm(result)
          this.fetchedUser.forms.unshift(result)
          this.save()
        }
      })
    }
  }

  save() {
    this.editMode()
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
