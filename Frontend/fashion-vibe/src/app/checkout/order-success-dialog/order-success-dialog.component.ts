import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../shared/models/Order.Model';
import { OrderService } from '../../shared/service/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success-dialog',
  imports: [MatDialogModule],
  templateUrl: './order-success-dialog.component.html',
  styleUrl: './order-success-dialog.component.scss'
})

export class OrderSuccessDialogComponent {

 constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    public dialogRef: MatDialogRef<OrderSuccessDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

}



