import { Routes } from '@angular/router';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { LoginComponent } from '@pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "transactions",

  },
  {
    path: "transactions",
    // component: TransactionsComponent,
    loadComponent:()=>import('@pages/transactions/transactions.component').then(c=> c.TransactionsComponent)
  },

  {
    path: "login",
    component: LoginComponent,
  }
];
