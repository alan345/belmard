import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { ProjectService} from './project.service';
import { Project} from './project.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../user/user.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProjectsComponent implements OnInit {
  token: string = localStorage.getItem('id_token');
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

  categories1 = [{
      name: 'phyto',
      selected: false
    },
    {
      name: 'phytoSpecific',
      selected: false
    },
    {
      name: 'subtil',
      selected: false
    }];

  categories2 = '';


  categoriesHard2 = [
    { name:'Through your eyes', selected : false },
    { name:'How to', selected : false },
    { name:'Fashion', selected : false },
    { name:'Merchandising', selected : false },
    { name:'Behind the Scene & Testimonials', selected : false }
  ]

  trackinPage : any = {
    lastVisitPagePressCount:[],
    lastVisitPageProjectCount:[]
  }

  constructor(
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


  goBack() {
    this.location.back();
  }

  onSelectChange = ($event: any): void => {
//    console.log($event)
    this.categories2 = $event.tab.textLabel
    this.updateCategerories()
    // this.search.categories = []
    // this.search.categories.push({name:$event.tab.textLabel})
    // this.getProjects(this.paginationData.currentPage, this.search)

  }

  updateCategerories(){
    this.search.categories = []
    this.search.categories.push({name:this.categories2})
    // if(this.inputSearch)
    //   this.search.categories.push({name:this.inputSearch})
    this.categories1.forEach((categorie1)=>{
      if(categorie1.selected == true) {
        this.search.categories.push({name : categorie1.name})
      }
    })
//    console.log(this.search.categories)
    this.fetchedProjects = []
    this.getProjects(1, this.search)
  }

  changeCateg1(nameCateg: string){
    //this.categories1[nameCateg] = !this.categories1[nameCateg]
    this.categories1.forEach((categ, index)=>{
      if(categ.name === nameCateg) {
        this.categories1[index].selected = !this.categories1[index].selected
      }
    })
    this.updateCategerories()
  }

  addSearchInput(){
//    console.log(this.search.categories)
    this.updateCategerories()
    // this.search.categories.pop()
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

  // getPage(page: number) {
  //   this.getProjects(page, this.search);
  // }


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
          let fetchedProjectsNotSecure =  res.data
          fetchedProjectsNotSecure.forEach((project: Project) => {
            //isNewProject = false
            //project['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + project['embed'])
            //project['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/project/' + project['embed'] )



            project['isNewProject'] = false
            this.trackinPage.lastVisitPageProjectCount.forEach((projectNotRead: Project) => {
                if(projectNotRead._id == project._id)
                  project['isNewProject'] = true
            })
            this.fetchedProjects.push(project)
          })
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    let userId = this.authService.currentUser.userId
    this.projectService.countNewItemForUser()
    .subscribe(
      data => {
        this.trackinPage.lastVisitPageProjectCount = data.item
        this.userService.getUser(userId)
        .subscribe(
        res => {
          res.user.trackinPage.lastVisitPageProject = new Date()
          this.userService.updateUser(res.user)
            .subscribe(
              res => {},
              error => {
                console.log(error);
              }
            )
        },
        error => {
          console.log(error);
        }
        )

      },
      error => console.log(error)
    )
    this.categories2 = 'what\'s new'
    this.updateCategerories()
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
