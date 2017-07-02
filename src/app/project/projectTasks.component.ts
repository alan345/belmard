import { Component, OnInit} from '@angular/core';
import { ProjectService} from './project.service';
import { ToastsManager} from 'ng2-toastr';
//import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from './project.model';
// import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
//import { FormGroup} from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
// import { UserService} from '../user/user.service';
// import { QuoteService} from '../quote/quote.service';

// import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';



@Component({
  selector: 'app-projects',
  templateUrl: './projectTasks.component.html',
  styleUrls: ['./project.component.css'],

})

export class ProjectTasksComponent implements OnInit {



  listBoxers: Array<string> = ['Sugar Ray Robinson', 'Muhammad Ali', 'George Foreman', 'Joe Frazier', 'Jake LaMotta', 'Joe Louis', 'Jack Dempsey', 'Rocky Marciano', 'Mike Tyson', 'Oscar De La Hoya'];
  listTeamOne: Array<string> = ['aaa'];
  listTeamTwo: Array<string> = [];



  fetchedProject: Project = new Project();



  constructor(
  //  private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
//    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
//    private _fb: FormBuilder,
//    private userService: UserService,
//    private quoteService: QuoteService,
  ) {
  }




    getProject(id : string) {
      this.projectService.getProject(id)
        .subscribe(
          res => {
            this.fetchedProject = <Project>res
          },
          error => {
            console.log(error);
          }
        )
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProject(params['id'])

    })
  }




  goBack() {
    this.location.back();
  }




  save() {


    if(this.fetchedProject._id) {


      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['project/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {

      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['project/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    }
  }



}
