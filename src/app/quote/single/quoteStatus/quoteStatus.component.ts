import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quote, StatusQuotes } from '../../quote.model';
import { AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-quote-status',
  templateUrl: './quoteStatus.component.html',
  styleUrls: ['./quoteStatus.component.css'],
})
export class QuoteStatusComponent {
  @Input() fetchedQuote: Quote = new Quote();
  @Input() showSingleSelected = false;
  @Output() quoteStatusChanged: EventEmitter<any> = new EventEmitter();

  statusQuotes = StatusQuotes;
  statusQuotesSingleSelected = StatusQuotes;


  constructor(private authService: AuthService) { }
  changeStatus() {
    this.quoteStatusChanged.emit();
  }
  isButtonsDisabled(n) {
    // console.log(this.authService.showObjHTML('quote', 'write'))
    if (!this.authService.showObjHTML('quote', 'write')) {
      return true;
    }

    if (n.indexStatus === 'pending' && (this.fetchedQuote.statusQuote === 'signed' || this.fetchedQuote.statusQuote === 'paid')) {
        return true;
    }
    return false;
  }
  // ngOnChanges() {
  //   // if(this.showSingleSelected) {
  //   //   this.statusQuotesSingleSelected = []
  //   //   this.statusQuotesSingleSelected.push(this.statusQuotes.find((statusQuote) => {
  //   //     return statusQuote.indexStatus === this.fetchedQuote.statusQuote;
  //   //   }))
  //   //
  //   //   // console.log(this.statusQuotesSingleSelected)
  //   // }
  // }
}
