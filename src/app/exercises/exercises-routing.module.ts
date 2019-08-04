import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { AddNewExerciseComponent } from './pages/exercise/add-new-exercise/add-new-exercise.component';

const routes: Routes = [
  { path: 'exercises', component: ExercisesComponent },
  { path: 'exercises/add-new', component: AddNewExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
