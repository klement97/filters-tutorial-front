import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/order.models';
import { environment } from 'src/environments/environment';
import { buildQueryString } from 'src/app/common/cons';
import { MatSort } from '@angular/material/sort';

const ORDERS_URL = `${environment.apiHost}/orders/`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(page: number, page_size: number, sort: MatSort, filter: any): Observable<ListResponse<OrderModel>> {
    return this.http.get<ListResponse<OrderModel>>(ORDERS_URL +
      buildQueryString(page, page_size, sort, filter));
  }
}

export interface ListResponse<T> {
  data: T[];
  pagination: {
    count: number
  };
}
