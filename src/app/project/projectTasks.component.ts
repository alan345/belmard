import { Component, OnInit} from '@angular/core';
import { ProjectService} from './project.service';
import { ToastsManager} from 'ng2-toastr';
//import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, BucketTasks } from './project.model';
// import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
//import { FormGroup} from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
// import { UserService} from '../user/user.service';
// import { QuoteService} from '../quote/quote.service';

// import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { DragulaService } from 'ng2-dragula';
import { User } from '../user/user.model';


@Component({
  selector: 'app-projects',
  templateUrl: './projectTasks.component.html',
  styleUrls: ['./project.component.css'],

})

export class ProjectTasksComponent implements OnInit {


  public bucketTasks: Array<any> = [
    {
      bucketName: 'Group A',
      openNewTask: false,
      tasks: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
    },
    {
      bucketName: 'Group B',
      openNewTask: false,
      tasks: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
    }
  ];
  fetchedProject: Project = new Project();

  public many = [

    {
      bucketName: 'Group A',
      tasks: ['The', 'possibilities', 'are', 'endless!']
    },

    {
      bucketName: 'Group B',
      tasks: ['The', 'toto', 'tata', 'titi!']
    },

  ]

  public many2: Array<string> = ['Explore', 'them'];

  constructor(
    //  private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    //    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private dragulaService: DragulaService,
    //    private _fb: FormBuilder,
    //    private userService: UserService,
    //    private quoteService: QuoteService,
  ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  newBucketTask(newBucketTask) {
    let bucketTaskObj: BucketTasks = {
      bucketName: newBucketTask,
      openNewTask: false,
      tasks: []
    }
    this.fetchedProject.bucketTasks.push(bucketTaskObj)
    this.save()
  }


  deleteBucketTask(bucketTaskIndex) {
    this.fetchedProject.bucketTasks.splice(bucketTaskIndex, 1)
    this.save()
  }

  deleteTask(bucketTaskIndex, taskIndex) {
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.splice(taskIndex, 1)
    this.save()
  }
  addTask(content, bucketTaskIndex) {
    this.fetchedProject.bucketTasks[bucketTaskIndex].openNewTask = false
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.push({ name: content, editMode: false, assignedTos: [] })
    this.save()
  }
  newTask(index) {
    this.fetchedProject.bucketTasks[index].openNewTask = true
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
  }


  selectAssignedTo(event, bucketTaskIndex, taskIndex) {
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].assignedTos = event
    this.save()
  }


  onClick(bucketTaskIndex, taskIndex) {
    this.fetchedProject.bucketTasks.forEach((bucketTask, i) => {
      bucketTask.tasks.forEach((task, j) => {
        this.fetchedProject.bucketTasks[i].tasks[j].editMode = false
      })
    }
    )
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].editMode = true

  }




  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
      res => {
        this.fetchedProject = <Project>res

        // this.fetchedProject.bucketTasks.forEach((bucketTask,i) => {
        //   this.fetchedProject.bucketTasks[i].openNewTask= false
        // })



        //this.fetchedProject.bucketTasks = this.bucketTasks
        // console.log(content, index)
        // this.fetchedProject.bucketTasks[index].tasks.push({name:content})
        //this.save()


      },
      error => {
        console.log(error);
      }
      )
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id'])
        this.getProject(params['id'])

    })
  }




  goBack() {
    this.location.back();
  }

  getResultAutocomplete(event) {
    console.log(event)
  }


  save() {
    if (this.fetchedProject._id) {
      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //this.router.navigate(['project/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    } else {

      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //  this.router.navigate(['project/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    }
  }



}
