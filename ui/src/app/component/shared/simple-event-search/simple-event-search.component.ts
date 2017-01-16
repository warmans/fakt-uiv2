import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-simple-event-search',
  templateUrl: './simple-event-search.component.html',
  styleUrls: ['./simple-event-search.component.scss']
})
export class SimpleEventSearchComponent implements OnInit {

  @Input()
  defaultQueryValue: {[key:string]: string} = {};

  @Output()
  onQueryUpdate = new EventEmitter<{[key:string]: string}>();

  private query: {[key:string]: string} = {};

  constructor() { }

  ngOnInit() {
    for (let key in this.defaultQueryValue) {
      if (this.defaultQueryValue.hasOwnProperty(key)) {
        this.query[key] = this.defaultQueryValue[key];
      }
    }
  }

  handleFormChange(event: any, query: {[key:string]: string}) {
    this.query = query;
    this.onQueryUpdate.emit(this.query);
  }

}
