import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/models/product.model';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  imports: [ CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatDialogModule,
            MatButtonModule,
            MatOptionModule,
            MatSelectModule
  ]
})
export class ProductDialogComponent {
  productForm: FormGroup;

  categories = ['Mens', 'Womens', 'Kids', 'Traditional', 'Western'];
  sizes = ['S', 'M', 'L', 'XL'];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private adminService: AdminService
      ) {
        this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]],
      category: [data?.category || '', Validators.required],
      size: [data?.size || '', Validators.required]
    });

  }

 
save() {
  if (this.data.id) {
    const updatedProduct: Product = {
      id: this.data.id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      category: this.productForm.value.category,
      size: this.productForm.value.size,
      imageUrl: this.data.imageUrl 
    };

    this.adminService.updateProduct(this.data.id, updatedProduct).subscribe(() => {
      this.dialogRef.close(true);
    });

  } else {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('category', this.productForm.value.category);
    formData.append('size', this.productForm.value.size);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.adminService.addProductWithImage(formData).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}

  cancel() {
    this.dialogRef.close();
  }

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
   }
}


}
