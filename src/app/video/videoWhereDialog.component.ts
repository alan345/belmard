import { Component } from '@angular/core';

import { MdDialogRef} from '@angular/material';

@Component({
  selector: 'videoDeleteDialog',
  templateUrl: './videoWhereDialog.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoWhereDialogComponent {
  constructor(public dialogRefDelete: MdDialogRef<VideoWhereDialogComponent>) {}

  // deleteVideo(){
  //   console.log("delete")
  // }
}
