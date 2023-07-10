import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadstatementComponent } from './downloadstatement.component';

describe('DownloadstatementComponent', () => {
  let component: DownloadstatementComponent;
  let fixture: ComponentFixture<DownloadstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
