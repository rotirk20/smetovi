import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/';
  loginForm: FormGroup;
  errorMessage: string | undefined;
  loading = false;
  passwordVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // For email validation
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  login(): void {
    this.loading = true;
    const { username, password, rememberMe } = this.loginForm.value;
    this.authService
      .signIn(username, password)
      .subscribe({
        next: (success) => {
          this.loading = false; // Stop loading when login is complete
          if (success) {
            // If login is successful, redirect to the returnUrl
            this.returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // Handle cases where login fails but isn't due to an HTTP error
            this.handleError('Korisničko ime ili lozinka nije tačna');
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false; // Stop loading when login is complete
          // Handle HTTP error responses or other errors
          if (error.status === 404) {
            this.handleError('Korisnik ne postoji.');
          } else if (error.status === 400) {
            this.handleError('Korisničko ime ili lozinka nije tačna.');
          } else {
            this.handleError('Greška, pokušajte ponovo.');
          }
        }
      });
  }
  
  // Helper method to handle and display errors
  private handleError(message: string): void {
    // Here, you can use a notification service, a modal, or update a variable
    // to display the error message in your template.
    this.errorMessage = message;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
  }
}
