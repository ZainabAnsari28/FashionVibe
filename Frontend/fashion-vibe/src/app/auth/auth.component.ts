import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode = true;
 
  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).+$')
    ]],
    confirmPassword: ['', Validators.required],
    
  }, {
    validators: this.passwordMatchValidator 
  });
  }

passwordMatchValidator(form: FormGroup) {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });
    return { mismatch: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
}

onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
onSubmit() {
  if (this.isLoginMode) {

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token); 
      try {
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const email = payload.sub;

        localStorage.setItem('userName',email); 
        localStorage.setItem('userEmail', email); 
        localStorage.setItem('token', res.token);

        if (email === 'Admin@FashionVibe.com') {
          this.router.navigate(['/admin/products']);
        } else {
          this.router.navigate(['/product']);
        }
      } catch (e) {
        console.error('Token parsing failed:', e);
        this.router.navigate(['/product']);
      }

      },
      error: (err) => {
        this.snackBar.open('Invalid Email or Password', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-error'],    
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
        });
      }
    });

  } else {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...userData } = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (res) => {
        this.snackBar.open('🎉 Sign up successful! You can now log in.', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top', 
          horizontalPosition: 'center'
        });
        this.registerForm.reset();
      },
      error: (err) => {
        this.snackBar.open('❌ Registration failed. Please try again.', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top', 
          horizontalPosition: 'center'
        });
      }
    });
  }
}

}