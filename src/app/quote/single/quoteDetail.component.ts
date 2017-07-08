import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {QuoteService} from '../quote.service';
import {Quote} from '../quote.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { Form } from '../../form/form.model';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

import { User } from '../../user/user.model';


@Component({
  selector: 'app-quote',
  templateUrl: './quoteDetail.component.html',
  styleUrls: ['../quote.component.css'],
})
export class QuoteDetailComponent implements OnInit {
  maxPictureToShow = 3;
  users: User[] = [];
  userAdmins: User[] = [];
  fetchedQuote: Quote = new Quote();

  search = {
    orderBy : '-client',
    search: '',
    parentUser: '',
    role: '',
    onlyMyUsers: false,
  };

  public myForm: FormGroup;



  constructor(
    private quoteService: QuoteService,

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
      //this.fetchedQuote=
      //this.router.navigate(['quote/' + params['id'] ]);
      //console.log('init')
      this.myForm = this._fb.group({
        forms: this._fb.array([])
      })
      if(params['id'])
        this.getQuote(params['id'])

    })
  }
  goBack() {
    this.location.back();
  }

  removeForm(i: number) {
      this.fetchedQuote.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i);
      this.save();
  }

  onDelete(id: string) {
    this.quoteService.deleteQuote(id)
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
    this.quoteService.updateQuote(this.fetchedQuote)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
  }

  seeAllPicture(){
    this.router.navigate(['quote/' + this.fetchedQuote._id + '/quotePictures']);
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
        if(result.type ==='pdf') {
          this.toastr.error('No pdf!');
        } else {
          this.addForm(result)
          this.fetchedQuote.forms.push(result)
          this.save()
        }

      }
    })
  }



  getQuote(id : string) {
    this.quoteService.getQuote(id, this.search)
      .subscribe(
        res => {
          this.fetchedQuote = res

          this.fetchedQuote._users.forEach((user) => {
            if(user.role[0] === 'salesRep')
              this.users.push(user)
            if(user.role[0] === 'admin')
              this.userAdmins.push(user)
          })

          this.fetchedQuote.forms.forEach((form: Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }

  isHQquote(){
    if(this.fetchedQuote.typeQuote === 'HQ')
      return true
    return false
  }


}
