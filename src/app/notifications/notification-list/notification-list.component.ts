import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Observable } from 'rxjs';
import { ICommand } from '../notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  notification$: Observable<ICommand[]>;
  constructor(private ns: NotificationsService) {}

  ngOnInit(): void {
    this.notification$ = this.ns.messagesOutput;
  }
  clearMessage(id: number) {
    this.ns.clearMessage(id);
  }
}
