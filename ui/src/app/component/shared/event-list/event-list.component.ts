import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Event } from '../../../entity/event';
import { EventService } from './../../../service/event/event.service';
import { UserService } from './../../../service/user/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit, OnChanges {

  events: Event[];

  @Input()
  query: { [key: string]: string };

  @Input()
  keyword: string;

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit() {
    this.refreshData();
  }

  //todo: improve this mess
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      if (propName === "query") {
        this.refreshData();
      }
    }
  }

  refreshData() {
    this.eventService.getEvents(this.query).then(events => this.events = events);
  }

}
