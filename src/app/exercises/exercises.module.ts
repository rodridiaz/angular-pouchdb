import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule } from '@angular/material';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';

@NgModule({
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ],
  declarations: [
    ExercisesComponent,
    ExercisesListComponent
  ]
})
export class ExercisesModule { }
