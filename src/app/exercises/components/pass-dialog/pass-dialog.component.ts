import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { FieldConfig } from '../../../core/ui/form/field.interface';
import { PassDialogFieldsConfig } from './pass-dialog.config';

@Component({
  selector: 'app-pass-dialog',
  templateUrl: './pass-dialog.component.html',
  styleUrls: ['./pass-dialog.component.css']
})
export class PassDialogComponent implements OnInit {
  form: FormGroup;

  fieldsConfig: FieldConfig[] = PassDialogFieldsConfig;

  constructor(private dialogRef: MatDialogRef<PassDialogComponent>) {}

  ngOnInit() {}

  save(formData) {
    this.dialogRef.close(formData);
  }

  close() {
    this.dialogRef.close();
  }
}
