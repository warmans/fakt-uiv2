import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-simple-event-search',
  templateUrl: './simple-event-search.component.html',
  styleUrls: ['./simple-event-search.component.scss']
})
export class SimpleEventSearchComponent implements OnInit {

  @Input()
  defaultQueryValue: {[key: string]: string} = {};

  @Output()
  onQueryUpdate = new EventEmitter<{[key: string]: string}>();

  @Output()
  onKeywordUpdate = new EventEmitter<string>();

  private keywordDebouncer: Subject<any> = new Subject();

  keyword: string;

  private query: {[key: string]: string} = {};

  constructor() {
  }

  ngOnInit() {

    for (let key in this.defaultQueryValue) {
      if (this.defaultQueryValue.hasOwnProperty(key)) {
        this.query[key] = this.defaultQueryValue[key];
      }
    }

    //set some defaults
    if (this.query['date_relative'] == undefined) {
      this.query['date_relative'] = "";
    }

    //setup keyword debounce
    this.keywordDebouncer.debounceTime(1000).subscribe((val) => this.onKeywordUpdate.emit(val));

  }

  handleFormChange(event: any, query: {[key: string]: string}) {
    this.query = query;
    this.onQueryUpdate.emit(this.query);
  }


  handleKeywordChange(keyword: string) {
    this.keywordDebouncer.next(keyword);
  }

}