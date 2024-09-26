import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ProductsModule } from './features/products/products.module';
import { WarehousesModule } from './features/warehouses/warehouses.module';
import { StockMovementsModule } from './features/stock-movements/stock-movements.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ProductsModule, WarehousesModule, StockMovementsModule, SharedModule, HttpClientModule, MaterialModule],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
