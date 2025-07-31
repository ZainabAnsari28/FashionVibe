import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  standalone: true,
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class FilterDialogComponent {
  filters = {
    category: '',
    size: '',
    minPrice: null,
    maxPrice: null,
    sortOption: ''
  };

  categories = ['Mens', 'Womens', 'Kids', 'Traditional', 'Western'];
  sizes = ['S', 'M', 'L', 'XL'];
  priceOptions = [
    { label: 'Under ₹149', value: 149 },
    { label: 'Under ₹199', value: 199 },
    { label: 'Under ₹249', value: 249 },
    { label: 'Under ₹299', value: 299 },
    { label: 'Under ₹349', value: 349 },
    { label: 'Under ₹399', value: 399 },
    { label: 'Under ₹449', value: 449 },
    { label: 'Under ₹499', value: 499 },
    { label: 'Under ₹600', value: 600 },
    { label: 'Under ₹999', value: 999 },
    { label: '₹999 and above', value: 1000 }
  ];

  filterLabels = ['Category', 'Size', 'Price', 'Sort By'];
  selectedLabel = 'Category';

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  apply() {
    this.dialogRef.close(this.filters);
  }

  close() {
    this.dialogRef.close();
  }
}
