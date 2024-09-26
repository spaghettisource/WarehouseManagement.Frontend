// src/app/features/warehouses/services/stock-movement-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StockMovement } from '../../../core/models/stock-movement.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockMovementApiService {
  private apiUrl = `${environment.apiUrl}/stockmovements`; // Base URL; adjust as needed

  constructor(private http: HttpClient) {}

  // Fetch stock movements for a specific warehouse
  getStockMovements(warehouseId: number): Observable<StockMovement[]> {
    const url = `${this.apiUrl}/${warehouseId}/stockmovements`;
    return this.http.get<StockMovement[]>(url).pipe(catchError(this.handleError));
  }

  getAllStockMovements(): Observable<StockMovement[]> {
    const url = `${this.apiUrl}/`;
    return this.http.get<StockMovement[]>(url).pipe(catchError(this.handleError));
  }

  // Add a new stock movement
  addStockMovement(warehouseId: number, movement: StockMovement): Observable<StockMovement> {
    const url = `${this.apiUrl}/warehouse/${warehouseId}/add`;
    return this.http.post<StockMovement>(url, movement).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('StockMovementApiService Error:', error);
    return throwError(error);
  }
}
