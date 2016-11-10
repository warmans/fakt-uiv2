/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { UtagsComponent } from './utags.component';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { UserService } from './../../../service/user/user.service';


describe('Component: Utags', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtagsComponent],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        UserService
      ],
      imports: [HttpModule, FormsModule, MomentModule]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(UtagsComponent);
    expect(fixture).toBeDefined();
  });
});
