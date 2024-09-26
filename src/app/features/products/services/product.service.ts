import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from '../../../core/services/api/product-api.service';
import { Product } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})


export class ProductService {
  constructor(private productApiService: ProductApiService) {}


  deleteProduct(id: number): Observable<any> {
      throw new Error('Method not implemented.');
  }
  createProduct(product: Product): Observable<any> {
      return this.productApiService.addProduct(product);
  }
  updateProduct(product: Product): Observable<Product[]> {
      throw new Error('Method not implemented.');
  }

  getProducts(): Observable<Product[]> {
    return this.productApiService.getProducts();
  }

  getProductById(productId: number): Observable<Product> {
    return this.productApiService.getProductById(productId);
  }

  addProduct(product: Product): Observable<Product> {
    return this.productApiService.addProduct(product);
  }
}
