import { Component, OnInit} from '@angular/core';
import { ProjectService} from '../../project.service';
import { ToastsManager} from 'ng2-toastr';
//import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, BucketTasks, Task } from '../../project.model';
// import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
//import { FormGroup} from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
// import { UserService} from '../user/user.service';
// import { QuoteService} from '../quote/quote.service';

// import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { DragulaService } from 'ng2-dragula';
import { User } from '../../../user/user.model';
import { AuthService} from '../../../auth/auth.service';



@Component({
  selector: 'app-projects',
  templateUrl: './projectTasks.component.html',
  styleUrls: ['../task.component.css'],

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


  statusTypes = [
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' }
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
    private authService: AuthService,
  ) {
    // dragulaService.setOptions('nested-bag', {
    //   moves: function (el:any, container:any, handle:any):any {
    //     return handle.className === 'move';
    //   }
    // });

    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  newBucketTaskF(newBucketTask) {
    let bucketTaskObj: BucketTasks = new BucketTasks()
    bucketTaskObj.bucketName = newBucketTask,
    bucketTaskObj.openNewTask = false,
    bucketTaskObj.tasks = []

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
    let newTask = new Task()
    newTask.dateTask.creationDateString = this.authService.isoDateToHtmlDate(newTask.dateTask.creationDate)
    newTask.dateTask.endDateString = this.authService.isoDateToHtmlDate(newTask.dateTask.endDate)



    newTask.name = content
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.push(newTask)
    // this.save()
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
        this.fetchedProject.bucketTasks.forEach((bucketTask, bucketTaskIndex) => {
          bucketTask.tasks.forEach((task, taskIndex) => {

            this.fetchedProject.bucketTasks[bucketTaskIndex]
            .tasks[taskIndex].dateTask
            .creationDateString = this.authService
            .isoDateToHtmlDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.creationDate)

            this.fetchedProject.bucketTasks[bucketTaskIndex]
            .tasks[taskIndex].dateTask
            .endDateString = this.authService
            .isoDateToHtmlDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.endDate)

          })
        });
        // this.fetchedProject.detail.dateQuote.issueDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.issueDate)
        // this.fetchedQuote.detail.dateQuote.expiryDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.expiryDate)


        // creationDate: Date = new Date()
        // creationDateString: string = '';
        // endDate: Date = new Date()
        // endDateString: string = '';

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
    let nbTasks = 0
    let nbTasksCompleted = 0

    this.fetchedProject.bucketTasks.forEach((bucketTask, bucketTaskIndex) => {
      nbTasks += bucketTask.tasks.length
      bucketTask.tasks.forEach((task, taskIndex) => {
        if(task.status === 'done')
          nbTasksCompleted++

        this.fetchedProject.bucketTasks[bucketTaskIndex]
        .tasks[taskIndex].dateTask
        .creationDate = this.authService
        .HTMLDatetoIsoDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.creationDateString)

        this.fetchedProject.bucketTasks[bucketTaskIndex]
        .tasks[taskIndex].dateTask
        .endDate = this.authService
        .HTMLDatetoIsoDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.endDateString)

      })
    });


    this.fetchedProject.progressTasks =  nbTasksCompleted / nbTasks


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
