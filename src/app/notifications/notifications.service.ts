import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICommand } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messages: Subject<ICommand>;

  constructor() {
    this.messages = new Subject<ICommand>();
  }

  addSuccess(message: string) {
    this.messages.next({
      id: this.randomId(),
      type: 'success',
      text: message,
    });
  }

  addError(message: string) {
    this.messages.next({
      id: this.randomId(),
      type: 'error',
      text: message,
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }

  clearMessage(id: number) {
    this.messages.next({
      id,
      type: 'clear',
    });
  }
}
