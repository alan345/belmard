import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { CompanieService} from './companie.service';
import { Companie } from './companie.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService} from '../admin/services/admin.service';


@Component({
  selector: 'app-companie',
  templateUrl: './companieDetailUsers.component.html',
  styleUrls: ['./companie.component.css'],
})
export class CompanieDetailUsersComponent implements OnInit {
  maxPictureToShow = 3
//  users : User[] = []
  fetchedCompanies: Companie[]= []
  search = {
    orderBy : '-client',
    search: '',
    parentUser: '',
    role: '',
    onlyMyUsers: true,
  }
  companieIdToSelect = ''
  fetchedCompanie : Companie = new Companie();
  public myForm: FormGroup;



  constructor(
    private companieService: CompanieService,
    private adminService: AdminService,
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
      this.myForm = this._fb.group({
        forms: this._fb.array([])
      })
      if(params['id'])
        this.getCompanie(params['id'])
    })

    //let userId = this.authService.currentUser.userId
    //this.companieService.getCompanieByUserId(userId)
    this.companieService.getCompanieForCurrentUser()
    .subscribe(
      (data => {
        this.fetchedCompanies = data
      })
    )

  }
  goBack() {
    this.location.back();
  }
  onChangeCompanie(event: any){
    this.router.navigate(['companie/' + event + "/users"]);
  }


  searchInput(){
  }


  orderBy(orderBy:string) {
    this.search.orderBy = orderBy
    //this.getCompanie(this.fetchedCompanie._id)
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


  getCompanie(id : string) {
    this.companieService.getCompanie(id, this.search)
      .subscribe(
        res => {
          this.fetchedCompanie = res
          this.companieIdToSelect = this.fetchedCompanie._id
          // this.fetchedCompanie._users.forEach((user) => {
          //   if(user.role[0] === 'salesRep')
          //     this.users.push(user)
          // })

          // this.fetchedCompanie.forms.forEach((form: Form) => {
          //   this.addForm(form)
          // })
        },
        error => {
          console.log(error);
        }
      );
  }

  showColumnStylist(){
    if(this.isAdmin() || this.isSalesRep() || this.isManager())
      return true
    return false
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
}
