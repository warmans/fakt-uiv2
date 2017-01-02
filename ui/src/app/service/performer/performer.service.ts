import {Injectable} from '@angular/core';
import {LoadingService} from "../loading/loading.service";
import {Http, URLSearchParams, Response} from "@angular/http";
import {NotificationService} from "../notification/notification.service";
import {Observable} from "rxjs";
import {Performer} from "../../entity/performer";
import {Event} from "../../entity/event";

@Injectable()
export class PerformerService {

  constructor(private http: Http,
              private notifications: NotificationService,
              private loading: LoadingService,) {
  }

  getPerformers(query: {[key: string]: string}): Observable<Performer[]> {

    let params = new URLSearchParams();

    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(key, query[key]);
      }
    }

    let sub = this.http
      .get('/api/v1/performer', {search: params})
      .map((r: Response) => Performer.fromObjects(r.json().payload))
      .catch(r => {
        let err = r.error || r;
        this.notifications.addNotification('alert-danger', err);
        return Observable.empty();
      })
      .share();
    this.loading.observe(sub);

    return sub;
  }

  getPerformerEvents(performerID: string): Observable<Event[]>  {
    let sub = this.http
      .get('/api/v1/performer/'+performerID+"/event")
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

}
