import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {path: '', redirectTo: 'order', pathMatch: 'full'},
  {path: 'orders', component: OrdersComponent},
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: 'edit/:id', component: OrderComponent}
  ]},
  {path: 'nav', component: NavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
