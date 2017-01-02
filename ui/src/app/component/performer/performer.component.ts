import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Performer} from "../../entity/performer";
import {Event} from "../../entity/event";
import {PerformerService} from "../../service/performer/performer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnInit {

  performer: Performer;

  events: Observable<Event[]>;

  constructor(private route: ActivatedRoute, private perfomerService: PerformerService) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.perfomerService.getPerformers({ids: params['id']}))
      .subscribe(performers => this.setPerformer(performers[0]));
  }

  setPerformer(performer: Performer) {
    this.performer = performer;
    this.getEvents(performer.id);
  }

  getEvents(performerID: string) {
    this.events = this.perfomerService.getPerformerEvents(performerID)
  }

}
