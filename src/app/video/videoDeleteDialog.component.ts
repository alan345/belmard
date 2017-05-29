import { Component } from '@angular/core';
import { MdDialogRef} from '@angular/material';


@Component({
  selector: 'videoDeleteDialog',
  templateUrl: './videoDeleteDialog.component.html',
})
export class VideoDeleteDialog {
  constructor(public dialogRefDelete: MdDialogRef<VideoDeleteDialog>) {}

  // deleteVideo(){
  //   console.log("delete")
  // }
}
