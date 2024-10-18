import { Component } from '@angular/core';
import { ContactFormComponent } from 'src/app/components/contact/contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ContactFormComponent],
})
export class ContactComponent {}
