import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../companie.service';
import {Companie} from '../companie.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { Form } from '../../form/form.model';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

import { User } from '../../user/user.model';


@Component({
  selector: 'app-companie',
  templateUrl: './companieDetail.component.html',
  styleUrls: ['../companie.component.css'],
})
export class CompanieDetailComponent implements OnInit {
  maxPictureToShow = 3;
  users: User[] = [];
  userAdmins: User[] = [];
  fetchedCompanie: Companie = new Companie();
  // {
  //   _id: '',
  //   forms: [],
  //   name: '',
  //   typeCompanie: '',
  //   phoneNumber: '',
  //   address: {
  //     address : '',
  //     city :  '',
  //     state :  '',
  //     zip :  ''
  //   },
  //   _users: []
  // };

  search = {
    orderBy : '-client',
    search: '',
    parentUser: '',
    role: '',
    onlyMyUsers: false,
  };

  public myForm: FormGroup;



  constructor(
    private companieService: CompanieService,

//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {

  }



  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      //this.fetchedCompanie=
      //this.router.navigate(['companie/' + params['id'] ]);
      //console.log('init')
      this.myForm = this._fb.group({
        forms: this._fb.array([])
      })
      if(params['id'])
        this.getCompanie(params['id'])

    })
  }
  goBack() {
    this.location.back();
  }

  removeForm(i: number) {
      this.fetchedCompanie.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i);
      this.save();
  }

  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  save() {
    this.companieService.updateCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  seeAllPicture(){
    this.router.navigate(['companie/' + this.fetchedCompanie._id + '/companiePictures']);
  }

  addForm(form : Form) {
    const control = <FormArray>this.myForm.controls['forms'];
    const addrCtrl = this._fb.group({
        _id: ['', Validators.required],
        owner: ['', Validators.required],
        imagePath: ['', Validators.required],
    });
    control.push(addrCtrl);
  }

  getObjects(myForm: any){
    return myForm.get('forms').controls
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        if(result.type ==='pdf') {
          this.toastr.error('No pdf!');
        } else {
          this.addForm(result)
          this.fetchedCompanie.forms.push(result)
          this.save()
        }

      }
    })
  }



  getCompanie(id : string) {
    this.companieService.getCompanie(id, this.search)
      .subscribe(
        res => {
          this.fetchedCompanie = res

          // this.fetchedCompanie._users.forEach((user) => {
          //   if(user.role[0] === 'salesRep')
          //     this.users.push(user)
          //   if(user.role[0] === 'admin')
          //     this.userAdmins.push(user)
          // })
          //
          // this.fetchedCompanie.forms.forEach((form: Form) => {
          //   this.addForm(form)
          // })
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }
  isStylist() {
    return this.authService.isStylist();
  }
  isSalesRep(){
    return this.authService.isSalesRep();
  }
  isManager(){
    return this.authService.isManager();
  }
  isHQcompanie(){
    if(this.fetchedCompanie.typeCompanie === 'HQ')
      return true
    return false
  }


}
