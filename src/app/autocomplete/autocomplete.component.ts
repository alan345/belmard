import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService} from '../user/user.service';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  @Input() typeAutocomplete: string;
  @Input() arrayContent = [];
  @Input() singleChoice: boolean = true;

  autocompleteSearch = ''
  fetchedUsers: User[] = [];
  // @Input() view: string;
  //
  // @Input() viewDate: Date;
  //
  // @Input() locale: string = 'en';
  //
  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();
  //
  // @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  constructor(
    private userService: UserService,
  ) { }


  getUsers(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
      res => {
        this.fetchedUsers = res.data
      },
      error => {
        console.log(error);
      }
      );
  }


  selectData(user: User) {
    this.autocompleteSearch = ''
    this.fetchedUsers = []
    this.arrayContent.push(user)
    this.getResultAutocomplete.emit(this.arrayContent)
  }
  searchData() {
    if (!this.autocompleteSearch) {
      this.fetchedUsers = []
    } else {
      let search = {
        search: this.autocompleteSearch,
      };
      this.getUsers(1, search)
    }
  }
  removeData(i: number) {
    this.arrayContent.splice(i, 1);
  }





}
