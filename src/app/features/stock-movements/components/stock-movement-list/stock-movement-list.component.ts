import { Component, OnInit } from '@angular/core';
import { StockMovement } from '../../../../core/models/stock-movement.model';
import { StockMovementService } from '../../services/stock-movement.service';

@Component({
  selector: 'app-stock-movement-list',
  templateUrl: './stock-movement-list.component.html',
  styleUrls: ['./stock-movement-list.component.scss'],
})
export class StockMovementListComponent implements OnInit {
  stockMovements: StockMovement[] = [];
  loading = true;
  error = '';

  constructor(private stockMovementService: StockMovementService) {}

  ngOnInit(): void {

  }
}
