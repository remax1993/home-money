import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  currenciesArrName = ['USD', 'EUR', 'RUB'];
  currencies = {
      USD: {},
      EUR: {},
      RUB: {}
  };

  constructor() { }

  ngOnInit() {
      for(let item of this.currenciesArrName){
          this.currency.find((cur) => {
              if(cur['Cur_Abbreviation'] === item){
                  [this.currencies[item]['cur'], this.currencies[item]['scale'], this.currencies[item]['date'], this.currencies[item]['name']] =
                      [cur['Cur_OfficialRate'], cur['Cur_Scale'], cur['Date'], cur['Cur_Name']]
              }
          });
      }

      console.log(this.currencies)
  }

}
