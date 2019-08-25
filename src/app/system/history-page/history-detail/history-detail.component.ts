import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventService} from "../../shared/services/event.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {mergeMap} from "rxjs/operators";
import {EventModel} from "../../shared/models/event.model";
import {CategoryModel} from "../../shared/models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded: boolean = false;
  s1: Subscription;

  event: EventModel;
  category: CategoryModel;

  constructor(
      private route: ActivatedRoute,
      private eventService: EventService,
      private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.s1 = this.route.params
        .pipe(
            mergeMap((params: Params) => this.eventService.getEventById(params['id'])),
            mergeMap((event: EventModel) => {
              this.event = event;
              return this.categoryService.getCategoryById(event.category);
            })
        ).subscribe((category: CategoryModel) => {
          this.category = category;
          this.isLoaded = true;
        })
  }

  ngOnDestroy(){
    if(this.s1) this.s1.unsubscribe();
  }

}
