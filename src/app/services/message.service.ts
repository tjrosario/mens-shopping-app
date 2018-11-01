import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class MessageService {

  constructor() { }

  debug = environment.debug;

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  log(message: string, res: Response | any) {
    this.add(message);

    if (this.debug) {
      console.log(message, res.data || res);
    }
  }

  error(message: string, res: Response | any) {
    this.add(message);

    if (this.debug) {
     console.error(message, res || {});
    }
  }
}
