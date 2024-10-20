import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './home/components/navbar/navbar.component';
import { FooterComponent } from './home/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarComponent, FooterComponent]
})
export class AppComponent {
  title = 'smetovi';
}
