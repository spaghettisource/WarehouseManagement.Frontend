import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockMovementsRoutingModule } from './stock-movements-routing.module';
import { StockMovementListComponent } from './components/stock-movement-list/stock-movement-list.component';
import { StockMovementDetailComponent } from './components/stock-movement-detail/stock-movement-detail.component';

@NgModule({
  declarations: [StockMovementListComponent, StockMovementDetailComponent],
  imports: [CommonModule, StockMovementsRoutingModule],
})
export class StockMovementsModule {}
