import { Component, OnInit} from '@angular/core';
import { CompanieService} from './companie.service';
import { Companie } from './companie.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location} from '@angular/common';
import { Form } from '../form/form.model';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';


@Component({
  selector: 'app-companie',
  templateUrl: './companiePictures.component.html',
  styleUrls: ['./companie.component.css'],
})

export class CompaniePicturesComponent implements OnInit {
  maxPictureToShow = 3
  fetchedCompanie: Companie = new Companie();

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
  ) {

  }

  ngOnInit() {
    this.myForm = this._fb.group({
      forms: this._fb.array([])
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getCompanie(params['id'])
    })
  }
  goBack() {
    this.location.back();
  }

  removeForm(i: number) {
      this.fetchedCompanie.forms.splice(i, 1)
      const control = <FormArray>this.myForm.controls['forms'];
      control.removeAt(i)
      this.save()
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
    this.router.navigate(['companie/' + this.fetchedCompanie._id + "/companiePictures"]);
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
        this.addForm(result)
        this.fetchedCompanie.forms.push(result)
        this.save()
      }
    })
  }

  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
          this.fetchedCompanie.forms.forEach((form: Form) => {
            this.addForm(form)
          })
        },
        error => {
          console.log(error);
        }
      );
  }
}
