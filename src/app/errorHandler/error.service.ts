import {Injectable, EventEmitter} from '@angular/core';
// import {Error} from './error';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '../translate/translate.service';


@Injectable()

export class ErrorService {

  // errorOccured = new EventEmitter<Error>();

  constructor(
    private translateService: TranslateService,
    private toastr: ToastsManager) {
  }

  handleError(error: any) {
    // const errorData = new Error(error.error.message);
    // this.errorOccured.emit(errorData);
    this.toastr.error(this.translateService.instant(error.error.message))
  }
}
