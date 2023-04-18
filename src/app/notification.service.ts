// src/app/services/notification.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { UserNotification } from './models/user-notification.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection: signalR.HubConnection;
  private newNotification = new Subject<UserNotification>();
  private apiUrl = 'https://your-api-url/api/notification';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public startConnection(): void {
    const token = localStorage.getItem('access_token');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/notificationHub', { accessTokenFactory: () => token })
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
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(`${this.apiUrl}/send`, { userIds, message }, httpOptions);
  }

  public getUnreadNotifications(): Observable<UserNotification[]> {
    const token = localStorage.getItem('access_token');
    const userId = this.jwtHelper.decodeToken(token).sub;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<UserNotification[]>(`${this.apiUrl}/unread/${userId}`, httpOptions);
  }

  public markNotificationAsRead(notificationId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const userId = this.jwtHelper.decodeToken(token).sub;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put(`${this.apiUrl}/markAsRead/${userId}/${notificationId}`, {}, httpOptions);
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
