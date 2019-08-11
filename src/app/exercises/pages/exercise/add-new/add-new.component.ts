import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import {
  StepConfig,
  FieldConfig
} from '../../../../core/ui/form/field.interface';
import { ExerciseDetail } from '../../../shared/exercise';
import { ExerciseService } from '../../../shared/exercise.service';
import { AddNewFieldsConfig, AddNewStepsConfig } from './add-new.config';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  fieldsConfig: FieldConfig[] = [];
  stepsConfig: StepConfig[] = [];

  constructor(
    private service: ExerciseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fieldsConfig = AddNewFieldsConfig;
    this.stepsConfig = AddNewStepsConfig;
  }

  submit(value: ExerciseDetail) {
    this.service.addExercise(value).subscribe((res: any) => {
      if (res.ok) {
        this.snackBar
          .open('Exercise created 🙂', 'Add more passes', {
            duration: 4000
          })
          .onAction()
          .subscribe(() => this.router.navigate([`/exercise/${res.id}`]));
      } else {
        this.snackBar.open('Failed to create 😕', null, {
          duration: 2000
        });
      }
    });
  }
}
