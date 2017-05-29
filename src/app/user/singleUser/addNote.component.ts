import { Component, OnInit} from '@angular/core';

import { UserService} from '../user.service';

import { ToastsManager} from 'ng2-toastr';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { User } from '../user.model'
import { Form } from '../../form/form.model'

import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './addNote.component.html',
  styleUrls: ['../user.component.css'],

})

export class AddNoteComponent implements OnInit {
  //fetchedUser = new User()
  //fetchedUser : User;
  fetchedUser : any = {
    notes : []
  }
  newTextNote = ''

  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
//    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit() {
    this.myForm = this._fb.group({
        newTextNote: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
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



  goBack() {
    this.location.back();
  }




  save(model: FormGroup, isValid: boolean) {
    this.fetchedUser.notes.unshift({
      text : model.value.newTextNote,
      dateNote: Date.now()
    })
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => {console.log(error)}
      )
    this.goBack()
    }






}
