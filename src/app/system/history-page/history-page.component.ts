import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/event.service";
import {combineLatest, Subscription} from "rxjs";
import {CategoryModel} from "../shared/models/category.model";
import {EventModel} from "../shared/models/event.model";
import * as moment from 'moment';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(
        private categoriesService: CategoriesService,
        private eventService: EventService
    ) {}

    isLoaded: boolean = false;

    chartData = [];

    s1: Subscription;

    categories: CategoryModel[] = [];
    events: EventModel[] = [];
    filteredEvents: EventModel[] = [];

    isFilterVisible: boolean = false;


    ngOnInit() {
        this.s1 = combineLatest(
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
            ).subscribe((data: [CategoryModel[], EventModel[]]) => {
                this.categories = data[0];
                this.events = data[1];

                this.setOriginalEvents();

                this.calculateChartData();

                this.isLoaded = true;
        })
    }

    calculateChartData(): void{
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total, event) => {
                    total += event.amount;
                    return total;
                }, 0)
            })
        })
    }
    private toggleFilterVisability(dir: boolean){
        this.isFilterVisible = dir;
    }

    openFilter(){
        this.toggleFilterVisability(true);
    }

    onFilterApply(filterData){
        this.toggleFilterVisability(false);
        this.setOriginalEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
            .filter(e => {
                if(filterData.types.length) {
                    return filterData.types.indexOf(e.type) !== -1;
                }else{
                    return e;
                }
            })
            .filter(e => {
                if(filterData.categories.length) {
                    return filterData.categories.indexOf(e.category.toString()) !== -1;
                }else{
                    return e;
                }
            })
            .filter(e => {
                const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
                return momentDate.isBetween(startPeriod, endPeriod);
            });

        this.calculateChartData();

    }

    onFilterCancel(){
        this.toggleFilterVisability(false);
        this.setOriginalEvents();
        this.calculateChartData();
    }

    private setOriginalEvents(){
        this.filteredEvents = this.events.slice();
    }

    ngOnDestroy(){
        if(this.s1) this.s1.unsubscribe();
    }

}
