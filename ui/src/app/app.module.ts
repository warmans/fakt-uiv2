import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MomentModule } from 'angular2-moment';

import { routing } from './app.routing';
import { AppComponent } from './component/app/app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventListComponent } from './component/shared/event-list/event-list.component';
import { EventService } from './service/event/event.service';
import { UserService } from './service/user/user.service';
import { ShortenText } from './pipe/shorten-text.pipe';
import { VenuesComponent } from './component/venues/venues.component';
import { VenueListComponent } from './component/shared/venue-list/venue-list.component';
import { UtagsComponent } from './component/shared/utags/utags.component';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventListComponent,
    ShortenText,
    VenuesComponent,
    VenueListComponent,
    UtagsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    routing
  ],
  providers: [EventService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
