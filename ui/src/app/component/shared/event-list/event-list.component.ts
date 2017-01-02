import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../entity/event';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  @Input()
  events: Observable<Event[]>;

  @Input()
  keyword: string

  constructor() {
  }

  ngOnInit() {

  }
}
