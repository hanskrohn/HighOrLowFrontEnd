import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinpageComponent } from './joinpage.component';

describe('JoinpageComponent', () => {
  let component: JoinpageComponent;
  let fixture: ComponentFixture<JoinpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
