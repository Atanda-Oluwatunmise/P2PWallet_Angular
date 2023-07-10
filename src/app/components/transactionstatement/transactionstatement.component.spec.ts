import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionstatementComponent } from './transactionstatement.component';

describe('TransactionstatementComponent', () => {
  let component: TransactionstatementComponent;
  let fixture: ComponentFixture<TransactionstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
