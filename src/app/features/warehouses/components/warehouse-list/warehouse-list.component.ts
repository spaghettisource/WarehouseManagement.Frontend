import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../../../core/models/warehouse.model';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  loading = true;
  error = '';

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load warehouses.';
        this.loading = false;
      },
    });
  }
}
