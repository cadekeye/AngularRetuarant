import {Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from './order.service';
import { promise } from 'protractor';

@Injectable()
export class OrderResolver implements Resolve<any> {
    constructor(private service: OrderService) {}
     resolve(route: ActivatedRouteSnapshot ) {
        // tslint:disable-next-line:radix
        const orderId = parseInt(route.paramMap.get('id'));
       return this.service.getOrderByID(orderId);
    }
}
