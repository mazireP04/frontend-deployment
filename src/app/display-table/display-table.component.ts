import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


// TODO: FIX PAGINATION TOO!

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class DisplayTableComponent implements OnInit {

  // TODO: FIX SERVER SIDE PAGINATION!
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  unassignButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;
  // @Input() totalItems!: any;

  constructor(private router: Router, public dialog: MatDialog) { }

  @Input() data!: any[];
  dataSource!: MatTableDataSource<any>;
  @Input() pageSize: any = 5;
  @Input() pageIndex!: any;
  @Input() length: any = 0;
  @Input() pageSizeOptions: number[] = [7, 14];

  @Output() deleteItems: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() unassignItems: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Input() displayedColumns: string[] = [];

  numSelected: number = 0;
  selectedItemIds: string[] = [];

  isSelectAllChecked: boolean = false;
  pageEvent!: PageEvent;

  showFirstLastButtons = "true";

  ngOnInit() {

    // this.dataSource = new MatTableDataSource(this.data);
    this.dataSource = new MatTableDataSource<any>([]);

    // this.selectedItemIds = this.selection.selected.map(item => item.id);
    // this.numSelected = this.selection.selected.length;
    // this.updateButtonStates();


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if(this.paginator){
      this.paginator.length = this.length;
    }

    // this.selection.changed.subscribe(() => {
    //   this.numSelected = this.selection.selected.length;
    //   if (this.numSelected === 0) {
    //     this.disableButtons();
    //   }else{
    //     this.selectedItemIds = this.selection.selected.map(item => item.id);
    //   }
    //   this.updateButtonStates();
    // });
    // this.updateSelectAllCheckboxState();

    this.selection.changed.subscribe(() => {
      this.numSelected = this.selection.selected.length;
      this.updateButtonStates();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {      
      if(this.data){
        this.dataSource = new MatTableDataSource<any>(this.data);

        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;

        this.updateSelectedItems();
        if(this.paginator){
          this.paginator.length = this.length;

        }
      //     this.dataSource.filteredData.forEach(row => {
      //   if (this.selectedItemIds.includes(row.id)) {
      //     this.selection.select(row);
      //   }
      // });
      }
      
    }
    
  }

  updateSelectedItems(){
    this.selection.clear();
    this.selectedItemIds.forEach(itemId => {
      const selected = this.dataSource.data.find(item => item.id === itemId);
      if(selected){
        this.selection.select(selected);
      }
    });
  }
  
  disableButtons() {
    // Disable buttons
    this.deleteButtonDisabled = true;
    this.unassignButtonDisabled = true;
  }

  // TODO: CHECK THIS!
  updateData(data: any[], pageIndex: number) {
    if (this.dataSource) {
      this.dataSource.data = data;
      
      if (this.paginator) {
        this.paginator.length = data.length;
        // this.selectedItemIds = this.selection.selected.map(item => item.id);

  }
    }
  }

  // TODO: CHECK THIS OUT
  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;

    // this.dataSource.filteredData.forEach(row => {
    //   if (this.selectedItemIds.includes(row.id)) {
    //     this.selection.select(row);
    //   } else {
    //     this.selection.deselect(row);
    //   }
    // });

    this.pageChanged.emit(event);

  }

  routeToForm() {
    this.router.navigate(['/add-inventory']);
  }

  applyFilter(event: Event, filterType: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    switch (filterType) {
      // case 'general':
      //   this.dataSource.filter = filterValue;
      //   break;


      case 'assignedTo':
        this.dataSource.filterPredicate = (data, filter) => {
          return data.assignedTo.trim().toLowerCase().includes(filter);
        };
        this.dataSource.filter = filterValue;
        break;

      case 'status':
        this.dataSource.filterPredicate = (data, filter) => {
          return data.status.trim().toLowerCase().includes(filter);
        };
        this.dataSource.filter = filterValue;
        break;

      default:
        break;
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToResourceAssignment() {
    this.router.navigate(['/resource-assignment'])
  }

  //TODO SR NUMBER?
  actualColumns: string[] = [
    'select',
    'ID',
    'Category',
    'Sub-Category',
    'Model Name',
    'Model Memory',
    'Warranty',
    'Screen Size',
    'Price',
    'Assigned To',
    'Status',

  ];


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // this.numSelected = this.selection.selected.length;
    const numSelected = this.selection.selected.length;

    const numRows = this.dataSource.data.length;
    console.log("is all selected: ", this.numSelected === numRows);
    
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      // this.numSelected = 0;

      console.log("all toggled");
      
      // return;
    }
    else{
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    // this.selection.select(...this.dataSource.data);
  }


  updateButtonStates() {
    this.deleteButtonDisabled = this.selection.selected.length === 0;
    this.unassignButtonDisabled = this.selection.selected.length === 0;
  }
  

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  // unassign item: 
  unassign() {
    const itemsToBeUnassigned: string[] = this.selection.selected.map(item => item.id);
    this.openDialog('Unassign', itemsToBeUnassigned);

  }

  updateSelectAllCheckboxState() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.isSelectAllChecked = numSelected === numRows;
  }

  // REMOVE DATA:
  removeData() {
    const itemsToBeDeleted: string[] = this.selection.selected.map(item => item.id);
    // this.selection.selected.forEach(item => {
    //   itemsToBeDeleted.push(item.id);
    // });
    this.openDialog('Delete', itemsToBeDeleted);
    // display the dialog box
    // if yes clicked on dialog box, trigger another function wherein the selected id are sent to parent and there te isDeleted property is set to true
  }

  openDialog(action: string, selectedItemIDs: string[], enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { action, items: selectedItemIDs },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        if (action === 'Delete') {
          console.log("Sent for deletion");

          this.deleteItems.emit(selectedItemIDs);
        }
        else if (action === 'Unassign') {
          console.log("Sent for unassignation");
          this.unassignItems.emit(selectedItemIDs);
        }

      }
    });
  }

}


@Component({
  selector: 'dialog',
  template: `
  <h2 mat-dialog-title>{{data.action}}</h2>
<mat-dialog-content >
  Would you like to {{ data.action.toLowerCase() }}  
  <ul>
  @for(item of data.items; track item){
    <li>{{item}}</li>
  }
</ul>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close (click)="dialogRef.close()">No</button>
  <button mat-button mat-dialog-close cdkFocusInitial (click)="ok()" >Ok</button>
</mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class Dialog {

  constructor(public dialogRef: MatDialogRef<DisplayTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ok() {
    this.dialogRef.close("OK");
  }
}
