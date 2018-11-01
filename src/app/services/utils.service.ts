import { Injectable, Inject } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Meta } from '@angular/platform-browser';

import * as _ from 'lodash';

import { MessageService } from './message.service';
import { NotificationService } from './notification.service';
import { CREDIT_CARDS } from '../data/credit-cards';
import { ERROR_CODES } from '../resources/error-codes';
import { Globals } from '../config/globals';
import { environment } from '../../environments/environment';

@Injectable()
export class UtilsService {

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService,
    private globals: Globals,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any
  ) { }

  debug = environment.debug;

  extractData(res: Response | any, modelName, opts?) {
    opts = opts || {};
    const returnData = opts.returnData || null;
    const checkNode = opts.checkNode || res.success;

    if (!checkNode) {
      let msg = opts.errorMsg || res.message || `Error: fetched ${modelName} failed`;

      if (res['code']) {
        msg = ERROR_CODES[res['code']] || ERROR_CODES['000'];
      }
      
      this.messageService.error(msg, res);
      this.notificationService.alert(msg);
      // return Observable.throw(new Error(msg));
      return null;
    }

    this.messageService.log(`fetched ${modelName}:`, res);
    return returnData ? returnData : (res.data || {});
  }

  handleErrorObservable(error: Response | any, modelName, opts?) {
    opts = opts || {};
    let theError = error.error || error;;
    let msg;

    if (opts.errorMsg) {
      msg = opts.errorMsg;
    } else {
      msg = theError.message || `Error: fetched ${modelName} failed`;
    }

    let alertType = 'alert';

    if (theError['code']) {
      msg = ERROR_CODES[theError['code']] || ERROR_CODES['000'];

      if (theError['code'] === 999) {
        alertType = 'warn';
      }
    }

    if (this.debug) {
      this.messageService.error(msg, error);
    }

    if (opts.showAlert) {
      this.notificationService[alertType](msg);
    }
    
    return Observable.throw(msg);
  }

  setMetaTags(tags = []) {
    const defaultTags = this.globals.meta;

    this.metaService.addTags(defaultTags);

    for (let i in tags) {
      const tag = tags[i];

      if (tag['name']) {
        this.metaService.updateTag({
          content: tag.content
        },
         `name="${tag.name}"`
        );
      } else if (tag['property']) {
        this.metaService.updateTag({
          content: tag.content
        },
         `property="${tag.property}"`
        );
      }
    }
  }

  sortAlphabetically(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  }

  sortByDateCreated(a, b) {
    return +new Date(b.dateCreated) - +new Date(a.dateCreated);
  }

  sortByKey(data, key) {
    return _.sortBy(data, item => item[key]);
  }

  deDuplicate(list, key) {
    return _.uniqBy(list, key);
  }

  priceToText(price) {
    if (price.lowerLimit <= 0.01) {
      return `$${parseInt(price.upperLimit, 10)} and Under`;
    } else if (price.upperLimit > 900) {
      return `$${price.lowerLimit} and Over`;
    } else {
      return `$${parseInt(price.upperLimit, 10)} and Under`;
    }
  }

  sortSizes(sizes) {
    return _.sortBy(sizes, size => {
      const rank = {
        XS: 1,
        S: 2,
        M: 3,
        L: 4,
        XL: 5,
        XXL: 6,
        XXXL: 7
      };

      return rank[size.value];
    });
  }

  sortFits(fits) {
    return _.sortBy(fits, fit => {
      const rank = {
        Slim: 1,
        Regular: 2,
        Relaxed: 3
      };

      return rank[fit.value];
    });
  }

  /**
   * Adds time to a date. Modelled after MySQL DATE_ADD function.
   * Example: dateAdd(new Date(), 'minutes', 30)  //returns 30 minutes from now.
   *
   * @param date  Date to start with
   * @param interval  One of: year, quarter, month, week, day, hour, minute, second
   * @param units  Number of units of the given interval to add.
   */
  dateAdd(date, interval, units) {
    let ret = new Date(date); // don't change original date
    const checkRollover = () => {
      if (ret.getDate() !== date.getDate()) {
        ret.setDate(0);
      }
    };

    switch (interval.toLowerCase()) {
      case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover();  break;
      case 'month':  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week':  ret.setDate(ret.getDate() + 7 * units);  break;
      case 'day':  ret.setDate(ret.getDate() + units);  break;
      case 'hour':  ret.setTime(ret.getTime() + units * 3600000);  break;
      case 'minute':  ret.setTime(ret.getTime() + units * 60000);  break;
      case 'second':  ret.setTime(ret.getTime() + units * 1000);  break;
      default :  ret = undefined;  break;
    }

    return ret;
  }

  getFormattedDate(date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  getGreeting(hour) {
    const data = [
      [0, 4, 'Good evening'],
      [5, 11, 'Good morning'],
      [12, 17, 'Good afternoon'],
      [18, 24, 'Good evening']
    ];

    let i = 0;

    while (i < data.length) {
      if (hour >= data[i][0] && hour <= data[i][1]) {
        return data[i][2];
      }
      i++;
    }
  }

  getCreditCardType(cur_val) {
    let sel_brand;

    // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
    // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also

    // JCB
    const jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); // 2131, 1800, 35 (3528-3589)
    // American Express
    const amex_regex = new RegExp('^3[47][0-9]{0,}$'); // 34, 37
    // Diners Club
    const diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); // 300-305, 309, 36, 38-39
    // Visa
    const visa_regex = new RegExp('^4[0-9]{0,}$'); // 4
    // MasterCard
    const mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); // 2221-2720, 51-55
    const maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); // always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
    // Discover
    const discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');
    // 6011, 622126-622925, 644-649, 65


    // get rid of anything but numbers
    cur_val = cur_val.replace(/\D/g, '');

    // checks per each, as their could be multiple hits
    // fix: ordering matter in detection, otherwise can give false results in rare cases
    if (cur_val.match(jcb_regex)) {
      sel_brand = 'jcb';
    } else if (cur_val.match(amex_regex)) {
      sel_brand = 'amex';
    } else if (cur_val.match(diners_regex)) {
      sel_brand = 'diners_club';
    } else if (cur_val.match(visa_regex)) {
      sel_brand = 'visa';
    } else if (cur_val.match(mastercard_regex)) {
      sel_brand = 'mastercard';
    } else if (cur_val.match(discover_regex)) {
      sel_brand = 'discover';
    } else if (cur_val.match(maestro_regex)) {
      if (cur_val[0] === '5') { // started 5 must be mastercard
        sel_brand = 'mastercard';
      } else {
        sel_brand = 'maestro'; // maestro is all 60-69 which is not something else, thats why this condition in the end
      }
    } else {
      sel_brand = 'unknown';
    }

    return sel_brand;
  }

  getCreditCardData(cardData) {
    const data = {};
    data['card'] = _.cloneDeep(cardData);

    if (data['card']['exp_month'] && data['card']['exp_year']) {
      data['card']['expirationDate'] = `${data['card']['exp_month']}/${data['card']['exp_year']}`;
    } else {
      data['card']['expirationDate'] = '';
    }

    return data;
  }

  getNewCreditCardData(cardData) {
    const data = {};
    data['card'] = _.cloneDeep(cardData);

    const split = data['card']['expirationDate'].split('/');
    data['card']['exp_month'] = split[0].trim();
    data['card']['exp_year'] = split[1].trim();

    delete data['card']['expirationDate'];
    delete data['card']['isDefault'];
    delete data['card']['card'];

    return data;
  }

  getCreditCardLogo(brand) {
    return _.find(CREDIT_CARDS, { brand }).id;
  }

  isBrowser() {
    return typeof window !== 'undefined';
  }

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const string_length = 7;
    let randomstring = '';
    let charCount = 0;
    let numCount = 0;

    for (let i = 0; i < string_length; i++) {
      // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
      if ((Math.floor(Math.random() * 2) === 0) && numCount < 3 || charCount >= 5) {
        var rnum = Math.floor(Math.random() * 10);
        randomstring += rnum;
        numCount += 1;
      } else {
        // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
        charCount += 1;
      }
    }

    return randomstring;   
  }

  getStripePlanFrequency(frequency) {
    const plans = {
      1: 'monthly',
      2: 'bimonthly',
      3: 'quarterly'
    };

    return plans[frequency];
  }

  getStripePlan(frequency, budget) {
    const frequencyPlan = this.getStripePlanFrequency(frequency);
    budget = parseFloat(budget);

    return `${frequencyPlan}_${budget}`;  
  }

  rfcFormat(dateString, inWithSecs) {
    let outString, theAP, theDate, theHours, theMins, theMonth, tmpDate, withSecs;

    if (!dateString) {
      return '';
    }

    if (dateString.match(/31 Dec 1969/)) {
      return '';
    }

    withSecs = inWithSecs || false;
    tmpDate = new Date(dateString);
    theHours = tmpDate.getHours();
    theAP = void 0;

    if (theHours > 12 || theHours === 12) {
      theAP = 'PM';
      theHours = theHours - 12;
    } else {
      theAP = 'AM';
    }

    if (theHours === 0) {
      theHours = 12;
    }

    theMins = (tmpDate.getMinutes() < 10 ? '0' : '') + tmpDate.getMinutes();

    if (withSecs) {
      theMins += `:${tmpDate.getSeconds() < 10 ? '0' : ''}${tmpDate.getSeconds()}`;
    }

    theDate = (tmpDate.getDate() < 10 ? '0' : '') + tmpDate.getDate();
    theMonth = tmpDate.getMonth() + 1;
    outString = `${theMonth < 10 ? '0' + theMonth : theMonth}/${theDate}/${tmpDate.getFullYear()} ${theHours}:${theMins} ${theAP}`;

    return outString;
  }

  getFormattedInterval(plan) {
    const intervalLength = plan['plan_interval_length']['_'];
    const intervalUnit = plan['plan_interval_unit'];
    const frequencyCode = `${intervalLength}_${intervalUnit}`;

    const monthMap = {
      '1': 'Monthly',
      '2': 'Bimonthly',
      '3': 'Quarterly'
    };

    const weekMap = {
      '1': 'Weekly',
      '2': 'Biweekly',
      '3': 'Triweekly'
    };

    let length = parseInt(intervalLength, 10);
    let result;

    if (intervalUnit === 'days') {
      const numWeeks = length / 7;
      const unit = numWeeks === 1 ? 'week' : 'weeks';

      const interval = weekMap[numWeeks];
      const definition = `${numWeeks} ${unit}`;
      const displayString = numWeeks === 1 ? 'Weekly' : `${interval} (Every ${definition})`;

      result = {
        interval,
        definition,
        displayString,
        frequencyCode
      };
    } else if (intervalUnit === 'months') {
      const unit = length === 1 ? 'month' : 'months';

      const interval = monthMap[length];
      const definition = `${intervalLength} ${unit}`;
      const displayString = length === 1 ? 'Monthly' : `${interval} (Every ${definition})`;

      result = {
        interval,
        definition,
        displayString,
        frequencyCode
      };
    }

    return result;
  }
}
