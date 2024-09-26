import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseStockMovementComponent } from './components/warehouse-stock-movement/warehouse-stock-movement.component';

const routes: Routes = [
  { path: '', component: WarehouseListComponent },
  { path: 'stock-movements', component: WarehouseStockMovementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehousesRoutingModule {}
