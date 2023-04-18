import {User} from './user.model';
import {Notification} from './notification.model';

export interface UserNotification {
  userId: string;
  user: User;
  notificationId: number;
  notification: Notification;
  isRead: boolean;
}
