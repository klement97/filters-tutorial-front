import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/models/order.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { getSort } from 'src/app/common/cons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'customer', 'user__first_name', 'user__last_name', 'amount', 'price', 'deleted', 'date_created'
  ];
  orders: OrderModel[];
  count = 0;
  ordering = 'id';
  filterForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize, this.ordering, this.filterForm.value)
      .subscribe(res => {
        this.orders = res.data;
        this.count = res.pagination.count;
      });
  }

  sortChange({active, direction}: Sort) {
    this.ordering = getSort(active, direction);
    this.getOrders();
  }

  filterOrders() {
    this.paginator.pageIndex = 0;
    this.getOrders();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      id: null, customer: '', user__first_name: '', user__last_name: '',
      amount_min: null, amount_max: null, price_min: null, price_max: null,
      deleted: null, date_created_after: '', date_created_before: ''
    });
  }

  clearFilterForm() {
    this.initFilterForm();
    this.getOrders();
  }

}
