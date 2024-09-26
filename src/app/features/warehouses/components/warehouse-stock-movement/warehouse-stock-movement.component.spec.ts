import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStockMovementComponent } from './warehouse-stock-movement.component';

describe('WarehouseStockMovementComponent', () => {
  let component: WarehouseStockMovementComponent;
  let fixture: ComponentFixture<WarehouseStockMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseStockMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseStockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
