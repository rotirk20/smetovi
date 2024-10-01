import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/contact-form.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // TODO: change apiUrl to environment variable
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  /**
   * Sends contact form data to the backend
   * @param contactForm - The contact form data
   * @returns Observable with the backend response
   */
  postContactPayload(contactPayload: ContactFormModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact/send`, contactPayload);
  }
}
