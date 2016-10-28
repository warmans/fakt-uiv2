import { Component, OnInit, Input } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Utag } from '../../../entity/utag'
import { MomentModule } from 'angular2-moment';

class DisplayTag {
  value: string
  icon: string
  count: number
  clicked: boolean
  users: string[]
}

@Component({
  selector: 'app-utags',
  templateUrl: './utags.component.html',
  styleUrls: ['./utags.component.scss']
})
export class UtagsComponent implements OnInit {

  @Input()
  save: string

  @Input()
  tags: Utag[];

  tagState: DisplayTag[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.tagState = [
      { value: "dislike", icon: "fa-star-o", count: 0, clicked: false, users: [] },
      { value: "meh", icon: "fa-star-half-o", count: 0, clicked: false, users: [] },
      { value: "like", icon: "fa-star", count: 0, clicked: false, users: [] },
    ];

    for (let storedTag of this.tags) {
      for (let availTag of this.tagState) {
        if (storedTag.tags.indexOf(availTag.value) != -1) {
          availTag.count++;
          //todo "if current user is same as storedTag.user clicked is true"
        }
        availTag.users.push(storedTag.username);
      }
    }
  }

  toggleTag(key: number, tag: DisplayTag) {

    console.log(key, tag)

    if (this.save == "") {
      console.log("no save url was defined for this tags component");
      return;
    }

    var syncMethod: string = "POST"

    //update the interface instantly
    if (tag.clicked) {
      this.tagState[key].count--;
      syncMethod = "DELETE"

    } else {
      this.tagState[key].count++;
      syncMethod = "POST"
    }
    this.tagState[key].clicked = !tag.clicked;

    //store the new data
    this.http
      .request(this.save, { method: syncMethod })
      .toPromise()
      .then(res => this.tags = res.json().data.payload)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
