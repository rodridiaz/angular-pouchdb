import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassesListComponent } from './passes-list.component';

describe('PassesListComponent', () => {
  let component: PassesListComponent;
  let fixture: ComponentFixture<PassesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PassesListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
