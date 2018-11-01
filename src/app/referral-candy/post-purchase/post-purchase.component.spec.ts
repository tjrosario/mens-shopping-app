import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPurchaseComponent } from './post-purchase.component';

describe('PostPurchaseComponent', () => {
  let component: PostPurchaseComponent;
  let fixture: ComponentFixture<PostPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
