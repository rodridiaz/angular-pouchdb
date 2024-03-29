import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { ExercisesRoutingModule } from './exercises-routing.module';
import {
  DynamicFormComponent,
  ButtonComponent,
  DynamicFieldDirective,
  InputComponent,
  SelectComponent,
  DynamicFormWizardComponent,
  DynamicTableComponent
} from '../core/ui';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExerciseWizardComponent } from './components/exercise-wizard/exercise-wizard.component';
import { AddNewComponent } from './pages/exercise/add-new/add-new.component';
import { PassesListComponent } from './components/passes-list/passes-list.component';
import { PassDialogComponent } from './components/pass-dialog/pass-dialog.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormWizardComponent,
    DynamicFieldDirective,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    DynamicTableComponent,
    ExercisesComponent,
    ExercisesListComponent,
    ExerciseComponent,
    ExerciseDetailsComponent,
    ExerciseWizardComponent,
    AddNewComponent,
    PassesListComponent,
    PassDialogComponent,
    PageNotFoundComponent
  ],
  entryComponents: [
    ButtonComponent,
    InputComponent,
    SelectComponent,
    PassDialogComponent
  ]
})
export class ExercisesModule {}
