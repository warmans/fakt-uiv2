import { Injectable } from '@angular/core';

class Notification {
  cls: string;
  message: string;
}

@Injectable()
export class NotificationService {

  private notifications: Notification[];

  addNotification(cls: string, message: string) {
    let n = new Notification();
    n.cls = cls;
    n.message = message;
    this.notifications.push(n);
  }

  getNotifications(): Notification[] {
    let latest: Notification[];
    while (this.notifications.length > 0) {
      latest.push(this.notifications.shift());
    }
    return latest;
  }
}
