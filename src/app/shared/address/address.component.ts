import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { Address, AddressTypes } from './address.model';
import { AddressService } from './address.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnChanges {

  @Input() addresses: Address[] = [];
  @Input() isSingleAddress = false;
  addressTypes = AddressTypes;


  constructor(
    private addressService: AddressService,
    private authService: AuthService,
  ) { }

  ngOnInit() {}
  ngOnChanges() {
    if (!this.addresses.length) {
      const newAddress = new Address();
      this.addresses.push(newAddress);
    }
  }


  newAddress() {
    const newAddress = new Address()
    this.authService.getCurrentUser().ownerCompanies.forEach(companie => {
      companie.address.forEach(singleAddress => {
          newAddress.country = singleAddress.country
        })
    })

    this.addresses.push(newAddress)
  }


  selectCity(i, city: string) {
    this.addresses[i].city = city
    this.addresses[i].cities = []
    // this.places = []
  }
  searchCities(zip, i) {
    this.addresses[i].cities = []
    if (zip.length > 4) {
      this.addressService.getCityByZip(zip, this.authService.getCurrentUser().profile.language)
      .subscribe(
        res => {
          // this.addresses[i].cities = []
          res.results.forEach((result, j) => {

            if (typeof result.postcode_localities === 'undefined') {

              result.address_components.forEach((address_component, k) => {
                address_component.types.forEach(type => {
                  if(type === 'locality') {
                    this.addresses[i].cities.push(res.results[j].address_components[k].long_name)
                  }
                });
              })
            } else {
              result.postcode_localities.forEach(postcode_localitie => {
                  this.addresses[i].cities.push(postcode_localitie)
              })
            }
          })
        },
        error => {
          console.log(error);
        })
    }
  }


  removeAddress(i) {
    this.addresses.splice(i, 1);
  }
  moveAddress(i: number, incremet: number) {
    // if(i>=0 && i<=this.fetchedUser.profile.address.length + incremet) {
    // console.log(i, incremet, this.fetchedUser.profile.address.length)
    if (!(i === 0 && incremet < 0) && !(i === this.addresses.length - 1 && incremet > 0)) {
      const tmp = this.addresses[i];
      this.addresses[i] = this.addresses[i + incremet]
      this.addresses[i + incremet] = tmp
      // this.save(false)
      // console.log(this.fetchedUser.profile.address)
    }
  }

}
