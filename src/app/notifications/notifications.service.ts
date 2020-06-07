import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ICommand } from './notification.model';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<ICommand>;
  messagesOutput: Observable<ICommand[]>;

  constructor() {
    this.messagesInput = new Subject<ICommand>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: ICommand[], value: ICommand) => {
        if (value.type === 'clear') {
          return acc.filter((c) => c.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      type: 'success',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      type: 'error',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }
}
