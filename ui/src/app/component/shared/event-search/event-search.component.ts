import { Component, Input, OnInit, enableProdMode } from '@angular/core';
import { inject } from '@angular/core/testing';
import { element } from 'protractor';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss'],
})
export class EventSearchComponent implements OnInit {

  keyword: string;


  query: { [key: string]: string };

  //unselected filters (possible filters) 
  availableFilters: Filter[] = [];

  //selected filters
  filters: Filter[] = [];

  private querySub: any

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    //todo these need to be supported on the back-end
    this.availableFilters = [
      Filter.NewFilter('happening...', 'date_relative', 'happening', ['Today', 'Tomorrow', 'This Weekend', 'This Week'], true, 'This Weekend'),
      Filter.NewFilter('of type...', 'type', 'of type', ['Konzert'], true, 'Konzert')
    ];

    let toAdd: number[] = [];

    this.availableFilters.forEach((item, index) => {
      let found = this.route.snapshot.queryParams[item.field];
      if (found !== undefined) {
        item.value = found;
        toAdd.push(index);
      }
    });

    this.addFilter(...toAdd);
  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  updateFilter(filter: Filter, newChoice: string) {
    filter.value = newChoice;
    this.updateURI();
  }

  addFilter(...indexes: number[]) {
    console.log(indexes);
    indexes.forEach((item, index) => {
      //todo: moving items from one list to the other is kind of lame. It makes the below and teh toAdd stuff in Init
      //since indexes are changing during iteration and add.
      //shit hack --------------------------------> 
      let added = this.availableFilters.splice(item-index, 1);
      this.filters.push(added[0]);
    });
    this.updateURI();
  }

  removeFilter(index: number) {
    let removed = this.filters.splice(index, 1);
    this.availableFilters.push(removed[0]);
    this.updateURI();
  }

  isSelected(filter: Filter): boolean {
    for (let v of this.filters) {
      if (filter.field === v.field) {
        return true;
      }
    }
    return false;
  }

  updateURI() {
    let filterMap: { [key: string]: string } = {}
    for (let f of this.filters) {
      filterMap[f.field] = f.value;
      //todo: should support multiple values really...
      // if (filterMap[f.field] === undefined) {
      //   filterMap[f.field] = [f.value]
      // } else {
      //   filterMap[f.field].push(f.value)
      // }
    }
    this.router.navigate([], { queryParams: filterMap })
    this.query = filterMap;
  }
}

class Filter {
  name: string;
  field: string;
  value: string;
  description: string;
  valueChoices: string[];
  isSingleChoice: boolean;

  static NewFilter(
    name: string,
    field: string,
    description: string,
    valueChoices: string[],
    isSingleChoice: boolean,
    defaultValue: string
  ): Filter {
    let f = new Filter();
    f.name = name;
    f.field = field;
    f.value = defaultValue;
    f.description = description;
    f.valueChoices = valueChoices;
    f.isSingleChoice = isSingleChoice;
    return f;
  }
}
