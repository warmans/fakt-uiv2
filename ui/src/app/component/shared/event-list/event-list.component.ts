import { Component, OnInit } from '@angular/core';
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
  query 

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit() {
    this.eventService.getEvents({}).then(events => this.events = events);
  }
  
}
