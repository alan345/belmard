import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { NavbarComponent} from './navbar.component';
import {SharedModule } from '../../shared/shared.module';

@NgModule({
  imports:      [
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //  FormsModule,
    // MaterialModule,
    // Ng2PaginationModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    NavbarComponent,
    // ProductsComponent,
    // ProductSingleComponent,
  ],
  exports:      [
    NavbarComponent
    // ProductsComponent
  ],
  providers:    [
    // ProductService
  ],
  entryComponents: [ ]
})
export class NavbarModule { }
