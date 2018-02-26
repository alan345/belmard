import { Component, OnInit, Input} from '@angular/core';
import { AuthService} from '../../../auth/auth.service';
import { UserService} from '../../../user/user.service';
import { PaiementService} from './paiement.service';
import { ToastsManager} from 'ng2-toastr';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { Quote } from '../../../quote/quote.model';
import { StripeCustomer, DataSource } from './paiement.model';
import { Companie } from '../../../companie/companie.model';
import { FormBuilder} from '@angular/forms';
// import { User } from '../../../user//user.model';



@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],

})


export class PaiementComponent implements OnInit {
  @Input() fetchedCompanie: Companie = new Companie();
  approveTnC = false;
  unscribeMode = false;
  plan = '';
  reasonToUnscribe = '';
  loading = false;
  showReLoginInApp = false;
  newCard: DataSource = new DataSource();
  stripeCust: StripeCustomer = new StripeCustomer();
  quotes: Quote[] = [];
  passwordIsGood = false;
  //fetchedUser = new User()
  //fetchedUser : User;
  // isUserBelongToHQ=false
  // maxPictureToShow=3;
  // instapic=1;
  // companies: Companie[] = [];
  // isEditMode = false;
  // fetchedUser : User = new User()
  // public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private paiementService: PaiementService,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
    // private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private authService: AuthService
  ) {}

  step = 0;

  changePlan(plan: string) {
    this.plan = plan
    this.nextStep()
  }
  setStep(index: number) {
    this.step = index;
    if(index === 2) {
      this.populateCardFromCompanie()
    }
  }

  populateCardFromCompanie() {
    this.fetchedCompanie.address.forEach(address => {
      this.newCard.address_city = address.city
      this.newCard.address_country = address.country
      this.newCard.address_line1 = address.address
      this.newCard.address_line2 = address. address2
      this.newCard.address_state = address.state
      this.newCard.address_zip = address.zip
    })
  }
  dblclickDunction() {
    this.router.navigate(['companie/mine'], { queryParams: { debug: true } });
  }

  sendPassword(password: string) {
    // console.log(password)
    this.loading = true;
    this.paiementService.sendPassword(password)
      .subscribe(
        res => {
          this.toastr.success('')
          this.nextStep()
          this.loading = false;
          this.passwordIsGood = true
          // this.fetchedCompanie = res.obj
          // this.saved.emit(res.obj)
          //  this.router.navigate(['companie/' + res.obj._id])
        },
        error => {
          this.loading = false;
          // this.toastr.error(error.message)
          console.log(error)
        }
      )
  }


  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.getStripeCust();
  }
  loginInAppDone() {
    this.showReLoginInApp = false
  }

  getStripeCust() {
    this.loading = true
    this.paiementService.getStripeCust()
      .subscribe(
        res => {
          // console.log(res)
          // if(res.customer.deleted) {
          //   this.stripeCust = new StripeCustomer()
          // } else {
            this.stripeCust = res.customer
            this.stripeCust.subscriptions.data.forEach(dataSubscription => {
              this.plan = dataSubscription.plan.id
            })
            this.loading = false;


        },
        error => {
          this.stripeCust = new StripeCustomer();
          this.loading = false;
          console.log(error)
        }
      )
  }


  deleteCustInStripe() {
    this.loading = true
    this.paiementService.deleteCustInStripe()
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          this.toastr.success('Great!')
          this.getStripeCust()
          this.showReLoginInApp = true
          this.setStep(4)
          this.loading = false
        },
        error => { console.log(error); }
      );
  }
  saveCustInStripe(){
    this.loading = true
    this.paiementService.saveCustInStripe()
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          this.toastr.success('Great!')
          this.stripeCust = res.customer
          // console.log(res);
          this.nextStep()
          this.loading = false
        },
        error => { console.log(error); }
      );
  }
  saveCardInStripe() {
    this.loading = true
    // console.log(this.newCard)
    this.paiementService.saveCardInStripe(this.newCard)
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          this.toastr.success('Great!')
          this.getStripeCust()
          this.nextStep()
          this.loading = false
          // console.log(res);
        },
        error => {
          this.loading = false
          console.log(error);
        }
      );
  }
  saveSubscriptionInStripe() {
    this.loading = true
    const planObj = {
      plan: this.plan
    }
    this.paiementService.saveSubscriptionInStripe(planObj)
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          this.toastr.success('Great!')
          this.getStripeCust()
          this.showReLoginInApp = true
          this.nextStep()
          this.loading = false
        },
        error => {
          this.loading = false
          console.log(error);
        }
      );
  }


  deleteSubInStripe(subId) {
    this.loading = true
    this.paiementService.deleteSub(subId, this.reasonToUnscribe)
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          // console.log(res.message)
          this.toastr.success('Great!');
          this.getStripeCust()
          this.setStep(4)
          this.showReLoginInApp = true
          this.plan = ''
          this.loading = false
          // this.getStripeCust()
          // location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteCardInStripe(cardId) {
    this.paiementService.deleteCard(cardId)
      .subscribe(
        res => {
          // this.userService.cleanCurrentUserInSession()
          this.toastr.success('Great!');
          this.getStripeCust();
        },
        error => {
          console.log(error);
        }
      );
  }

}
