import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockMovement } from '../../../../core/models/stock-movement.model';
import { StockMovementService } from '../../services/stock-movement.service';

@Component({
  selector: 'app-stock-movement-detail',
  templateUrl: './stock-movement-detail.component.html',
  styleUrls: ['./stock-movement-detail.component.scss'],
})
export class StockMovementDetailComponent implements OnInit {
  stockMovement: StockMovement | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private stockMovementService: StockMovementService
  ) {}

  ngOnInit(): void {
  }
    
}
