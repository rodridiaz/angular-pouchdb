import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { AddNewComponent } from './pages/exercise/add-new/add-new.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';

const routes: Routes = [
  { path: 'exercises', component: ExercisesComponent },
  { path: 'exercises/add-new', component: AddNewComponent },
  { path: 'exercise', component: ExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
