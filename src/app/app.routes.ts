import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'warehouses',
    loadChildren: () =>
      import('./features/warehouses/warehouses.module').then(
        (m) => m.WarehousesModule
      ),
  },
  {
    path: 'stock-movements',
    loadChildren: () =>
      import('./features/stock-movements/stock-movements.module').then(
        (m) => m.StockMovementsModule
      ),
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
