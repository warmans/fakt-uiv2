import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../entity/event'
import { EventService } from './../../../service/event/event.service';
import { UserService } from './../../../service/user/user.service';
import { User } from './../../../entity/user';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[];

  @Input()
  query: { [key: string]: string }

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.eventService.getEvents(this.query).then(events => this.events = events);
  }

}
