// src/app/components/product-list/product-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductEntryComponent } from '../product-entry/product-entry.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';

  // Table configuration
  displayedColumns: string[] = ['name', 'isHazardous', 'sizePerUnit', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  // ViewChild references for paginator and sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products from the backend
  fetchProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
        this.snackBar.open(`Error fetching products: ${err}`, 'Close', { duration: 5000 });
      }
    });
  }

  // Open the Add Product dialog
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(ProductEntryComponent, {
      width: '400px',
      data: null // No data for adding a new product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If a product was added
        this.fetchProducts();
      }
    });
  }

  // Populate the form with the selected product's details for editing
  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductEntryComponent, {
      width: '400px',
      data: product // Pass the product data for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If the product was updated
        this.fetchProducts();
      }
    });
  }

  // Delete a product after confirmation
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully.', 'Close', { duration: 3000 });
          this.fetchProducts();
        },
        error: err => {
          console.error('Error deleting product:', err);
          this.snackBar.open(`Error deleting product: ${err}`, 'Close', { duration: 5000 });
        }
      });
    }
  }

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
