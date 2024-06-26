import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginPageComponent } from './login-page/login-page.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DisplayTableComponent } from './display-table/display-table.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import { DataService } from './data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResourceAssignmmentComponent } from './resource-assignmment/resource-assignmment.component';

import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { SignupComponent } from './signup/signup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { MatDialogContent } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputFormComponent,
    DisplayTableComponent,
    ResourceAssignmmentComponent,
    AddUserComponent,
    SignupComponent,
    InventoryListComponent,
    DashboardComponent,
    StackedBarChartComponent,
    DoughnutChartComponent,
    DeleteEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatPaginator,
    MatSort,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogContent,
    MatButtonToggleModule
  ],
  providers: [
    provideAnimationsAsync(),
    // DataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
