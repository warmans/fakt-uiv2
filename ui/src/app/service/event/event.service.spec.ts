/* tslint:disable:no-unused-variable */

import { Http, URLSearchParams, BaseRequestOptions, HttpModule } from '@angular/http';

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { EventService } from './event.service';

describe('Service: Event', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct',
    inject(
      [EventService, MockBackend],
      (service: EventService, mockBackend: MockBackend) => {
        expect(service).toBeDefined();
      }
    )
  );
});
