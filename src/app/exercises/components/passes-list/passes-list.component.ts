import { Component, OnInit, Input } from '@angular/core';
import { Pass } from '../../shared/exercise';

const EXAMPLE_COLUMNS: any[] = [
  {
    columnDef: 'fillerMaterial',
    header: 'Filler material',
    dataName: row => `${row.fillerMaterial}`
  },
  {
    columnDef: 'fillerMaterialDiameter',
    header: 'Filler material Diameter',
    dataName: row => `${row.fillerMaterialDiameter}`
  },
  {
    columnDef: 'gasType',
    header: 'Gas type',
    dataName: row => `${row.gasType}`
  },
  {
    columnDef: 'passProcessType',
    header: 'Pass process',
    dataName: row => `${row.passProcessType}`
  }
];

@Component({
  selector: 'app-passes-list',
  templateUrl: './passes-list.component.html',
  styleUrls: ['./passes-list.component.css']
})
export class PassesListComponent implements OnInit {
  @Input() rows: Pass[];
  columns: any[];

  ngOnInit() {
    this.columns = EXAMPLE_COLUMNS;
  }
}
