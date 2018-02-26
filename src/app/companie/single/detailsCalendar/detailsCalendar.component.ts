import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CompanieService} from '../../companie.service';
import {Companie} from '../../companie.model';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-details-calendar',
  templateUrl: './detailsCalendar.component.html',
  styleUrls: ['../../companie.component.css'],
})
export class DetailsCalendarComponent implements OnInit, OnChanges {
  @Output() saveEmit: EventEmitter<any> = new EventEmitter();
  @Input() fetchedCompanie: Companie = new Companie()
  daysToHideTemp: any = [true, true, true, true, true, true, true]
  myForm: FormGroup;

  constructor(
    private companieService: CompanieService,
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnChanges() {
    this.fetchedCompanie.option.calendar.daysToHide.forEach(day => {
      this.daysToHideTemp[day] = false
    })
  }

  ngOnInit() {

    this.myForm = this._fb.group({
      nameCompanie: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [''],
      VAT: [''],
      isSupplier: [''],
      faxNumber: [''],
      email: [''],
      timeBegin: ['', [Validators.required, Validators.minLength(1)]],
      timeEnd: ['', [Validators.required, Validators.minLength(1)]],
      timeBeginbusinessHours: ['', [Validators.required, Validators.minLength(1)]],
      timeEndbusinessHours: ['', [Validators.required, Validators.minLength(1)]],
      slotDuration: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: [''],
      _users: this._fb.array([]),
      secretKey:[''],
      serviceSelected:[''],
    })
  }

  changeDay () {
    this.dataChanged();
    this.fetchedCompanie.option.calendar.daysToHide = []
    for (let i = 0; i < 7 ; i++) {
      if (!this.daysToHideTemp[i]) { this.fetchedCompanie.option.calendar.daysToHide.push(i) }
    }
  }

  dataChanged() {
    this.save();
  }


  save() {
    this.saveEmit.emit();
  }

}
