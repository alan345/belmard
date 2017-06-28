import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

// import { CompanieDetailUsersComponent} from './companieDetailUsers.component';
// import { AddUserByCompanieComponent} from './addUser/addUserByCompanie.component';
import { CompaniesComponent} from './companies/companies.component';
import { EditCompanieComponent} from './editCompanie.component';
// import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { CompanieDetailComponent} from './companieDetail.component';
import { CompanieService} from './companie.service';
import { CompanieRouting} from './companieRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  imports:      [

    CompanieRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    // CompanieDetailUsersComponent,
    CompaniesComponent,
    EditCompanieComponent,
    // EditAddUserToCompanieComponent,
    CompanieDetailComponent,
    // AddUserByCompanieComponent,
  ],
  exports:      [ ],
  providers:    [ CompanieService ],
  entryComponents: [ ]
})
export class CompanieModule { }
