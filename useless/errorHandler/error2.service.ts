import {Injectable, EventEmitter} from '@angular/core';
import {Error} from './error';
import { ToastsManager } from 'ng2-toastr';

@Injectable()

export class Error2Service {

  errorOccured = new EventEmitter<Error>();

  constructor(private toastr: ToastsManager) {
  }

  handleError(error: any) {
    const errorData = new Error(error.error.message);
    this.errorOccured.emit(errorData);
    this.toastr.error(error.error.message)
  }
}
