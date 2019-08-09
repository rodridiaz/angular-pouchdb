import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseWizardComponent } from './exercise-wizard.component';

describe('ExerciseWizardComponent', () => {
  let component: ExerciseWizardComponent;
  let fixture: ComponentFixture<ExerciseWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
