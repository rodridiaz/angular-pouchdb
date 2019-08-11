import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dynamic-table',
  template: `
    <div *ngIf="dataSource.data.length; else empty">
      <table mat-table [dataSource]="dataSource" matSort aria-label="Elements">
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

        <ng-container matColumnDef="actionButtons" *ngIf="showActionButtons">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let element">
            <a
              *ngIf="showEditButton"
              mat-icon-button
              color="primary"
              routerLink="/exercise/{{ element.id }}"
              ><mat-icon>edit</mat-icon></a
            >
            <button
              mat-icon-button
              color="primary"
              (click)="removeElement(element.id)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        *ngIf="showPagination"
        [length]="dataSource.data.length"
        [pageIndex]="0"
        [pageSize]="10"
        [pageSizeOptions]="[10, 20, 50, 100]"
      >
      </mat-paginator>
    </div>
    <ng-template #empty><h3 class="empty-state">Empty</h3></ng-template>
  `,
  styles: [':host table { width: 100%; } .empty-state { text-align: center; }']
})
export class DynamicTableComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() rows: any[];
  @Input() columns: any[];
  @Input() showPagination?: Boolean = false;
  @Input() showActionButtons?: Boolean = false;
  @Input() showEditButton?: Boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource.data = this.rows;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(x => x.columnDef);
    if (this.showActionButtons) this.displayedColumns.push('actionButtons');
  }

  removeElement(id: string) {
    this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
  }
}
