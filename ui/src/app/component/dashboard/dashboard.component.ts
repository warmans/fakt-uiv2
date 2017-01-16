import {Component, OnInit} from '@angular/core';
import {EventService} from "../../service/event/event.service";
import {Event} from '../../entity/event';

import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  query: {[key: string]: string} = {};

  events: Observable<Event[]>;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    this.query = this.route.snapshot.queryParams;
    this.refreshData()
  }

  setPage(page: number) {
    this.mergeQueryData({"page": String(page)});
    this.refreshData();
  }

  mergeQueryData(query: {[key: string]: string}) {
    let newQuery = {};
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        newQuery[key] = query[key];
      }
    }
    this.query = newQuery;
  }

  refreshData() {

    //update URI
    this.router.navigate([], {queryParams: this.query});

    //update data
    this.events = this.eventService.getEvents(this.query);
  }
}
