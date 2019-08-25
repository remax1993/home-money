import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/event.service";
import {combineLatest, Subscription} from "rxjs";
import {BillModel} from "../shared/models/bill.model";
import {CategoryModel} from "../shared/models/category.model";
import {EventModel} from "../shared/models/event.model";

@Component({
    selector: 'app-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

    sub1: Subscription;

    isLoaded = false;
    bill: BillModel;
    categories: CategoryModel[] = [];
    events: EventModel[] = [];

    constructor(
        private billService: BillService,
        private categoriesService: CategoriesService,
        private eventService: EventService
    ) {
    }

    ngOnInit() {
        this.sub1 = combineLatest(
            this.billService.getBill(),
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
            this.bill = data[0];
            this.categories = data[1];
            this.events = data[2];

            this.isLoaded = true;
        })
    }

    getCategoryCost(cat: CategoryModel): number{
        const catEvents = this.events.filter(evt => evt.category === cat.id && evt.type === 'outcome');

        return catEvents.reduce((total, evt) => {
            total += evt.amount;
            return total;
        }, 0);
    }

    private getPercent(cat: CategoryModel): number{
        const percent: number = (100 * this.getCategoryCost(cat)) / cat.capacity;
        console.log(cat);
        return percent > 100 ? 100 : percent;
    }

    getCatPercent(cat: CategoryModel): string {
        return this.getPercent(cat) + '%';
    }

    getCatColorClass(cat: CategoryModel): string{
        const percent  = this.getPercent(cat);
        return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    }

    ngOnDestroy(){
        if(this.sub1) this.sub1.unsubscribe();
    }

}
