import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestClientComponent } from './test-client.component';

describe('TestClientComponent', () => {
  let component: TestClientComponent;
  let fixture: ComponentFixture<TestClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
