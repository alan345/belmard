import { Component, OnInit} from '@angular/core';

import { PromotionService} from './promotion.service';

import { ToastsManager} from 'ng2-toastr';

import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Promotion } from './promotion.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { PromotionDeleteDialog } from './promotionDeleteDialog.component';


@Component({
  selector: 'app-promotions',
  templateUrl: './singlePromotion.component.html',
  styleUrls: ['./promotion.component.css'],

})

export class SinglePromotionComponent implements OnInit {
  //fetchedPromotion = new Promotion()
  //fetchedPromotion: Promotion;
  //fetchedPromotion._id='';

  fetchedPromotion: Promotion = new Promotion();

  public myForm: FormGroup;

  constructor(
    private promotionService: PromotionService,
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
        name: ['', [Validators.required, Validators.minLength(5)]],
        date: this._fb.group({
            dateBegin: ['', [Validators.required, Validators.minLength(5)]],
            dateEnd: ['', [Validators.required, Validators.minLength(5)]],
        }),
        form: this._fb.array([])
    });


    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
        this.getPromotion(params['id'])
    })
  }


  removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['addresses'];
      control.removeAt(i);
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    const addrCtrl = this._fb.group({
        street: ['', Validators.required],
        postcode: ['']
    });
    control.push(addrCtrl);
  }



  goBack() {
    this.location.back();
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedPromotion.form[0] = result
      }
    })
  }


  save() {
    if(!this.fetchedPromotion.form.length){
      this.toastr.error('Need a picture')
      return
    }

    if(this.fetchedPromotion._id) {
      this.promotionService.updatePromotion(this.fetchedPromotion)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['promotion/'])
          },
          error => {console.log(error)}
        )
    } else {
      this.promotionService.savePromotion(this.fetchedPromotion)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['promotion/'])
          },
          error => {console.log(error)}
        );
    }
  }

  openDialogDelete(){
    let dialogRefDelete = this.dialog.open(PromotionDeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedPromotion._id)
        this.router.navigate(['promotion']);
      }
    })
  }


  getPromotion(id: string) {

    this.promotionService.getPromotion(id)
      .subscribe(
        res => {
          this.fetchedPromotion = res
          this.fetchedPromotion.date.dateBegin = new Date(this.fetchedPromotion.date.dateBegin).toISOString().substr(0,10)
          this.fetchedPromotion.date.dateEnd = new Date(this.fetchedPromotion.date.dateEnd).toISOString().substr(0,10)
        },
        error => {
          console.log(error);
        }
      )
  }



  onDelete(id: string) {
    this.promotionService.deletePromotion(id)
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


// @Component({
//   selector: 'promotion-dialog',
//   templateUrl: './promotionDialog.component.html',
// })
// export class PromotionDialogComponent {
//   constructor(public dialogRef: MdDialogRef<PromotionDialogComponent>) {}
//
// }
