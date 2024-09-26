import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../../../core/models/warehouse.model';
import { WarehouseApiService } from '../../../core/services/api/warehouse-api.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private warehouseApiService: WarehouseApiService) {}


  getWarehouses(): Observable<Warehouse[]> {
    return this.warehouseApiService.getWarehouses();
  }

  getWarehouseById(warehouseId: number): Observable<Warehouse> {
    return this.warehouseApiService.getWarehouseById(warehouseId);
  }

  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.warehouseApiService.addWarehouse(warehouse);
  }
}
