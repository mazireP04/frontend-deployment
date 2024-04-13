import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { AuthGuard } from './auth.guard';
import { ResourceAssignmmentComponent } from './resource-assignmment/resource-assignmment.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SignupComponent } from './signup/signup.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Signup' } },

  {
    path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'}, canActivate: [AuthGuard]
  },

  {
    path: 'add-inventory',
    component: InputFormComponent,
    data: { title: 'Add Inventory' },
    canActivate: [AuthGuard],
  },
  {
    path: 'inventories',
    component: InventoryListComponent,
    data: { title: 'Inventories' },
    canActivate: [AuthGuard],
  },
  {
    path: 'resource-assignment',
    component: ResourceAssignmmentComponent,
    data: { title: 'Resource Assignment' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    data: { title: 'Add User' },
    canActivate: [AuthGuard],
  },

  // {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
