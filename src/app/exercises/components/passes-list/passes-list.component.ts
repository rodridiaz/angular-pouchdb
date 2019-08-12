import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { PassDialogComponent } from '../pass-dialog/pass-dialog.component';
import { DynamicTableComponent } from '../../../core/ui';
import { Pass } from '../../shared/exercise';
import { take } from 'rxjs/operators';

const COLUMNS_DEFINITION: any[] = [
  {
    columnDef: 'fillerMaterial',
    header: 'Filler material',
    dataName: row => row.fillerMaterial
  },
  {
    columnDef: 'fillerMaterialDiameter',
    header: 'Filler material Diameter',
    dataName: row => row.fillerMaterialDiameter
  },
  {
    columnDef: 'gasType',
    header: 'Gas type',
    dataName: row => row.gasType
  },
  {
    columnDef: 'passProcessType',
    header: 'Pass process',
    dataName: row => row.passProcessType
  }
];

@Component({
  selector: 'app-passes-list',
  templateUrl: './passes-list.component.html',
  styleUrls: ['./passes-list.component.css']
})
export class PassesListComponent implements OnInit {
  @Input() rows$: Observable<Pass[]>;
  @Input() maxPassesAllowed: Number;

  @ViewChild(DynamicTableComponent) table: DynamicTableComponent;

  columns: any[];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.columns = COLUMNS_DEFINITION;
  }

  addPass() {
    if (this.table.dataSource.data.length === this.maxPassesAllowed) {
      this.snackBar.open(
        `Maximum passes allowed: ${this.maxPassesAllowed} 🙏`,
        null,
        {
          duration: 2000
        }
      );
      return;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PassDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((pass: Pass) => {
        if (!pass) {
          return;
        }
        this.table.dataSource.data.push(pass);
        this.table.dataSource._updateChangeSubscription();
      });
  }

  removedElement(data: { index: number; element: any }) {
    this.table.dataSource.data.splice(data.index, 1);
    this.table.dataSource._updateChangeSubscription();
  }
}
