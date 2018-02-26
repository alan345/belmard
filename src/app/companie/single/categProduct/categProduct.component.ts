import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CompanieService} from '../../companie.service';
import {Companie, Categorie0} from '../../companie.model';
import { Location } from '@angular/common';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-categ-product',
  templateUrl: './categProduct.component.html',
  styleUrls: ['../../companie.component.css'],
})
export class CategProductComponent implements OnInit {
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() fetchedCompanie: Companie = new Companie();

  constructor(
    private companieService: CompanieService,
    private location: Location,
    private _fb: FormBuilder,

  ) {}

  ngOnInit() {

  }


  onBlurMethod() {
    this.save.emit()
  }
  addCateg(typeCateg, level, index1, index2, index3) {
    // this.showLoginInApp = true
    const newCategorie = new Categorie0()
    if (level === 0) {
      this.fetchedCompanie.categories[typeCateg].unshift(newCategorie);
    }
    if (level === 1) {
      this.fetchedCompanie.categories[typeCateg][index1].subCateg.unshift(newCategorie);
    }
    if (level === 2) {
      this.fetchedCompanie.categories[typeCateg][index1].subCateg[index2].subCateg.unshift(newCategorie);
    }
    this.save.emit()
  }

  removeCateg(typeCateg, level, index1, index2, index3) {
      // this.showLoginInApp = true
      if(level === 0) {
        this.fetchedCompanie.categories[typeCateg].splice(level, 1)
      }
      if(level === 1) {
        this.fetchedCompanie.categories[typeCateg].splice(index1, 1)
      }
      if(level === 2) {
        this.fetchedCompanie.categories[typeCateg][index1].subCateg.splice(index2, 1)
      }
      if(level === 3) {
        this.fetchedCompanie.categories[typeCateg][index1].subCateg[index2].subCateg.splice(index3, 1)
      }
      this.save.emit()
  }


}
