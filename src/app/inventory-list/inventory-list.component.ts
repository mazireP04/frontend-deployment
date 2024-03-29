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


  @ViewChild(DisplayTableComponent) displayTable!: DisplayTableComponent
  
  constructor(private dataService: DataService, @Inject(DOCUMENT) private document: Document){}

  

  ngOnInit(){

    this.dataService.getInventoryItems().subscribe(data => {
      // this.sourceData = new MatTableDataSource(data);
      this.inventoryItems = data.filter((item) => item.isDeleted === false);
      this.updateDisplayTableData();
    });
  }

  updateDisplayTableData() {
    if (this.displayTable) {
      this.displayTable.updateData(this.inventoryItems);
    }
  }

  deleteItems(selectedItemIds: string[]): void {
    this.dataService.markItemsAsDeleted(selectedItemIds).subscribe(() => {
      // console.error("DELETED!!!");

    });
    this.reloadPage();
    
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
