import { Component, Inject, Output, ViewChild } from '@angular/core';
import { DisplayTableComponent } from '../display-table/display-table.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {

  // sourceData!: MatTableDataSource<any>;
  inventoryItems: any[] = [];
  pageSize: any[] = [5,7,10, 15];

  // pageLength = 10;
  // totalItems = 0;
  pageIndex!: any;
  pageLength!: any;



  // SERVER SIDE PAGINATION
  currentPage = 1;
  itemsPerPage = 5;


  @ViewChild(DisplayTableComponent) displayTable!: DisplayTableComponent
  
  constructor(private dataService: DataService, @Inject(DOCUMENT) private document: Document){}

 

  // ngOnInit(){

  //   const offset = (this.currentPage - 1) * this.itemsPerPage;
  //   this.dataService.getInventoryItems(offset, this.itemsPerPage).subscribe(data => {
  //     // this.sourceData = new MatTableDataSource(data);
  //     this.inventoryItems = data.filter((item: any) => item.isDeleted === false);
  //     this.updateDisplayTableData();
  //   });
  // }

  ngOnInit() {
    this.getInventoryItems();
  }
  
  getInventoryItems() {
    const offset = (this.pageIndex) * this.pageLength;
    this.dataService.getInventoryItems(offset, this.pageLength).subscribe(data => {
      this.inventoryItems = data.data.filter((item: any) => !item.isDeleted);
      // this.totalItems = data.totalItems;
      this.updateDisplayTableData();
    });
  }
  
  onPageChanged(page: any) {
    this.pageIndex = page.pageIndex;
    // this.pageLength = page.pageLength;

    // this.currentPage = page;
    this.getInventoryItems();
  }


  updateDisplayTableData() {
    if (this.displayTable) {
      this.displayTable.updateData(this.inventoryItems);
    }
  }

  deleteItems(selectedItemIds: string[]): void {
    this.dataService.markItemsAsDeleted(selectedItemIds).subscribe(
      () => {
        console.log("Items deleted successfully");
        this.reloadPage();
    },
    (error) => {
        console.error("Error deleting items:", error);
    }

    );
    
  }

  unassignSelectedItems(selectedItemIds: string[]){
    this.dataService.unassign(selectedItemIds).subscribe(() => {

    });
    this.reloadPage();
  }

  // TODO: check this
  reloadPage() {
    this.document.location.reload();
  }
}
