// src/app/features/warehouses/services/stock-movement.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMovement } from '../../../core/models/stock-movement.model';
import { StockMovementApiService } from '../../../core/services/api/stock-movement-api.service';

@Injectable({
  providedIn: 'root',
})
export class StockMovementService {
  constructor(private stockMovementApiService: StockMovementApiService) {}

  getStockMovements(warehouseId: number): Observable<StockMovement[]> {
    return this.stockMovementApiService.getStockMovements(warehouseId);
  }

  getAllStockMovements(): Observable<StockMovement[]> {
    return this.stockMovementApiService.getAllStockMovements();
  }

  addStockMovement(warehouseId: number, movement: StockMovement): Observable<StockMovement> {
    return this.stockMovementApiService.addStockMovement(warehouseId, movement);
  }
}
