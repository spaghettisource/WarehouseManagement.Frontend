import { StockMovement } from "./stock-movement.model";

export interface Product {
  productID: number;
  productName: string;
  sizePerUnit: number;
  isHazardous: boolean;
  stockMovements?: StockMovement[]; 
}