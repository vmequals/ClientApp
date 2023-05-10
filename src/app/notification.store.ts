import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from './models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  get notifications(): Notification[] {
    return this.notificationsSubject.getValue();
  }

  set notifications(value: Notification[]) {
    this.notificationsSubject.next(value);
  }

  markAsRead(notificationId: number): void {
    const notifications = [...this.notifications];
    const index = notifications.findIndex(n => n.id === notificationId);
    notifications[index].read = true;
    this.notifications = notifications;
  }
}
