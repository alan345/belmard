import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

import { MaterialModule } from '@angular/material';

import { NavbarComponent} from './navbar.component';
import {SharedModule } from '../../shared/shared.module';
import { NotificationService} from '../../notification/notification.service';
import {NotificationModule} from '../../notification/notification.module';

@NgModule({
  imports:      [
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NotificationModule,
    //  FormsModule,
    // MaterialModule,
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
    NotificationService,
    // ProductService
  ],
  entryComponents: [ ]
})
export class NavbarModule { }
