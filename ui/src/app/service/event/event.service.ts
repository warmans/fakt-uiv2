import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import {Event} from '../../entity/event';
import {Observable} from 'rxjs';

import {NotificationService} from './../notification/notification.service';
import {LoadingService} from './../loading/loading.service';


@Injectable()
export class EventService {

  constructor(private http: Http,
              private notifications: NotificationService,
              private loading: LoadingService,) {
  }

  getEvents(query: {[key: string]: string}): Observable<Event[]> {

    let params = new URLSearchParams();

    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(key, query[key]);
      }
    }

    let sub = this.http
      .get('/api/v1/event', {search: params})
      .map((r: Response) => Event.fromObjects(r.json().payload))
      .catch(r => {
        let err = r.error || r;
        this.notifications.addNotification('alert-danger', err);
        return Observable.empty();
      })
      .share();
    this.loading.observe(sub);

    return sub;
  }

  getSimilarEvents(eventID: string): Observable<Event[]> {

    let params = new URLSearchParams();
    params.set("page_size", "5");

    let sub = this.http
      .get('/api/v1/event/'+eventID+"/similar", {search: params})
      .map((r: Response) => Event.fromObjects(r.json().payload))
      .catch(r => {
        let err = r.error || r;
        this.notifications.addNotification('alert-danger', err);
        return Observable.empty();
      })
      .share();
    this.loading.observe(sub);

    return sub;
  }

  getEventTags(): Observable<Object[]> {

    let params = new URLSearchParams();
    params.set("with_events", "true");

    let sub = this.http
      .get('/api/v1/tag', {search: params})
      .map((r: Response) => r.json().payload)
      .catch(r => {
        let err = r.error || r;
        this.notifications.addNotification('alert-danger', err);
        return Observable.empty();
      })
      .share();
    this.loading.observe(sub);

    return sub;
  }
}
