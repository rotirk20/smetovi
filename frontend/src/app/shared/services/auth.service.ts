import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          const token = response.token;
          localStorage.setItem('token', token);
          return true; // Indicate successful login
        }),
        catchError((error: HttpErrorResponse) => {
          // Log error or handle it if needed
          return throwError(() => error); // Updated way to throw an error
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Optionally, add more checks like token validity or expiration
    return !!token;
  }

  logOut() {
    // Remove the token on logout
    localStorage.removeItem('token');
    this.router.navigate(['/prijava']);
  }
}
