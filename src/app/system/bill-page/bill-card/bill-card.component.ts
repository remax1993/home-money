import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from "../../shared/models/bill.model";

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel;
  @Input() currency: any;

  usd: number;
  eur: number;
  rub: number;

  constructor() { }

  ngOnInit() {
    console.log('bill', this.bill)

      this.currency.find((cur) => {
        if(cur['Cur_Abbreviation'] === 'RUB'){
            this.rub = this.bill.value / cur['Cur_OfficialRate'] * cur['Cur_Scale']
        }
      });

      this.currency.find((cur) => {
          if(cur['Cur_Abbreviation'] === 'EUR'){
              this.eur = this.bill.value / cur['Cur_OfficialRate'] * cur['Cur_Scale']
          }
      });

      this.currency.find((cur) => {
          if(cur['Cur_Abbreviation'] === 'USD'){
              this.usd = this.bill.value / cur['Cur_OfficialRate'] * cur['Cur_Scale']
          }
      });



  }

}
