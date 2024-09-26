import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseStockMovementComponent } from './components/warehouse-stock-movement/warehouse-stock-movement.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WarehouseListComponent, WarehouseDetailComponent, WarehouseStockMovementComponent],
  imports: [CommonModule, WarehousesRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class WarehousesModule {}
