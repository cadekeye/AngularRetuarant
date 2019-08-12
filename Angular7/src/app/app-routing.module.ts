import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { NavComponent } from './nav/nav.component';
import { OrdersResolver } from './shared/orders.resolver';
import { OrderResolver } from './shared/order-resolver';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: '', redirectTo: 'order', pathMatch: 'full'},
  {path: 'orders', component: OrdersComponent, resolve: {data: OrdersResolver}},
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: 'edit/:id', component: OrderComponent, resolve: {data: OrderResolver}}
  ]},
  {path: 'nav', component: NavComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [OrdersResolver, OrderResolver]
})
export class AppRoutingModule { }
