import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './table.component.html',
  styles: [':host table { width: 100%; } .empty-state { text-align: center; }']
})
export class DynamicTableComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() rows$: Observable<any[]>;
  @Input() columns: any[];
  @Input() showPagination?: Boolean = false;
  @Input() showActionButtons?: Boolean = false;
  @Input() showEditButton?: Boolean = true;

  @Output() removedElement?: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.rows$.subscribe(response => (this.dataSource.data = response));
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(x => x.columnDef);
    if (this.showActionButtons) this.displayedColumns.push('actionButtons');
  }

  removeElement(index: number, element: any) {
    this.removedElement.emit({ index, element });
  }
}
