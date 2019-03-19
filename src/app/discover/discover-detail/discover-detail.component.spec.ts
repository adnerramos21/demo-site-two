import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverDetailComponent } from './discover-detail.component';

describe('DiscoverDetailComponent', () => {
  let component: DiscoverDetailComponent;
  let fixture: ComponentFixture<DiscoverDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
