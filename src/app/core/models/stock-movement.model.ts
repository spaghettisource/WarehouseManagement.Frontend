import { Product } from "./product.model";

export interface StockMovement {
    movementID: number;
    warehouseID: number;
    productID: number;
    amount: number;
    date: Date;
    isImport: boolean;
    product?: Product; // Changed from string to Product object
  }
  