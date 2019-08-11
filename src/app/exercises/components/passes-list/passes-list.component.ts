import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Pass } from '../../shared/exercise';
import { DynamicTableComponent } from 'src/app/core/ui';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PassDialogComponent } from '../pass-dialog/pass-dialog.component';

const COLUMNS: any[] = [
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
  @Input() rows: Pass[];
  @ViewChild(DynamicTableComponent) table: DynamicTableComponent;

  columns: any[];

  maxPasses = 4;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.columns = COLUMNS;
  }

  addPass() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(PassDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(val => {
      console.log('Dialog output:', val);

      this.rows.push({
        passProcessType: 'FCAW',
        fillerMaterial: 'E71T-1',
        fillerMaterialDiameter: '3.0mm',
        gasType: 'CO2'
      });
      this.table.dataSource._updateChangeSubscription();
    });
  }
}
