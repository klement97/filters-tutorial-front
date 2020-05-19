import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/models/order.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { getSort } from 'src/app/common/cons';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'customer', 'user__first_name', 'user__last_name', 'amount', 'price', 'date_created'
  ];
  orders: OrderModel[];
  count = 0;
  ordering = 'id';

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize, this.ordering, null)
      .subscribe(res => {
        this.orders = res.data;
        this.count = res.pagination.count;
      });
  }

  sortChange({active, direction}: Sort) {
    this.ordering = getSort(active, direction);
    this.getOrders();
  }

}
