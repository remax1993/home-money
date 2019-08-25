import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../shared/models/event.model";
import {CategoryModel} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  @Input() categories: CategoryModel[] = [];
  @Input() events: EventModel[] = [];

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getEventClass(e: EventModel){
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  changeCriteria(field: string){
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
  };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
