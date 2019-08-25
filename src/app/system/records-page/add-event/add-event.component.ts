import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from "../../shared/models/category.model";
import {NgForm} from "@angular/forms";
import {EventModel} from "../../shared/models/event.model";
import * as moment from 'moment';
import {EventService} from "../../shared/services/event.service";
import {BillService} from "../../shared/services/bill.service";
import {BillModel} from "../../shared/models/bill.model";
import {mergeMap} from "rxjs/operators";
import {MessageModel} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

    sub1: Subscription;
    sub2: Subscription;

    @Input() categories: CategoryModel[] = [];

    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];

    message: MessageModel;

    constructor(
        private eventService: EventService,
        private billService: BillService
    ) {
    }

    ngOnInit() {
        this.message = new MessageModel('danger', '');
    }

    onSubmit(form: NgForm) {
        let {amount, description, category, type} = form.value;
        if (amount < 0) amount *= -1;

        const event = new EventModel(
            type,
            amount,
            +category,
            moment().format('DD.MM.YYYY HH:mm:ss'),
            description
        );
        this.sub1 = this.billService.getBill().subscribe((bill: BillModel) => {
            let value: number = 0;

            if(type === 'outcome'){
                if(amount > bill.value){
                    this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`)
                    return;
                }else{
                    value = bill.value - amount;
                }
            }else{
                value = bill.value + amount;
            }

            this.sub2 = this.billService.updateBill({value, currency: bill.currency})
                .pipe(mergeMap(_ => this.eventService.addEvent(event)))
                .subscribe(_ => {
                    form.setValue({
                        amount: 0,
                        description: ' ',
                        category: 1,
                        type: 'outcome'
                    })
                })
        })

        //this.eventService.addEvent(event);
    }

    private showMessage(text: string){
        this.message.text = text;
        setTimeout(_ => this.message.text = '', 5000);
    }

    ngOnDestroy(){
        if(this.sub1) this.sub1.unsubscribe();
        if(this.sub2) this.sub2.unsubscribe();
    }





}
