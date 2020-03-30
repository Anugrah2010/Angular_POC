import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcureSearchComponent } from './procure-search.component';

describe('ProcureSearchComponent', () => {
  let component: ProcureSearchComponent;
  let fixture: ComponentFixture<ProcureSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcureSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
