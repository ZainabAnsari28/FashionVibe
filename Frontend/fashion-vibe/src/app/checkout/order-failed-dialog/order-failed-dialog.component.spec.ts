import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFailedDialogComponent } from './order-failed-dialog.component';

describe('OrderFailedDialogComponent', () => {
  let component: OrderFailedDialogComponent;
  let fixture: ComponentFixture<OrderFailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFailedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
