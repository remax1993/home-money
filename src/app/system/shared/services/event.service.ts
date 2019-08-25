import { Injectable } from '@angular/core';
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../models/event.model";
import {Observable} from "rxjs";

@Injectable()
export class EventService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: EventModel){
    return this.post('events', event);
  }

  getEvents(): Observable<EventModel[]>{
    return <Observable<EventModel[]>> this.get('events');
  }

  getEventById(id: string): Observable<EventModel> {
      return <Observable<EventModel>> this.get(`events/${id}`);
  }
}
