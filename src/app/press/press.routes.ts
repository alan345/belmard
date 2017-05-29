import {Routes} from '@angular/router';

import {PressesComponent} from './presses.component';
import {PressSingleComponent} from './pressSingle.component';




export const USER_PRESSES: Routes = [
  {path: '', component: PressesComponent},
  {path: 'pressSingle', component: PressSingleComponent},
  {path: 'pressSingle/:id', component: PressSingleComponent},
  {path: ':id', component: PressSingleComponent},
];
