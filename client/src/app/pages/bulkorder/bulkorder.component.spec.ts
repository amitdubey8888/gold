import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkorderComponent } from './bulkorder.component';

describe('BulkorderComponent', () => {
  let component: BulkorderComponent;
  let fixture: ComponentFixture<BulkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
