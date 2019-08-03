
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesListComponent } from './exercises-list.component';

describe('ExercisesComponent', () => {
  let component: ExercisesListComponent;
  let fixture: ComponentFixture<ExercisesListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
