import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './component/app/app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventListComponent } from './component/shared/event-list/event-list.component';
import { EventService } from './service/event/event.service';
import { ShortenText } from './pipe/shorten-text.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventListComponent,
    ShortenText
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
