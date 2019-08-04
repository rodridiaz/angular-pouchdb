import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormWizardComponent } from './exercise-form-wizard.component';

describe('ExerciseFormWizardComponent', () => {
  let component: ExerciseFormWizardComponent;
  let fixture: ComponentFixture<ExerciseFormWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseFormWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
