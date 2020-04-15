import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcureUpdateEntryModalComponent } from './procure-update-entry-modal.component';

describe('ProcureUpdateEntryModalComponent', () => {
  let component: ProcureUpdateEntryModalComponent;
  let fixture: ComponentFixture<ProcureUpdateEntryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcureUpdateEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcureUpdateEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
