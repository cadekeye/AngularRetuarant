import { Injectable} from '@angular/core';
import { Resolve} from '@angular/router';
import { OrderService } from './order.service';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersResolver implements Resolve<any>{
    constructor(private service: OrderService) { }
    resolve() {
       return this.service.getOrderList();
    }
}