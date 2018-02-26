import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CompanieService} from '../../companie.service';
import {Companie} from '../../companie.model';
import {Router} from '@angular/router';
// import {Address} from '../../../shared/address/address.model';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {UserService} from '../../user/user.service';


// import {Companie, Categorie0, ContactsPerson} from '../companie.model';

// import {ToastsManager} from 'ng2-toastr';

// import {MatDialog } from '@angular/material';
// import { Location } from '@angular/common';

// import { DeleteDialog } from '../../../deleteDialog/deleteDialog.component';
// import { User } from '../../user/user.model';

// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
// import { PaiementService} from '../paiement/paiement.service';


@Component({
  selector: 'app-quote-settings',
  templateUrl: './quoteSettings.component.html',
  styleUrls: ['../../companie.component.css'],
})

export class QuoteSettingsComponent implements OnInit {
  @Output() saveEmit: EventEmitter<any> = new EventEmitter();
  // @Input() showBackButton = true;
  @Input() fetchedCompanie: Companie = new Companie();
  showLoginInApp = false;


  constructor(
    private companieService: CompanieService,
//    private modalService: NgbModal,
    // private toastr: ToastsManager,
    // public dialog: MatDialog,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    // private location: Location,
    // private _fb: FormBuilder,
    private authService: AuthService,
    // private userService: UserService,
    // private paiementService: PaiementService,
  ) {}

  changeCurrency() {
    this.save();
    this.showLoginInApp = true;
  }
  loginInAppDone(){
    this.showLoginInApp = false;
  }

  ngOnInit() {}

  save() {
    this.saveEmit.emit()
  }




}
