import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VideoDeleteDialog} from './videoDeleteDialog.component';
import { VideoWhereDialogComponent} from './videoWhereDialog.component';
import { VideoComponent} from './video.component';
import { VideosComponent} from './videos.component';
import { VideoSingleComponent} from './videoSingle.component';
import { VideoService} from './video.service';
import { VideoRouting} from './videoRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  imports:      [
    VideoRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
  ],
  declarations: [
    VideoDeleteDialog,
    VideoWhereDialogComponent,
    VideoComponent,
    VideosComponent,
    VideoSingleComponent,
  ],
  exports:      [ VideosComponent ],
  providers:    [ VideoService ],
  entryComponents: [
    VideoDeleteDialog,
    VideoWhereDialogComponent,
  ]
})
export class VideoModule { }
