import { Component, OnInit} from '@angular/core';
import { PressService} from './press.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Press } from './press.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component';


@Component({
  selector: 'app-presses',
  templateUrl: './pressSingle.component.html',
  styleUrls: ['./press.component.css'],

})

export class PressSingleComponent implements OnInit {
  //fetchedPress = new Press()
  //fetchedPress: Press;
  //fetchedPress._id='';


  fetchedPress : Press = {
    _id: '',
    title: '',
    link: '',
    formPDF: [],
    form: [],
    owner: []
  }


  public myForm: FormGroup;

  constructor(
    private pressService: PressService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      link: [''],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getPress(params['id'])
    })
  }

  removePDF(i:number){
    this.fetchedPress.formPDF.splice(i, 1)
    this.disableLinkInput()
  }
  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedPress._id).then(function(){
          this2.router.navigate(['press']);
        })
      }
    })
  }


  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedPress[positionImage][0] = result
        if(positionImage === 'formPDF')
          this.disableLinkInput()
      }
    })
  }

  goBack() {
    this.location.back();
  }
  disableLinkInput(){
    let ctrl = this.myForm.get('link')
    ctrl.enabled ? ctrl.disable() : ctrl.enable()
    this.fetchedPress.link=''
  }

  save() {
    //let press: Press = this.fetchedPress
    if(!this.fetchedPress.form.length) {
      this.toastr.error('Error!', 'Select picture')
      return
    }
    if(!((this.fetchedPress.link || this.fetchedPress.formPDF.length)
      && this.fetchedPress.form.length)) {
        this.toastr.error('Error!', 'Select PDF or link')
        return
      }

    if(this.fetchedPress._id) {
      this.pressService.updatePress(this.fetchedPress)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['press'])
          },
          error => {console.log(error)}
        );
    } else {
      this.pressService.savePress(this.fetchedPress)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['press'])
          },
          error => {console.log(error)}
        );
    }
  }




  getPress(id: string) {
    this.pressService.getPress(id)
      .subscribe(
        res => {
          this.fetchedPress = res
          if(this.fetchedPress.formPDF.length)
            this.disableLinkInput()
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {

      this2.pressService.deletePress(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        );
    })
  }
}
