import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Warehouse } from '../../../../core/models/warehouse.model';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss'],
})
export class WarehouseDetailComponent implements OnInit {
  warehouse: Warehouse | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    const warehouseId = Number(this.route.snapshot.paramMap.get('id'));

    this.warehouseService.getWarehouseById(warehouseId).subscribe({
      next: (data) => {
        this.warehouse = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load warehouse details.';
        this.loading = false;
      },
    });
  }
}
