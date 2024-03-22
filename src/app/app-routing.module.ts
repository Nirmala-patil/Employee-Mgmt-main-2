import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
 {
    path:'',
    redirectTo:'/register-employee',
    pathMatch:'full'
  },
  {
    component:RegisterEmployeeComponent,
    path:'register-employee',
    canActivate: [MsalGuard]
  },
  {
    component:RegisterEmployeeComponent,
    path:'register-employee/:id',
    canActivate: [MsalGuard]
  },
  {
    component:EmployeeDetailsComponent,
    path:'employee-details',
    canActivate: [MsalGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
