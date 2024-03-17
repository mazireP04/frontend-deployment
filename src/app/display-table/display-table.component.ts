import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss'
})
export class DisplayTableComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dataService: DataService, private router: Router){}
  
  dataSource!: MatTableDataSource<any>;

 storedData: any[] = [];

  ngOnInit(){

    this._dataService.formData$.subscribe((data) => {
      this.storedData = data;
      this.dataSource = new MatTableDataSource(this.storedData);
      // this.dataSource = new MatTableDataSource(data);

      // console.log('Data received in DisplayTableComponent:', data);

      // console.log(this.dataSource);
      
    })

    // const displayItemsArray: any[] = JSON.parse(this.storedData || '[]');

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    'ID',
    'Category',
    'Sub-Category',
    'Model Name',
    'Model Memory',
    'Warranty',
    'Memory Details',
    'Screen Size',
    'Price',
    'Assigned To',
    'Status',

  ];


}

