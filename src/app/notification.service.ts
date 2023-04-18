// src/app/services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { UserNotification } from './models/user-notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection: signalR.HubConnection;
  private newNotification = new Subject<UserNotification>();
  private apiUrl = 'https://your-api-url/api/notification';

  constructor(private http: HttpClient) {}

  public startConnection(userId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/notificationHub', { accessTokenFactory: () => userId })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.registerNotificationEvents();
      })
      .catch((err) => console.error('Error starting connection: ' + err));
  }

  public sendNotification(userIds: string[], message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, { userIds, message });
  }

  public getUnreadNotifications(userId: string): Observable<UserNotification[]> {
    return this.http.get<UserNotification[]>(`${this.apiUrl}/unread/${userId}`);
  }

  public markNotificationAsRead(userId: string, notificationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/markAsRead/${userId}/${notificationId}`, {});
  }

  public getNewNotification(): Observable<UserNotification> {
    return this.newNotification.asObservable();
  }

  private registerNotificationEvents(): void {
    this.hubConnection.on('ReceiveNotification', (userNotification: UserNotification) => {
      this.newNotification.next(userNotification);
    });
  }
}
