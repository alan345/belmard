import { Component, OnInit} from '@angular/core';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { SubmitPicDialog } from './submitPicDialog.component';


@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./social.component.css'],

})
export class SocialsComponent implements OnInit {



  constructor(
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {}

  openDialog() {
    let dialogRef = this.dialog.open(SubmitPicDialog)
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {

  }
}
