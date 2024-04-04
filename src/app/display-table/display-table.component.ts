import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


// TODO: FIX PAGINATION TOO!

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss'
})
export class DisplayTableComponent implements OnInit{

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private router: Router, public dialog: MatDialog){}
  
  @Input() data!: any[];
  dataSource!: MatTableDataSource<any> ;
  @Input() pageSize!: any[];

  // @Input() totalItems: number = 0;
  // @Input() pageLength: number = 10; 

  @Output() deleteItems: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() unassignItems: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  @Input() pageSizeOptions: number[] = [];
  @Input() displayedColumns: string[] = [];

  ngOnInit(){
    this.dataSource =  new MatTableDataSource(this.data);

    // console.log(this.paginator);
    
    if(!this.pageSize){
      this.pageSize = [5, 10, 50];
    }
    // this.paginator.pageSizeOptions = this.pageSize;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(){
    if(this.dataSource){
    this.dataSource.paginator = this.paginator;
    }

    // TODO: CHECK THIS
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
  }

  // TODO: CHECK THIS!
  updateData(data: any[]) {
    if (this.dataSource) {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }
  }

  // TODO: CHECK THIS OUT
  onPageChanged(event: any): void {
    // Emit the page number to the parent component
    this.pageChanged.emit(event);
  }

  routeToForm(){
    this.router.navigate(['/add-inventory']);
  }

  applyFilter(event: Event, filterType: string){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    switch (filterType){
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
    
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  routeToResourceAssignment(){
    this.router.navigate(['/resource-assignment'])
  }

  //TODO SR NUMBER?
  actualColumns: string [] = [
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

  numSelected!: any;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    this.numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return this.numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  // unassign item: 
  unassign(){
    const itemsToBeUnassigned: string[] = [];
    this.selection.selected.forEach(item => {
      itemsToBeUnassigned.push(item.id);
    });
    this.openDialog('Unassign', itemsToBeUnassigned);

  }



  // REMOVE DATA:
  removeData(){
    const itemsToBeDeleted: string[] = [];
    this.selection.selected.forEach(item => {
      itemsToBeDeleted.push(item.id);
    });
    this.openDialog('Delete', itemsToBeDeleted);
    // display the dialog box
    // if yes clicked on dialog box, trigger another function wherein the selected id are sent to parent and there te isDeleted property is set to true
  }
  
  openDialog(action: string, selectedItemIDs: string[], enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
   const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {action, items: selectedItemIDs},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'OK'){
        if(action === 'Delete'){
          console.log("Sent for deletion");
          
          this.deleteItems.emit(selectedItemIDs);
        }
        else if(action === 'Unassign'){
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
  // public action!: string;

  constructor(public dialogRef: MatDialogRef<DisplayTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ok(){
    this.dialogRef.close("OK");
  }
}
