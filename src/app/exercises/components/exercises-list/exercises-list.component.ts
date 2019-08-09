import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../../shared/exercise';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() rows: Exercise[];
  @Input() columns: any[];

  ngOnInit() {
    this.dataSource.data = this.rows;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(x => x.columnDef);
  }
}
