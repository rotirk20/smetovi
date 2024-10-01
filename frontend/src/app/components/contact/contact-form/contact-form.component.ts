import { Component } from '@angular/core';
import {
  ContactFormModel,
  ContactFormErrors,
} from '../../../shared/models/contact-form.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  showForm = false;
  maxMessageLength = 255;
  maxContactInfoLength = 63;
  maxNameLength = 63;
  maxSubjectLength = 127;

  constructor(private contactService: ContactService) {}

  formData: ContactFormModel = {
    name: '',
    contactInfo: '',
    subject: '',
    message: '',
  };

  formErrors: ContactFormErrors = {
    name: '',
    contactInfo: '',
    subject: '',
    message: '',
  };

  messageLength = 0;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  validateForm() {
    this.formErrors.name =
      this.formData.name.length > this.maxNameLength
        ? `Ime mora biti kraće od ${this.maxNameLength} znakova.`
        : !this.formData.name
        ? 'Ime i prezime je obavezno.'
        : '';
    this.formErrors.contactInfo =
      this.formData.contactInfo.length > this.maxContactInfoLength
        ? `Kontakt informacije moraju biti kraće od ${this.maxContactInfoLength} znakova.`
        : '';
    this.formErrors.subject =
      this.formData.subject.length > this.maxSubjectLength
        ? `Naslov mora biti kraći od ${this.maxSubjectLength} znakova.`
        : !this.formData.subject
        ? 'Naslov je obavezan.'
        : '';
    this.formErrors.message =
      this.formData.message.length > this.maxMessageLength
        ? `Poruka mora biti kraća od ${this.maxMessageLength} znakova.`
        : !this.formData.message
        ? 'Poruka je obavezna.'
        : '';
  }

  submitForm() {
    this.validateForm();
    if (
      this.formErrors.name ||
      this.formErrors.contactInfo ||
      this.formErrors.subject ||
      this.formErrors.message
    ) {
      return;
    }

    this.contactService.postContactPayload(this.formData).subscribe(
      (response) => {
        console.log('Form data successfully submitted:', response);
        this.closeForm();
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }

  handleMessageInput(event: any) {
    this.messageLength = event.target.value.length;
    this.formData.message = event.target.value;
    this.validateForm();
  }
}
