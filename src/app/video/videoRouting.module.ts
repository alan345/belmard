import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { VideosComponent} from './videos.component';
import { VideoSingleComponent} from './videoSingle.component';


export const routes: Routes = [
  {path: '', component: VideosComponent},
  {path: 'videoSingle', component: VideoSingleComponent},
  {path: 'videoSingle/:id', component: VideoSingleComponent},
  {path: ':id', component: VideoSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRouting {}
