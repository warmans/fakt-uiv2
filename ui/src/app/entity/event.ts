import { Venue } from './venue';
import { Performer } from './performer';

export class Event {
    id: string;
    date: string;
    description: string;
    type: string;
    venue: Venue;
    performer: Performer[];
    utag: string[];
    source: string;

    get imageURL(): string {
        if (this.performer !== undefined) {
            for (let p of this.performer) {
                if (p.img !== '') {
                    return 'url(' + p.img + ')';
                }
            }
        }
        return '';
    }

    static fromObjects(json: Array<Object>): Event[] {
        return json.map(function (ev): Event {
            let e = new Event();
            for (let key in ev) {
                if (ev.hasOwnProperty(key)) {
                    e[key] = ev[key];
                }
            }
            return e;
        });
    }
}
