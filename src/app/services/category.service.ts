import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Category } from '../models/category.model';
import {
  SHIRT_COLOR_CATEGORIES,
  SHIRT_PATTERN_CATEGORIES,
  PRICE_RANGE_CATEGORIES
} from '../data/categories';

import { MessageService } from './message.service';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

  private model = 'Category';

  constructor(
    private messageService: MessageService
  ) { }

  getShirtColorCategories(): Observable<Category[]> {
    this.messageService.log(`fetched ${this.model}:`, SHIRT_COLOR_CATEGORIES);
    return of(SHIRT_COLOR_CATEGORIES);
  }

  getShirtPatternCategories(): Observable<Category[]> {
    this.messageService.log(`fetched ${this.model}:`, SHIRT_PATTERN_CATEGORIES);
    return of(SHIRT_PATTERN_CATEGORIES);
  }

  getPriceRangeCategories(): Observable<Category[]> {
    this.messageService.log(`fetched ${this.model}:`, PRICE_RANGE_CATEGORIES);
    return of(PRICE_RANGE_CATEGORIES);
  }
}
