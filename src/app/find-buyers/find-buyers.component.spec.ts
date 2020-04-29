import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBuyersComponent } from './find-buyers.component';

describe('FindBuyersComponent', () => {
  let component: FindBuyersComponent;
  let fixture: ComponentFixture<FindBuyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBuyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
