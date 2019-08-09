import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { AddNewComponent } from './pages/exercise/add-new/add-new.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';

const routes: Routes = [
  {
    path: 'exercises',
    component: ExercisesComponent,
    data: {
      title: 'Exercises'
    }
  },
  {
    path: 'exercises/add-new',
    component: AddNewComponent,
    data: {
      title: 'Add new exercise'
    }
  },
  {
    path: 'exercise',
    component: ExerciseComponent,
    data: {
      title: 'Exercise Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {}
