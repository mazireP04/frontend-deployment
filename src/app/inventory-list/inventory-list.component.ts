import { Component, Output } from '@angular/core';
import { DisplayTableComponent } from '../display-table/display-table.component';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {

  // sourceData!: MatTableDataSource<any>;
  inventoryItems: any[] = [];
  pageSize: any[] = [3,7,10];


  constructor(private dataService: DataService){}

  ngOnInit(){

    this.dataService.getInventoryItems().subscribe(data => {
      // this.sourceData = new MatTableDataSource(data);
      this.inventoryItems = data.filter((item) => item.isDeleted === false);
    });
  }

  deleteItems(selectedItemIds: string[]): void {
    // TODO: API CALL TO SET THE PROPERTIES OF SELECTED ID TO ISDELETED TRUE
    this.dataService.markItemsAsDeleted(selectedItemIds).subscribe(() => {
      console.error("DELETED!!!");

    });
    
  }
}
