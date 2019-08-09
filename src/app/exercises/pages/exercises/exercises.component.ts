import { Component, OnInit } from '@angular/core';

import { Exercise } from '../../shared/exercise';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Exercise[] = [
  { id: 1, name: 'Hydrogen', minScore: 50, creationDate: '12/08/2019' },
  { id: 2, name: 'Helium', minScore: 50, creationDate: '13/08/2019' },
  { id: 3, name: 'Lithium', minScore: 50, creationDate: '14/08/2019' },
  { id: 4, name: 'Beryllium', minScore: 10, creationDate: '15/08/2019' },
  { id: 5, name: 'Boron', minScore: 50, creationDate: '16/08/2019' },
  { id: 6, name: 'Carbon', minScore: 50, creationDate: '12/08/2019' },
  { id: 7, name: 'Nitrogen', minScore: 50, creationDate: '12/08/2019' },
  { id: 8, name: 'Oxygen', minScore: 50, creationDate: '12/08/2019' },
  { id: 9, name: 'Fluorine', minScore: 50, creationDate: '12/08/2019' },
  { id: 10, name: 'Neon', minScore: 50, creationDate: '12/08/2019' },
  { id: 11, name: 'Sodium', minScore: 50, creationDate: '12/08/2019' },
  { id: 12, name: 'Magnesium', minScore: 50, creationDate: '12/08/2019' },
  { id: 13, name: 'Aluminum', minScore: 50, creationDate: '12/08/2019' },
  { id: 14, name: 'Silicon', minScore: 50, creationDate: '12/08/2019' },
  { id: 15, name: 'Phosphorus', minScore: 50, creationDate: '12/08/2019' },
  { id: 16, name: 'Sulfur', minScore: 50, creationDate: '21/08/2019' },
  { id: 17, name: 'Chlorine', minScore: 50, creationDate: '23/08/2019' },
  { id: 18, name: 'Argon', minScore: 50, creationDate: '15/08/2019' },
  { id: 19, name: 'Potassium', minScore: 50, creationDate: '12/08/2019' },
  { id: 20, name: 'Calcium', minScore: 50, creationDate: '12/08/2019' }
];

const EXAMPLE_COLUMNS: any[] = [
  { columnDef: 'name', header: 'name', dataName: row => `${row.name}` },
  {
    columnDef: 'minScore',
    header: 'minimum score',
    dataName: row => `${row.minScore}`
  },
  {
    columnDef: 'creationDate',
    header: 'creation date',
    dataName: row => `${row.creationDate}`
  }
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  rows: Exercise[] = [];
  columns: any[] = [];

  constructor() {}

  ngOnInit() {
    this.rows = EXAMPLE_DATA;
    this.columns = EXAMPLE_COLUMNS;
  }
}
