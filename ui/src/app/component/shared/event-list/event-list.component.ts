import { Component, OnInit } from '@angular/core';
import { Event } from '../../../entity/event'
import { EventService } from './../../../service/event/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents({}).then(events => this.events = events);
  }

  debugDump(ev: Event): void {
    console.log(ev)
  }

}
