import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule} from '@angular/material';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseFormWizardComponent } from './components/exercise-form-wizard/exercise-form-wizard.component';
import { AddNewExerciseComponent } from './pages/exercise/add-new-exercise/add-new-exercise.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    ExercisesComponent,
    ExercisesListComponent,
    ExerciseFormWizardComponent,
    AddNewExerciseComponent
  ]
})
export class ExercisesModule { }
