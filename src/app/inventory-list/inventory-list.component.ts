import { Component, Inject, Output, ViewChild } from '@angular/core';
import { DisplayTableComponent } from '../display-table/display-table.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent {
  inventoryItems: any[] = [];
  pageSizeOptions: any = [5, 10, 15, 20, 50];
  pageSize: any = 5;
  pageIndex: any = 0;
  length: any = 20;

  selectedItemIds: Set<string> = new Set<string>();

  category: string = "All";

  allItemsColumns = [ 'select',
  'ID',
  'Category',
  'Sub-Category',
  'Name',
  'Warranty',
  'Specifications',
  'Price',
  'Assigned To',
  'Status'];

  electronicItemsColumns = [ 'select',
  'ID',
  'Category',
  'Sub-Category',
  'Model Name',
  'Model Memory',
  'Warranty',
  'Screen Size',
  'Price',
  'Assigned To',
  'Status'];

  nonElectronicItemsColumns = [ 'select',
  'ID',
  'Category',
  'Sub-Category',
  'Brand Name',
  'Warranty',
  'Color',
  'Size',
  'Dimensions',
  'Price',
  'Assigned To',
  'Status'];

  displayedColumns: Array<any> = this.allItemsColumns;


  @ViewChild(DisplayTableComponent) displayTable!: DisplayTableComponent;

  constructor(
    private dataService: DataService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit() {
        this.getInventoryItems(this.pageIndex, this.pageSize, this.category, this.displayedColumns);
  }

  getInventoryItems(pageIndex: any, pageSize: any, category: any, columns: any) {
    if(this.category=="All"){
      this.dataService
      .getInventoryItems(pageIndex, pageSize)
      .subscribe((data) => {
        this.inventoryItems = data.data.filter((item: any) => !item.isDeleted);
        this.length = data.total;        
        this.updateDisplayTableData();
      });
    }
    else if(this.category=="Electronics"){
      this.dataService
      .getElectronicItems(pageIndex, pageSize)
      .subscribe((data) => {
        this.inventoryItems = data.data.filter((item: any) => !item.isDeleted);
        this.length = data.total;        
        this.updateDisplayTableData();
      });
    }
    else if(this.category=="NonElectronics"){
      this.dataService
      .getNonElectronicItems(pageIndex, pageSize)
      .subscribe((data) => {
        this.inventoryItems = data.data.filter((item: any) => !item.isDeleted);
        this.length = data.total;        
        this.updateDisplayTableData();
      });
    }
  }

  onPageChanged(page: any) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;  
    console.log("on page changed inventory list: ", this.selectedItemIds);
      
    this.getInventoryItems(page.pageIndex, page.pageSize, this.category, this.displayedColumns);
  }

  updateDisplayTableData() {

    if (this.displayTable) {
      this.displayTable.updateData(this.inventoryItems, this.pageIndex);
    }
  }

  changeDisplayedColumns(category: string){
    this.category = category;
    if(this.category=="All"){
      this.displayedColumns = this.allItemsColumns;
    }
    else if(this.category=="Electronics"){
      this.displayedColumns = this.electronicItemsColumns;
    }
    else if(this.category=="NonElectronics"){
      this.displayedColumns = this.nonElectronicItemsColumns;
    }
    this.getInventoryItems(this.pageIndex, this.pageSize, this.category, this.displayedColumns);
  }


  updateSelectedItems(selectedItemIds: Set<string>) {
    this.selectedItemIds = selectedItemIds;
  }
  
  deleteItems(selectedItemIds: Set<string>): void {
    const arr = Array.from(selectedItemIds);
    this.dataService.markItemsAsDeleted(arr).subscribe(
      () => {
        console.log('Items deleted successfully');
        this.getInventoryItems(this.pageIndex, this.pageSize, this.category, this.displayedColumns);
      },
      (error) => {
        console.error('Error deleting items:', error);
      }
    );
    this.reloadPage();
  }

  unassignSelectedItems(selectedItemIds: Set<string>) {
    const arr = Array.from(selectedItemIds);
    this.dataService.unassign(arr).subscribe(() => {
      this.getInventoryItems(this.pageIndex, this.pageSize, this.category, this.displayedColumns);
    });
    // this.reloadPage();
  }

  // TODO: check this
  reloadPage() {
    this.document.location.reload();
  }
}
