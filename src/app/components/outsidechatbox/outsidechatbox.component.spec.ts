import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidechatboxComponent } from './outsidechatbox.component';

describe('OutsidechatboxComponent', () => {
  let component: OutsidechatboxComponent;
  let fixture: ComponentFixture<OutsidechatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsidechatboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsidechatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
