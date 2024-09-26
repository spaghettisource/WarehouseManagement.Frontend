import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MaterialModule } from '../../material/material.module';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductEntryComponent],
  imports: [CommonModule, ProductsRoutingModule, MaterialModule, ReactiveFormsModule ],
})
export class ProductsModule {}
