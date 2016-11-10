/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { EventService } from './../../../service/event/event.service';
import { UserService } from './../../../service/user/user.service';
import { FormsModule } from '@angular/forms';
import { UtagsComponent } from './../utags/utags.component';
import { MomentModule } from 'angular2-moment';
import { ShortenText } from './../../../pipe/shorten-text.pipe';

describe('Component: EventList', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent, UtagsComponent, ShortenText],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        EventService,
        UserService
      ],
      imports: [HttpModule, FormsModule, MomentModule]
    });
  });


  it('should create an instance', () => {
    const fixture = TestBed.createComponent(EventListComponent);
    expect(fixture).toBeDefined();
  });
});
