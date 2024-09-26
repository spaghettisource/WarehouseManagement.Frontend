import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Warehouse } from '../../models/warehouse.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WarehouseApiService {
  private apiUrl = `${environment.apiUrl}/warehouses`;

  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrl);
  }

  getWarehouseById(warehouseId: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.apiUrl}/${warehouseId}`);
  }

  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.apiUrl, warehouse);
  }
}
