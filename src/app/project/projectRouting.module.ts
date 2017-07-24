import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectSingleComponent} from './projectSingle/projectSingle.component';
import { ProjectTasksComponent} from './task/singleTask/projectTasks.component';

import { TasksComponent} from './task/tasks/tasks.component';


export const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'tasks', component: TasksComponent},
  // {path: 'projectSingle', component: ProjectSingleComponent},
  // {path: 'projectSingle/:id', component: ProjectSingleComponent},
  {path: 'new', component: ProjectSingleComponent},
  {path: 'new/:idClient', component: ProjectSingleComponent},
  {path: ':id', component: ProjectSingleComponent},
  {path: 'tasks/:id', component: ProjectTasksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRouting {}
