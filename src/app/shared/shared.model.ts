import { Validators, FormControl } from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


export class Search {
  // isQuoteAssignedToMe = false;
  orderBy = '';
  search = '';
  quoteType = '';
  quoteId = '';
  userId = '';
  clientId = '';
  userCalendarId = '';
  paiementQuoteId = '';
  endDate: Date = new Date();
  startDate: Date = new Date();
  assignedToId = '';
  projectId = '';
  // parentQuoteId = '';
  isExternalUser = true;
  isExpense = false;
  typeQuote = '';
  year = 0;
  isFromAutocomplete = false;
  isAdmin = false;
  isDialog = false;
  statusQuote = '';
};



export class PaginationData {
  currentPage: number = 1;
  itemsPerPage = 0;
  totalItems = 0;
};






export class CustomFormControls {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(EMAIL_REGEX)])
}
