import { Component, OnInit} from '@angular/core';
import { TaskService} from '../task.service';
import { ToastsManager} from 'ng2-toastr';
//import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Task, BucketTasks, TaskDetail } from '../task.model';
// import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
//import { FormGroup} from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
// import { UserService} from '../user/user.service';
// import { QuoteService} from '../quote/quote.service';

// import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { DragulaService } from 'ng2-dragula';
import { User } from '../../user/user.model';
import { Project } from '../../project/project.model';



@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['../task.component.css'],

})

export class TaskComponent implements OnInit {


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
  fetchedTask: Task = new Task();

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
    private taskService: TaskService,
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
      taskDetails: []
    }
    this.fetchedTask.bucketTasks.push(bucketTaskObj)
    this.save()
  }


  deleteBucketTask(bucketTaskIndex) {
    this.fetchedTask.bucketTasks.splice(bucketTaskIndex, 1)
    this.save()
  }

  deleteTask(bucketTaskIndex, taskIndex) {
    this.fetchedTask.bucketTasks[bucketTaskIndex].taskDetails.splice(taskIndex, 1)
    this.save()
  }
  addTask(content, bucketTaskIndex) {
    this.fetchedTask.bucketTasks[bucketTaskIndex].openNewTask = false
    let newTask = new TaskDetail()
    newTask.name = content
    this.fetchedTask.bucketTasks[bucketTaskIndex].taskDetails.push(newTask)
    this.save()
  }
  newTask(index) {
    this.fetchedTask.bucketTasks[index].openNewTask = true
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
  }


  selectAssignedTo(event, bucketTaskIndex, taskIndex) {
    this.fetchedTask.bucketTasks[bucketTaskIndex].taskDetails[taskIndex].assignedTos = event
    this.save()
  }


  onClick(bucketTaskIndex, taskIndex) {
    this.fetchedTask.bucketTasks.forEach((bucketTask, i) => {
      bucketTask.taskDetails.forEach((task, j) => {
        this.fetchedTask.bucketTasks[i].taskDetails[j].editMode = false
      })
    }
    )
    this.fetchedTask.bucketTasks[bucketTaskIndex].taskDetails[taskIndex].editMode = true

  }


  selectProject(project: Project) {
    this.fetchedTask.projects = [project]
  }

  getTask(id: string) {
    this.taskService.getTask(id)
      .subscribe(
      res => {
        this.fetchedTask = <Task>res

        // this.fetchedTask.bucketTasks.forEach((bucketTask,i) => {
        //   this.fetchedTask.bucketTasks[i].openNewTask= false
        // })



        //this.fetchedTask.bucketTasks = this.bucketTasks
        // console.log(content, index)
        // this.fetchedTask.bucketTasks[index].tasks.push({name:content})
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
        this.getTask(params['id'])

    })
  }




  goBack() {
    this.location.back();
  }

  getResultAutocomplete(event) {
    console.log(event)
  }


  save() {
    if (this.fetchedTask._id) {
      this.taskService.updateTask(this.fetchedTask)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //this.router.navigate(['task/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    } else {

      this.taskService.saveTask(this.fetchedTask)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //  this.router.navigate(['task/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    }
  }



}
