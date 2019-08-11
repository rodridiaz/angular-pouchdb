import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesComponent } from './pages/exercises/exercises.component';
import { AddNewComponent } from './pages/exercise/add-new/add-new.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExerciseDetailResolverService } from './pages/exercise/exercise-detail-resolver.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

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
    path: 'exercise/:id',
    component: ExerciseComponent,
    resolve: {
      exerciseDetail: ExerciseDetailResolverService
    },
    data: { title: 'Edit Exercise' }
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: { title: 'Error 404' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {}
