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
    path: 'exercise/add-new',
    component: AddNewComponent,
    data: { title: 'Add new exercise' }
  },
  {
    path: 'exercise',
    component: ExerciseComponent,
    data: {
      title: 'Exercise Details'
    },
    children: [
      { path: '', redirectTo: '/exercises', pathMatch: 'full' },
      {
        path: ':id',
        component: ExerciseComponent,
        data: { title: 'Edit Exercise' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {}
