import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/contact-form.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // TODO: change apiUrl to environment variable
  private apiUrl = environment.apiUrl;
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
