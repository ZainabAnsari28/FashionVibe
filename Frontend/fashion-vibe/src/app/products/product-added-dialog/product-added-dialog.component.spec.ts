import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddedDialogComponent } from './product-added-dialog.component';

describe('ProductAddedDialogComponent', () => {
  let component: ProductAddedDialogComponent;
  let fixture: ComponentFixture<ProductAddedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
