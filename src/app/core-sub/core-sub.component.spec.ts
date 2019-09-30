import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSubComponent } from './core-sub.component';

describe('CoreSubComponent', () => {
  let component: CoreSubComponent;
  let fixture: ComponentFixture<CoreSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
