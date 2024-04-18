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

  @ViewChild(DisplayTableComponent) displayTable!: DisplayTableComponent;

  constructor(
    private dataService: DataService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit() {
        this.getInventoryItems(this.pageIndex, this.pageSize);
  }

  getInventoryItems(pageIndex: any, pageSize: any) {
    this.dataService
      .getInventoryItems(pageIndex, pageSize)
      .subscribe((data) => {
        this.inventoryItems = data.data.filter((item: any) => !item.isDeleted);
        this.length = data.total;        
        this.updateDisplayTableData();
      });
  }

  onPageChanged(page: any) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;  
    console.log("on page changed inventory list: ", this.selectedItemIds);
      
    this.getInventoryItems(page.pageIndex, page.pageSize);
  }

  updateDisplayTableData() {

    if (this.displayTable) {
      this.displayTable.updateData(this.inventoryItems, this.pageIndex);
    }
  }

  updateSelectedItems(selectedItemIds: Set<string>) {
    this.selectedItemIds = selectedItemIds;
  }
  
  deleteItems(selectedItemIds: Set<string>): void {
    this.dataService.markItemsAsDeleted(selectedItemIds).subscribe(
      () => {
        console.log('Items deleted successfully');
        this.getInventoryItems(this.pageIndex, this.pageSize);
      },
      (error) => {
        console.error('Error deleting items:', error);
      }
    );
    // this.reloadPage();
  }

  unassignSelectedItems(selectedItemIds: Set<string>) {
    this.dataService.unassign(selectedItemIds).subscribe(() => {
      this.getInventoryItems(this.pageIndex, this.pageSize);
    });
    // this.reloadPage();
  }

  // TODO: check this
  reloadPage() {
    this.document.location.reload();
  }
}
