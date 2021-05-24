import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallactionComponent } from './callaction.component';

describe('CallactionComponent', () => {
  let component: CallactionComponent;
  let fixture: ComponentFixture<CallactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
