import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../../auth/auth.service';
import { ProjectService} from '../../project.service';
import { Project} from '../../project.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../../user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './tasks.component.html',
  styleUrls: ['../task.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TasksComponent implements OnInit {
  @Input() userId = '';
  @Input() showHeader = true;
  token: string = localStorage.getItem('id_token');
  fetchedProjects: Project[] = [];
  search: any = {
    idProject : '',
    search: '',
    myTasks: false
  };
  loading: boolean;
  searchProjects: Project[] = []
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['idProject']) {this.search.idProject = params['idProject']}
      this.getTasksInit()
    })

  }
  goBack() {
    this.location.back();
  }

  getTasksInit() {
    console.log('aaaa')
    this.getTasks(1, this.search)
  }
  selectProject(project: Project) {
    // this.searchProject = project
    this.search.idProject = project._id
    this.getTasksInit()
  }
  clearAutocomplete(){
    this.search.idProject = ''
    this.getTasksInit()
  }



  // searchProjects() {
  //   this.getTasks(1, this.search)
  // }

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
    this.getTasks(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getTasks(this.paginationData.currentPage, this.search)
  }


  getTasks(page : number, search: any) {
    // console.log(search)
    //this.fetchedProjects =[]
    this.loading = true;
    this.projectService.getTasks(page, search)
      .subscribe(
        res => {
          this.fetchedProjects = res.item
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }
}
