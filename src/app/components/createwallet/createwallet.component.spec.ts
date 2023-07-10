import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatewalletComponent } from './createwallet.component';

describe('CreatewalletComponent', () => {
  let component: CreatewalletComponent;
  let fixture: ComponentFixture<CreatewalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatewalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatewalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
