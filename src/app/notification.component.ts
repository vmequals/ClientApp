// import { Component, OnInit } from '@angular/core';
// import { Notification } from './models/notification.model';
// import { NotificationService} from './notification.service';
// import { NotificationStore } from './notification.store';
//
// @Component({
//   selector: 'app-notification',
//   templateUrl: './notification.component.html',
//   styleUrls: ['./notification.component.css']
// })
// export class NotificationComponent implements OnInit {
//   notifications: Notification[];
//   unreadCount: number;
//
//   constructor(
//     private notificationService: NotificationService,
//     private notificationStore: NotificationStore
//   ) { }
//
//   ngOnInit(): void {
//     this.notificationService.getNotifications().subscribe(response => {
//       const notifications = response.map(obj => new Notification(obj.id, obj.message, obj.timestamp, obj.read));
//       this.notificationStore.notifications = notifications;
//       this.notifications = this.notificationStore.notifications;
//       this.unreadCount = this.notifications.filter(n => !n.read).length;
//     });
//   }
//
//   markAsRead(notificationId: number): void {
//     this.notificationStore.markAsRead(notificationId);
//     this.notifications = this.notificationStore.notifications;
//     this.unreadCount = this.notifications.filter(n => !n.read).length;
//   }
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifications = [
    { id: 1, text: 'New comment on your post', read: false },
    { id: 2, text: 'Someone liked your comment', read: true },
    { id: 3, text: 'Friend request accepted', read: false }
  ];

  readNotification(notification: any): void {
    notification.read = true;
  }
}
