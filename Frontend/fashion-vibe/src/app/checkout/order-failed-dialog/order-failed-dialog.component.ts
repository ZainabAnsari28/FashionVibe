import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-failed-dialog',
  imports: [],
  templateUrl: './order-failed-dialog.component.html',
  styleUrl: './order-failed-dialog.component.scss'
})
export class OrderFailedDialogComponent {
  constructor(public dialogRef: MatDialogRef<OrderFailedDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
