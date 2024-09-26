import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockMovementListComponent } from './components/stock-movement-list/stock-movement-list.component';
import { StockMovementDetailComponent } from './components/stock-movement-detail/stock-movement-detail.component';

const routes: Routes = [
  { path: '', component: StockMovementListComponent },
  { path: ':id', component: StockMovementDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockMovementsRoutingModule {}
