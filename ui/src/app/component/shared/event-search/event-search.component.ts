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

  private matrixParameterValue: string;
  private matrixSub: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.availableFilters = [
      Filter.NewFilter('happening...', 'date_relative', 'happening', ['today', 'tomorrow', 'this weekend', 'this week'], true, 'this weekend'),
      Filter.NewFilter('of type...', 'type', 'of type', ['concert'], true, 'concert')
    ];

    //todo:I guess this needs to be updated to propagate URI changes back to component 
    let that = this;
    this.route.snapshot.params["matrixParameterName"];
    this.route.params.subscribe(function(matrixParams) {
      that.matrixParameterValue = matrixParams["matrixParameterName"];
      console.log(matrixParams["matrixParameterName"]);
    });
  }

  ngOnDestroy() {
    if (this.matrixSub) {
      this.matrixSub.unsubscribe();
    }
  }

  updateFilter(filter: Filter, newChoice: string) {
    filter.value = newChoice;
    this.updateURI();
  }

  addFilter(index: number) {
    let added = this.availableFilters.splice(index, 1);
    this.filters.push(added[0]);
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
    this.router.navigate([], {queryParams: filterMap, preserveFragment: true})
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
