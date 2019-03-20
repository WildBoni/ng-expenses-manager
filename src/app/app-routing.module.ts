import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './expenses/dashboard/dashboard.component';
import { GroupComponent } from './expenses/group/group.component';
import { GroupExpensesComponent } from './expenses/group-expenses/group-expenses.component';
import { ExpenseCreateComponent } from './expenses/expense-create/expense-create.component';
import { ExpenseViewComponent } from './expenses/expense-view/expense-view.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/:groupId', component: GroupExpensesComponent, canActivate: [AuthGuard] },
  { path: 'add-expense', component: ExpenseCreateComponent, canActivate: [AuthGuard] },
  { path: 'expenses/:expenseId', component: ExpenseViewComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
