import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { UserNotification } from './models/user-notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NotificationApp';
  userId: string;
  unreadNotifications: UserNotification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // const token = localStorage.getItem('access_token');
    // this.userId = this.jwtHelper.decodeToken(token).sub;
    this.notificationService.startConnection(this.userId);
    this.notificationService.getNewNotification().subscribe((userNotification) => {
      this.unreadNotifications.push(userNotification);
    });
    this.loadUnreadNotifications();
  }

  sendNotification(): void {
    const message = 'This is a test notification!';
    this.notificationService.sendNotification([this.userId], message).subscribe();
  }

  loadUnreadNotifications(): void {
    this.notificationService.getUnreadNotifications(this.userId).subscribe((notifications) => {
      this.unreadNotifications = notifications;
    });
  }

  markNotificationAsRead(userNotification: UserNotification): void {
    this.notificationService.markNotificationAsRead(this.userId, userNotification.notificationId).subscribe(() => {
      const index = this.unreadNotifications.indexOf(userNotification);
      if (index >= 0) {
        this.unreadNotifications.splice(index, 1);
      }
    });
  }
}
