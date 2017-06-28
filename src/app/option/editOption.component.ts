import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {OptionService} from './option.service';
import {ProductService} from '../product/product.service';
import { ProjectService} from '../project/project.service';

import {Option } from './option.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../user/user.service';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Project } from '../project/project.model';





@Component({
  selector: 'app-option',
  templateUrl: './editOption.component.html',
  styleUrls: ['./option.component.css'],
})
export class EditOptionComponent implements OnInit {
  fetchedOption : Option = new Option()
  // autocompleteUser: string = '';
  // autocompleteProject: string = '';
  // fetchedProducts: Product[] = []
  // fetchedProjects: Project[] = []
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  //
  // autocompleteProduct: String = ''
  // fetchedUsers: User[] = [];
  myForm: FormGroup;

  constructor(
    private optionService: OptionService,
  //  private projectService: ProjectService,
    private projectService: ProjectService,
    private userService: UserService,
    private productService: ProductService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,




  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      calendar: this._fb.group({
        timeBegin: [''],
      }),
    })


    this.getOption()
  }





    // getUser(id: string) {
    //   this.userService.getUser(id)
    //     .subscribe(
    //       res => {
    //         this.selectUser(res.user)
    //       },
    //       error => { console.log(error) }
    //     );
    // }




  save() {

    if(this.fetchedOption._id) {
      this.optionService.updateOption(this.fetchedOption)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['option/edit/' + this.fetchedOption._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.optionService.saveOption(this.fetchedOption)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
              //this.router.navigate(['option/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }


  goBack() {
    this.location.back();
  }


  getOption() {
    this.optionService.getOption()
      .subscribe(
        res => {
          this.fetchedOption = res
        },
        error => {
          console.log(error);
        }
      )
  }


}
