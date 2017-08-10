import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { TranslateService } from '../../translate/translate.service';
import { UserDialogComponent } from '../../user/singleUser/dialog/userDialog.component';
import { CompanieDialogComponent } from '../../companie/singleCompanie/dialog/companieDialog.component';
import { ProjectDialogComponent } from '../../project/single/dialog/projectDialog.component';
import { PaiementQuoteDialogComponent } from '../../paiementQuote/single/dialog/paiementQuoteDialog.component';


import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-newObjDialog',
  templateUrl: './newObjDialog.component.html',
  styleUrls: ['./newObjDialog.component.css']
})
export class newObjDialogComponent implements OnInit {

  @Input() search: any;
  @Input() typeObj: String = '';
  @Input() title: String = '';
  @Input() icone: String = 'fa fa-plus';
  @Output() saved: EventEmitter<any> = new EventEmitter();
  // @Input() option: String = '';
  // @Input() showBackButton: Boolean = true;
  // @Input() openInDialog: Boolean = false;
  //
  // @Input() showCreateButton: Boolean = true;
  // @Input() idProject: string= '';
  // @Input() idClient: string= '';


  //
  //
  // nameObjectPlur: String= ''
  // nameObjectSing: String= ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
    public mdDialog: MdDialog,
  ) {}


  ngOnInit() {
  }
  openDialog(typeObj: string) {
    let dialogComp: any
    if(typeObj == 'user')
      dialogComp = UserDialogComponent

    if(typeObj == 'companie')
      dialogComp = CompanieDialogComponent

    if(typeObj == 'project')
      dialogComp = ProjectDialogComponent

    if(typeObj == 'paiementQuote')
      dialogComp = PaiementQuoteDialogComponent



    let dialogRef = this.mdDialog.open(dialogComp, {
      height: '500px',
      data: {
        search: this.search
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      this.saved.emit(result)


      // if(result) {
      //   console.log(result)
      //   this.fetchedProject.forms.push( result)
      // }
    })
  }

}
