// src/app/features/products/components/product-entry/product-entry.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductEntryComponent>
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      sizePerUnit: [0, [Validators.required, Validators.min(0.1)]],
      isHazardous: [false],
      stockMovements: this.fb.array([]) // Initialize as empty array
    });
  }

  ngOnInit(): void {}

  createStockMovement(): FormGroup {
    return this.fb.group({
      movementID: [0],
      warehouseID: [0],
      productID: [0],
      amount: [0],
      date: [new Date()],
      isImport: [true],
      // Make warehouse and product optional
      warehouse: this.fb.group({
        warehouseID: [0],
        warehouseName: [''],
        maxStockAmount: [0],
        isHazardousOnly: [false],
        stockMovements: [[]]
      }),
      product: this.fb.group({
        productID: [0],
        productName: [''],
        sizePerUnit: [0],
        isHazardous: [false],
        stockMovements: [[]]
      })
    });
  }

  get stockMovements(): FormArray {
    return this.productForm.get('stockMovements') as FormArray;
  }

  addStockMovement() {
    this.stockMovements.push(this.createStockMovement());
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product: Product = this.productForm.value;

    this.productService.createProduct(product).subscribe({
      next: () => {
        this.snackBar.open('Product added successfully.', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creating product:', err);
        if (err.error && err.error.errors) {
          Object.keys(err.error.errors).forEach(key => {
            this.snackBar.open(`${key}: ${err.error.errors[key].join(', ')}`, 'Close', { duration: 5000 });
          });
        } else {
          this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 5000 });
        }
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
