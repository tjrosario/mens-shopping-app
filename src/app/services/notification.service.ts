import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

const toastrTypes = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error'
};

const msgTypes = {
  [toastrTypes.success]: 'Success',
  [toastrTypes.warning]: 'Warning',
  [toastrTypes.info]: 'Information',
  [toastrTypes.error]: 'Error'
};

@Injectable()
export class NotificationService {

  constructor(
    public toastr: ToastsManager
  ) {}

  toasts = [];

  success(msg: string, title?) {
    this.notify(toastrTypes.success, msg, title);
  }

  warn(msg: string, title?) {
    this.notify(toastrTypes.warning, msg, title);
  }

  info(msg: string, title?) {
    this.notify(toastrTypes.info, msg, title);
  }

  alert(msg: string, title?) {
    this.notify(toastrTypes.error, msg, title);
  }

  notify(type = toastrTypes.error, msg = 'Something went wrong!', title = '') {
    const toastrTitle = this.getToastrTitle(title, type);

    const toast = this.toastr[type](msg, toastrTitle);
    this.toasts.push(toast);
  }

  getToastrTitle(title, msgType) {
    let toastrTitle = title;

    if (!title) {
      toastrTitle = msgTypes[msgType];
    }

    return toastrTitle;
  }
}
