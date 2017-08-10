import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { ProjectService} from '../project.service';
import { Project} from '../project.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../project.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProjectsComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  // token: string = localStorage.getItem('id_token');
  fetchedProjects: Project[] = [];
  search: any = {
    categories : [],
    search: ''
  };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    // public dialog: MdDialog,
    // private router: Router,
    // private location: Location,
    // private authService: AuthService,
    // private userService: UserService,

  ) {
  }

  ngOnInit() {
    let this2 = this
    setTimeout(function(){
      this2.search.userId = this2.userId
      this2.search.orderBy = 'name'
      this2.getProjects(1, this2.search)
    }, 200);
  }
  // goBack() {
  //   this.location.back();
  // }

  searchProjects() {
    this.getProjects(1, this.search)
  }

  onDelete(id: string) {
    this.projectService.deleteProject(id)
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

  getPage(page: number) {
    this.getProjects(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getProjects(this.paginationData.currentPage, this.search)
  }


  getProjects(page : number, search: any) {
    //this.fetchedProjects =[]
    this.loading = true;
    this.projectService.getProjects(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedProjects = res.data

          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }



  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
