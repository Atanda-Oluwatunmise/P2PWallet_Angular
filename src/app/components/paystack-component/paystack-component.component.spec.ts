import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaystackComponentComponent } from './paystack-component.component';

describe('PaystackComponentComponent', () => {
  let component: PaystackComponentComponent;
  let fixture: ComponentFixture<PaystackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaystackComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaystackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
