import {Component, Input} from '@angular/core';
import { DataSource } from '../../companie/single/paiement/paiement.model';

@Component({
  selector: 'app-paiement-card',
  templateUrl: './paiementCard.component.html',
  styleUrls: ['./paiementCard.component.css']
})
export class PaiementCardComponent {

  @Input() newCard: DataSource = new DataSource()
  @Input() hideAddress = false;
  years = [2017, 2018, 2019, 2020, 2020, 2021, 2022, 2023, 2024, 2025]
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  constructor() {
  }



}
