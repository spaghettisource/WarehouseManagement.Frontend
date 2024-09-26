import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Warehouse } from '../../../../core/models/warehouse.model';
import { StockMovement } from '../../../../core/models/stock-movement.model';
import { Product } from '../../../../core/models/product.model';
import { StockMovementApiService } from '../../../../core/services/api/stock-movement-api.service';
import { ProductService } from '../../../products/services/product.service';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-stock-movement',
  templateUrl: './warehouse-stock-movement.component.html',
  styleUrls: ['./warehouse-stock-movement.component.css']
})
export class WarehouseStockMovementComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWarehouse: Warehouse | null = null;
  stockMovements: StockMovement[] = [];
  currentStockAmount: number = 0;
  freeStockSpace: number = 0;
  products: Product[] = [];
  isLoading = false;

  // Table configurations
  displayedColumns: string[] = ['movementID', 'productName', 'amount', 'date', 'type'];
  dataSource = new MatTableDataSource<StockMovement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Form for adding stock movements
  movementForm: FormGroup;

  constructor(
    private warehouseService: WarehouseService,
    private stockMovementService: StockMovementApiService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.movementForm = this.fb.group({
      productID: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required],
      isImport: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchWarehouses();
    this.fetchProducts();
  }

  // Fetch all warehouses
  fetchWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        if (this.warehouses.length > 0) {
          this.selectWarehouse(this.warehouses[0]);
        }
      },
      error: (err) => {
        console.error('Error fetching warehouses:', err);
        this.snackBar.open('Failed to load warehouses.', 'Close', { duration: 3000 });
      }
    });
  }

  // Fetch all products for selection
  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.snackBar.open('Failed to load products.', 'Close', { duration: 3000 });
      }
    });
  }

  // Select a warehouse and fetch its stock movements
  selectWarehouse(warehouse: Warehouse): void {
    this.selectedWarehouse = warehouse;
    this.fetchStockMovements(warehouse.warehouseID);
  }

  // Fetch stock movements for the selected warehouse
  fetchStockMovements(warehouseId: number): void {
    this.stockMovementService.getAllStockMovements().subscribe({
      next: (data) => {
        this.stockMovements = data;
        this.dataSource.data = this.stockMovements;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculateStock(this.selectedWarehouse!, this.stockMovements);
      },
      error: (err) => {
        console.error('Error fetching stock movements:', err);
        this.snackBar.open('Failed to load stock movements.', 'Close', { duration: 3000 });
      }
    });
  }

  // Calculate current stock and free space
  calculateStock(warehouse: Warehouse, movements: StockMovement[]): void {
    this.currentStockAmount = movements.reduce((acc, movement) => {
      return movement.isImport ? acc + movement.amount : acc - movement.amount;
    }, 0);
    this.freeStockSpace = warehouse.maxStockAmount - this.currentStockAmount;
  }

  // Helper method to get product name by ID
  getProductName(productId: number): string {
    const product = this.products.find(p => p.productID === productId);
    return product ? product.productName : 'Unknown';
  }

  // Add a new stock movement
  onSubmit(): void {
    if (this.movementForm.invalid || !this.selectedWarehouse) {
      this.snackBar.open('Please fill out the form correctly.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const movement: StockMovement = {
      movementID: 0, // Backend assigns ID
      warehouseID: this.selectedWarehouse!.warehouseID,
      productID: this.movementForm.value.productID,
      amount: this.movementForm.value.amount,
      date: this.movementForm.value.date,
      isImport: this.movementForm.value.isImport
    };

    console.log(movement);
        console.log(this.selectedWarehouse!.warehouseID)

    this.stockMovementService.addStockMovement(this.selectedWarehouse!.warehouseID, movement).subscribe({
      next: () => {
        
        this.snackBar.open('Stock movement added successfully.', 'Close', { duration: 3000 });
        this.movementForm.reset({ isImport: true, date: new Date() });
        this.fetchStockMovements(this.selectedWarehouse!.warehouseID);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error adding stock movement:', err);
        this.snackBar.open('Failed to add stock movement.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
