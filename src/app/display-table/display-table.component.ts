
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


@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom
  // encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.Emulated
})
export class DisplayTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<any>(true, []);
  unassignButtonDisabled: boolean = true;
  deleteButtonDisabled: boolean = true;
  dataSource!: MatTableDataSource<any>;

  @Input() data!: any[];
  @Input() pageSize: any = 5;
  @Input() pageIndex!: any;
  @Input() length: any = 0;
  @Input() pageSizeOptions: number[] = [7, 14];

  @Output() deleteItems: EventEmitter<Set<string>> = new EventEmitter<Set<string>>();
  @Output() unassignItems: EventEmitter<Set<string>> = new EventEmitter<Set<string>>();
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() updateSelectedItems: EventEmitter<any> = new EventEmitter<any>();

  @Input() displayedColumns: string[] = [];
  @Input() selectedItemIds:Set<string> = new Set<string>();

  numSelected: number = 0;

  isSelectAllChecked: boolean = false;
  pageEvent!: PageEvent;

  itemsToBeReselected: Set<string> = new Set(); // = this.selectedItemIds;

  showFirstLastButtons = "true";

  selected = "all";
  label = "All"

  constructor(private router: Router, public dialog: MatDialog) { 
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit() {

    this.selection = new SelectionModel<any>(true, []);
    this.dataSource = new MatTableDataSource<any>([]);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.selection.changed.subscribe(() => {
      this.numSelected = this.selection.selected.length;

      // if(this.selectedItemIds){
      //     this.itemsToBeReselected = this.selectedItemIds;
      // }
      this.selectedItemIds = new Set(this.selection.selected.map(item => item.id));
      console.log("Selected item IDs:", this.selectedItemIds, "itemstobereselected: ", this.itemsToBeReselected);
      this.updateButtonStates();
      this.updateSelectedItems.emit(this.selectedItemIds); 

    });
  }


  ngOnChanges(changes: SimpleChanges) {
    
    console.log("on changes MODEL: ", this.selection.selected);
    console.log("TO BE RESELECTED: ", this.itemsToBeReselected);


    if (changes['data']) {      

      if(this.data){     

        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;
        
        if(this.paginator){
          this.paginator.length = this.length;
        }
      } 
    }
  }

  disableButtons() {
    // Disable buttons
    this.deleteButtonDisabled = true;
    this.unassignButtonDisabled = true;
  }

  showOptions(){
    const optionsList = document.getElementById("options") as HTMLElement;
    if(optionsList.style.display == "flex"){
      optionsList.style.display = "none"
    }
    else{
      optionsList.style.display = "flex"
    }
  }

  selectOption(select: string, label: string){
    this.showOptions();
    this.selected = select;
    this.label = label;
  }

  // TODO: CHECK THIS!
  updateData(data: any[], pageIndex: number) {

    if (this.dataSource) {
      this.dataSource.data = data;

      this.itemsToBeReselected = new Set(this.selectedItemIds);
      console.log("TO BE RESELECTED: ", this.itemsToBeReselected);
      
      this.selection.selected.forEach(selectedItem => {
        if (!this.data.some(item => item.id === selectedItem?.id)) {
          console.log("deselecting ",selectedItem.id);
          
          this.selection.deselect(selectedItem);
          console.log("REDHFG ",this.selectedItemIds);
          
        }
      });

      // Reselect items that were previously selected
      this.itemsToBeReselected.forEach(itemId => {
        
        const isOnCurrentPage = this.dataSource.filteredData.some(item => item.id === itemId);
        if (isOnCurrentPage) {
          // If the item is on the current page, select it
          const selected = data.find(item => item.id === itemId);
          if (selected) {
            console.log("Re-selecting ", itemId);
            this.selection.select(selected);
          }
        }
      });

      if (this.paginator) {
        this.paginator.length = data.length;
      }
    }
  }

  // TODO: CHECK THIS OUT
  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;

    console.log("On page changed", this.selection.selected);

    this.pageChanged.emit(event);

  }

  routeToForm() {
    this.router.navigate(['/add-inventory']);
  }

  applyFilter(event: Event, filterType: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    switch (filterType) {
      // TODO: BUT THEN WHAT THE POINT OF OTHER FILTER TYPES IF A GENERAL ONE IS AVAILABLE?!
      case 'all':
        this.dataSource.filter = filterValue;
        break;

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
    this.numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    
    return this.numSelected === numRows;
  }

  toggleRowSelection(row: any): void {

    if (this.selection.isSelected(row)) {
      this.selection.deselect(row);
      // this.selection.selected.push(row);
      this.selectedItemIds.delete(row.id);
    } else {
      this.selection.select(row);
      this.selectedItemIds.add(row.id);
    }
    this.updateButtonStates();
    this.updateSelectedItems.emit(this.selectedItemIds);
    console.log("on toggle: ", this.selectedItemIds);
    
  }

  toggleAllRows() {
        if (this.isAllSelected()) {
          this.selection.clear();
          this.selectedItemIds.clear();
          // this.numSelected = 0;
    
          console.log("all toggled off");
        }
        else{
          console.log("all selected");
          
          this.dataSource.data.forEach(row => {
            this.selection.select(row);
            this.selectedItemIds.add(row.id);
          });
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
    // row.position + 1
    // row.id
  }


 

  updateSelectAllCheckboxState() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.isSelectAllChecked = numSelected === numRows;
  }


   // unassign item: 
   unassign() {
    const itemsToBeUnassigned: Set<string> = new Set(this.selection.selected.map(item => item.id));
    this.openDialog('Unassign', itemsToBeUnassigned);

  }

  // REMOVE DATA:
  removeData() {
    const itemsToBeDeleted: Set<string> = new Set(this.selection.selected.map(item => item.id));
    this.openDialog('Delete', itemsToBeDeleted);
  }

  openDialog(action: string, selectedItemIDs: Set<string>, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
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


