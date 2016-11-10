import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Event } from '../../entity/event';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getEvents(query: {[key: string]: string}): Promise<Event[]> {

    let params = new URLSearchParams();
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(key, query[key]);
      }
    }

    return this.http.get('/api/v1/event', { search: params })
      .toPromise()
      .then(response => Event.fromObjects(response.json().payload))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
