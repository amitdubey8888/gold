import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunescapeComponent } from './runescape.component';

describe('RunescapeComponent', () => {
  let component: RunescapeComponent;
  let fixture: ComponentFixture<RunescapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunescapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunescapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
