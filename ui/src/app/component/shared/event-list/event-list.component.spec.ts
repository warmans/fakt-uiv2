/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { EventService } from './../../../service/event/event.service';
import { UserService } from './../../../service/user/user.service';



describe('Component: EventList', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent],
      providers: [],
      imports: [HttpModule]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(EventListComponent);
    expect(fixture).toBeDefined();
  });
});
