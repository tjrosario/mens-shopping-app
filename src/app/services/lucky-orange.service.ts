import { Injectable } from '@angular/core';

declare let _loq: Function;

@Injectable()
export class LuckyOrangeService {

  constructor() { }

  addTag({ customTag, star = false, overwrite = false }) {
  	if (window['_loq']) {
			window['_loq'].push([
				'tag', customTag, star, overwrite
			]);
  	}
  }

}
