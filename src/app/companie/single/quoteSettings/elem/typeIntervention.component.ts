import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Companie} from '../../../companie.model';

@Component({
  selector: 'app-quote-type-intervention',
  templateUrl: './typeIntervention.component.html',
  styleUrls: ['../../../companie.component.css'],
})

export class TypeInterventionComponent {
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() fetchedCompanie: Companie = new Companie()
  valueToAdd = '';
  // showLoginInApp = false;

  constructor(
  ) {}

  // loginInAppDone() {
  //   this.showLoginInApp = false
  // }

  add() {
    if (this.valueToAdd) {
      this.fetchedCompanie.typeInterventions.push(this.valueToAdd)
      this.valueToAdd = ''
      // this.showLoginInApp = true
      this.save.emit()
    }
  }
  remove(i: number) {
    this.fetchedCompanie.typeInterventions.splice(i, 1)
    // this.showLoginInApp = true
    this.save.emit()
  }

}
