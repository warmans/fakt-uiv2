import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response  } from '@angular/http';
import { Event } from '../../entity/event';
import { Observable } from 'rxjs';

import { NotificationService } from './../notification/notification.service';


@Injectable()
export class EventService {

  constructor(private http: Http, private notifications: NotificationService) { }

  getEvents(query: { [key: string]: string }): Observable<Event[]> {

    let params = new URLSearchParams();
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(key, query[key]);
      }
    }

    return this.http
    .get('/api/v1/event', { search: params })
    .map((r: Response) => Event.fromObjects(r.json().payload))
    .catch(r => {
        let err = r.error || r;
        this.notifications.addNotification('alert-danger', err);
        return Observable.empty();
    });
  }
}
