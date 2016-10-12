import { Venue } from './venue';
import { Performer } from './performer';

export class Event {
    id: string
    date: string
    description: string
    type: string
    venue: Venue
    performer: Performer[]
    utag: string[]
    source: string
}