import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
// import { TranslateService } from '../../translate/translate.service';
import { UserDialogComponent } from '../../user/singleUser/dialog/userDialog.component';
// import { QuoteDialogComponent } from '../../quote/single/dialog/quoteDialog.component';
import { CompanieDialogComponent } from '../../companie/single/dialog/companieDialog.component';
// import { ProjectDialogComponent } from '../../project/single/dialog/projectDialog.component';
import { ProductDialogComponent } from '../../product/single/dialog/productDialog.component';
import {Search} from '../../shared/shared.model'


import { PaiementQuoteDialogComponent } from '../../paiementQuote/single/dialog/paiementQuoteDialog.component';


import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-new-obj-dialog',
  templateUrl: './newObjDialog.component.html',
  styleUrls: ['./newObjDialog.component.css']
})
export class newObjDialogComponent implements OnInit {

  @Input() search = new Search();
  @Input() typeObj = '';
  @Input() title = '';
  @Input() icon = '';
  @Input() labelButton = '';
  // @Input() showOnlyButton = '';

  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() cliked: EventEmitter<any> = new EventEmitter();


  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    // private translateService: TranslateService,
    public mdDialog: MatDialog,
  ) { }


  ngOnInit() { }
  ngOnChanges() { }

  openDialog(typeObj: string) {
    this.cliked.emit()
    // console.log(this.search)
    // if (typeObj === 'quote') {
    //   this.router.navigate(['/quote/new']);
    // } else
    if (typeObj === 'right') {
      this.router.navigate(['/right/new']);
    } else if (typeObj === 'quote') {
      this.saved.emit()
      if(!this.search.quoteId) {
        this.search.quoteId = ''
      }
      if(!this.search.assignedToId) {
        this.search.assignedToId = ''
      }
      this.router.navigate(['/quote/new', {quoteId: this.search.quoteId, userId: this.search.userId, assignedToId: this.search.assignedToId}])
// http://localhost/#/quote/new;orderBy=-createdAt;search=;quoteType=;quoteId=;userId=;paiementQuoteId=;endDate=Fri%20Dec%2022%202017%2019:02:01%20GMT-0800%20(PST);startDate=Fri%20Dec%2022%202017%2019:02:01%20GMT-0800%20(PST);projectId=;parentQuoteId=;isExternalUser=true;isExpense=false;typeQuote=quote;year=0;isFromAutocomplete=false;statusQuote=
    } else {

      let dialogComp: any
      if (typeObj == 'user')
        dialogComp = UserDialogComponent

      // if (typeObj == 'quote')
      //   dialogComp = QuoteDialogComponent

      if (typeObj == 'companie')
        dialogComp = CompanieDialogComponent

      // if (typeObj == 'project')
      //   dialogComp = ProjectDialogComponent

      if (typeObj == 'paiementQuote')
        dialogComp = PaiementQuoteDialogComponent

      if (typeObj == 'product')
        dialogComp = ProductDialogComponent


      const dialogRef = this.mdDialog.open(dialogComp, {
        data: {
          search: this.search
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.saved.emit(result)
      })
    }
  }
}
