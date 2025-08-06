import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})

export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
   this.resetPasswordForm = this.fb.group({
  newPassword: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).+$')
  ]],
  confirmPassword: ['', Validators.required]
}, {
  validators: this.passwordMatchValidator
});

  }

  passwordMatchValidator(form: FormGroup) {
  const newPassword = form.get('newPassword');
  const confirmPassword = form.get('confirmPassword');

  if (!newPassword || !confirmPassword) return null;

  if (newPassword.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });
    return { mismatch: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
}


  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const payload = {
      token: this.token,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.authService.resetPassword(payload).subscribe({
      next: () => {
        this.snackBar.open('Password reset successful.', 'Close', { duration: 4000 });
        this.router.navigate(['/auth']);
      },
      error: () => {
        this.snackBar.open('Invalid or expired token.', 'Close', { duration: 4000 });
      }
    });
  }
}
