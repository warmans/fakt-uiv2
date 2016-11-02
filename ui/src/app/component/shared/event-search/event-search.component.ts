import { Component, Input, OnInit, Pipe } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})
export class EventSearchComponent implements OnInit {

  constructor() { }

  @Input()
  query: { [key: string]: string }

  filters: Filter[] = [];
  filterSelection: Filter[] = [];

  ngOnInit() {
    this.filters = [
      Filter.NewFilter("happening...", "date_range", "happening", ["today", "tomorrow", "this weekend", "this week"], true),
      Filter.NewFilter("of type...", "types", "of type", ["concert"], true)
    ];
  }

  addFilter(index: number) {
    let added = this.filters.splice(index, 1)
    this.filterSelection.push(added[0]);
  }

  removeFilter(index: number) {
    let removed = this.filterSelection.splice(index, 1)
    this.filters.push(removed[0])
  }

  isSelected(filter: Filter): boolean {
    for (let v of this.filterSelection) {
      if (filter.field == v.field) {
          return true
      }
    }
    return false
  }
}

class Filter {
  name: string
  field: string
  value: string
  description: string
  valueChoices: string[]
  isSingleChoice: boolean

  static NewFilter(name: string, field: string, description: string, valueChoices: string[], isSingleChoice: boolean): Filter {
    let f = new Filter();
    f.name = name;
    f.field = field;
    f.description = description;
    f.valueChoices = valueChoices;
    f.isSingleChoice = isSingleChoice;
    return f
  }
}
