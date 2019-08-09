import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dynamic-table',
  template: `
    <div>
      <table
        class="exercise-table"
        mat-table
        [dataSource]="dataSource"
        data.
        matSort
        aria-label="Elements"
      >
        <!-- Column -->
        <ng-container
          *ngFor="let col of columns"
          [matColumnDef]="col.columnDef"
        >
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ col.header | titlecase }}
          </th>
          <td mat-cell *matCellDef="let row">{{ col.dataName(row) }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [length]="dataSource.data.length"
        [pageIndex]="0"
        [pageSize]="10"
        [pageSizeOptions]="[10, 20, 50, 100]"
      >
      </mat-paginator>
    </div>
  `,
  styles: [':host table { width: 100%; }']
})
export class DynamicTableComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() rows: any[];
  @Input() columns: any[];

  ngOnInit() {
    this.dataSource.data = this.rows;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(x => x.columnDef);
  }
}
