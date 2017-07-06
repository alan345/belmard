import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService} from '../user/user.service';
import { CompanieService} from '../companie/companie.service';
import { ProductService} from '../product/product.service';

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
  @Input() title: string = '';


  autocompleteSearch = ''
  fetchedData: User[] = [];

  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private companieService: CompanieService,
    private productService: ProductService,
  ) {}


  getData(page: number, search: any) {

    if(this.typeAutocomplete ==='user')
      this.userService.getUsers(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='companie')
      this.companieService.getCompanies(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='product')
      this.productService.getProducts(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });


  }





  selectData(data) {
    this.autocompleteSearch = ''
    this.fetchedData = []
    this.arrayContent.push(data)
    this.getResultAutocomplete.emit(this.arrayContent)
  }
  searchData() {
    if (!this.autocompleteSearch) {
      this.fetchedData = []
    } else {
      let search = {
        search: this.autocompleteSearch,
      };
      this.getData(1, search)
    }
  }
  removeData(i: number) {
    this.arrayContent.splice(i, 1);
  }

}
