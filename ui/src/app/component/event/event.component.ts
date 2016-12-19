import { Component, OnInit, Input } from '@angular/core';
import { EventService } from './../../service/event/event.service';
import { Event } from './../../entity/event';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input()
  eventId: string

  event: Event

  similarEvents: Event[]

  constructor(private route: ActivatedRoute, private eventService: EventService) { }


  ngOnInit() {
      this.route.params
      .switchMap((params: Params) => this.eventService.getEvents({ids: params['id']}))
      .subscribe(events => this.setEvent(events[0]));
  }

  setEvent(event: Event) {
    this.event = event;
    this.getSimilar(event);
  }

  setSimilar(events: Event[]) {
    this.similarEvents = events;
  }

  getSimilar(event: Event) {
    this.eventService.getEvents({venue: String(event.venue.id), date_relative: 'This Week'}).subscribe( events => this.setSimilar(events))
  }

}
