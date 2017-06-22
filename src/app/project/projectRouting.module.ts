import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectSingleComponent} from './projectSingle.component';


export const routes: Routes = [
  {path: '', component: ProjectsComponent},
  // {path: 'projectSingle', component: ProjectSingleComponent},
  // {path: 'projectSingle/:id', component: ProjectSingleComponent},
  {path: 'new', component: ProjectSingleComponent},
  {path: 'new/:idClient', component: ProjectSingleComponent},
  {path: ':id', component: ProjectSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRouting {}
