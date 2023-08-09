import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycverificationComponent } from './kycverification.component';

describe('KycverificationComponent', () => {
  let component: KycverificationComponent;
  let fixture: ComponentFixture<KycverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycverificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
