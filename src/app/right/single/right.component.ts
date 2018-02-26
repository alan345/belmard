import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {RightService} from '../right.service';
import {UserService} from '../../user/user.service';
import {Right, Permission, Access} from '../right.model';
import {ToastsManager} from 'ng2-toastr';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

// import {MatDialog } from '@angular/material';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
// import { User } from '../../user/user.model';

// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-editRight',
  templateUrl: './right.component.html',
  styleUrls: ['../right.component.css'],
})
export class RightComponent implements OnInit {
  fetchedRight: Right = new Right();
  myForm: FormGroup;
  seeRights = false;
  // seeCategProject = false;
  // seeCategProduct = false;
  typesRights: Permission[] = [];
  loading = false;

  constructor(
    private rightService: RightService,
    private toastr: ToastsManager,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.getRightsToUse().forEach(right => {
      // this.typesRights = [...right.detailRight.permissions]
      this.typesRights = right.detailRight.permissions
      // console.log(this.typesRights)
    })
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      categJson: this._fb.group({
        categProduct: [''],
        categProject: ['']
      }),
      option: this._fb.group({
        calendar: this._fb.group({
          timeBegin: ['', [Validators.required, Validators.minLength(1)]],
          timeEnd: ['', [Validators.required, Validators.minLength(1)]],
        }),
      }),
      address: this._fb.group({
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      _users: this._fb.array([])
    })

    // this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getRight('')
        } else {
          this.getRight(params['id'])
        }
      }
    })
  }
  clearAllRights() {
    this.fetchedRight.detailRight.permissions = [];
  }
  setAllRights() {
    this.fetchedRight.detailRight.permissions = [...this.typesRights];
    // this.fetchedRight.detailRight.permissions = []
    // console.log(this.typesRights)
    // console.log(this.authService.getRightsToUse())

    // this.typesRights.forEach(typesRight => {
    //   let newPermission = new Permission()
    //   newPermission.namePermission = typesRight.value
    //   typesRight.typeAccess.forEach(typeAccessSingle => {
    //     let newAccess = new Access()
    //     newAccess.typeAccess = typeAccessSingle.value
    //     newPermission.access.push(newAccess)
    //   })
    //   this.fetchedRight.detailRight.permissions.push(newPermission)
    // })
    //
    // console.log(this.fetchedRight.detailRight.permissions)
  }
  removeRight(level, index1, index2, index3) {
    // console.log(level)
    // console.log(this.authService.getRightsToUse())
      if(level === 2) {
        this.fetchedRight.detailRight.permissions.splice(index2, 1)
      }
      if(level === 3) {
        this.fetchedRight.detailRight.permissions[index2].access.splice(index3, 1)
      }
        // console.log(this.authService.getRightsToUse())
      // if(level === 3)
        // this.fetchedRight.detailRight[index1].permissions[index1].access.splice(index2, 1)
      // if(level === 3)
      //   this.fetchedCompanie.rights[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  }
  addRight(level, index1, index2, index3) {

      if(level === 1) {
        // let newRight =
        this.fetchedRight.detailRight.permissions.unshift(new Permission())
      }
      if(level === 2) {
        // let newRight = new Access()
        this.fetchedRight.detailRight.permissions[index2].access.unshift(new Access())
      }
  }

  openSection(nameSection){
    this[nameSection] = !this[nameSection]
  }

  // removeRight(level, index1, index2, index3) {
  //     if(level === 0)
  //       this.fetchedRight.rights.splice(level, 1)
  //     if(level === 1)
  //       this.fetchedRight.rights.splice(index1, 1)
  //     if(level === 2)
  //       this.fetchedRight.rights[index1].permissions.splice(index1, 1)
  //     if(level === 3)
  //       this.fetchedRight.rights[index1].permissions[index1].access.splice(index2, 1)
  //     // if(level === 3)
  //     //   this.fetchedRight.rights[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  // }



  // fetchedCurrentUser: User = new User()
  // getCurrentUser() {
  //   this.userService.getUser('')
  //     .subscribe(
  //       res => { this.fetchedCurrentUser = res },
  //       error => { console.log(error) }
  //     )
  // }








  save() {
    this.loading = true;

    //this.fetchedRight.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedRight.categJson.categProduct))
    if(this.fetchedRight._id) {
      this.rightService.updateRight(this.fetchedRight)
        .subscribe(
          res => {
            this.authService.successNotif(res.message);
            this.loading = false;
          //  this.router.navigate(['right/' + this.fetchedRight._id])
          },
          error => {
            this.loading = false;
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.rightService.saveRight(this.fetchedRight)
        .subscribe(
          res => {
            this.loading = false;
            this.authService.successNotif(res.message)
            this.fetchedRight = res.obj
            //  this.router.navigate(['right/' + res.obj._id])
          },
          error => {
            this.loading = false;
            console.log(error)
          }
        )
    }
  }

//
// saveToMyRight(){
//   this.rightService.saveRight(this.fetchedRight)
//     .subscribe(
//       res => {
//         this.userService.addRightToMyself(res.obj)
//           .subscribe(
//             res => {
//               // this.userService.cleanCurrentUserInSession()
//               location.reload();
//               this.authService.successNotif(res.message)
//             },
//             error => {console.log(error)}
//           )
//         this.authService.successNotif(res.message)
//       },
//       error => {console.log(error)}
//     )
// }
  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


  onDelete(id: string) {
    this.rightService.deleteRight(id)
      .subscribe(
        res => {
          this.authService.successNotif(res.message);
          this.router.navigate(['right/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }
  //
  // goBack() {
  //   this.location.back();
  // }



  getRight(id: string) {
    this.loading = true;
    this.rightService.getRight(id, {})
      .subscribe(
        res => {
          this.loading = false;
          this.fetchedRight = res
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      )
  }
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }


}
