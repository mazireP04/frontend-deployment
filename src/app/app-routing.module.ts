import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { AuthGuard
 } from './auth.guard';
import { ResourceAssignmmentComponent } from './resource-assignmment/resource-assignmment.component';
const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
 
  {path: "login", component: LoginPageComponent,data: {title: "Login"} },
   
  {path: "add-inventory", component: InputFormComponent, data: {title: "Add Inventory"}, canActivate: [AuthGuard]},
  {path: "inventories", component: DisplayTableComponent, data: {title: "Inventories"}, canActivate: [AuthGuard] },
  {path: "resource-assignment", component: ResourceAssignmmentComponent, data: {title: "Resource Assignment"}, canActivate: [AuthGuard] },
  
  // {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
