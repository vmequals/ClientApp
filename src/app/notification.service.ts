// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private apiUrl = 'https://my-api.com/notifications';
//
//   constructor(private http: HttpClient) {}
//
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(this.apiUrl);
//   }
//
//   markAsRead(notificationId: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from './models/notification.model';
import {NotificationStore} from './notification.store';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'https://my-api.com/notifications';

  constructor(private notificationStore: NotificationStore) {}

  getNotifications(): Observable<Notification[]> {
    const notifications: Notification[] = [
      {
        id: 1,
        message: 'You have a new message',
        timestamp: new Date('2022-05-11T12:00:00Z'),
        read: false
      },
      {
        id: 2,
        message: 'You have a new friend request',
        timestamp: new Date('2022-05-10T12:00:00Z'),
        read: true
      },
      {
        id: 3,
        message: 'You have a new notification',
        timestamp: new Date('2022-05-09T12:00:00Z'),
        read: false
      }
    ];
    return of(notifications);
  }

  markAsRead(notificationId: number): void {
    const notifications = this.notificationStore.notifications.slice();
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
      notifications[notificationIndex].read = true;
      this.notificationStore.notifications = notifications;
    }
  }
}
