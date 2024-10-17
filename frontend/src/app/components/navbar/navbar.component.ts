import { NgClass, NgIf } from '@angular/common';
import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { WeatherWidget } from '../weather-widget/weather-widget.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, WeatherWidget, NgIf],
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isHomePage: boolean = false;
  hasScrolled: boolean = false;
  isMobileMenuOpen: boolean = false;
  showNavbar: boolean = true;
  isMobileView: boolean = false;
  intervalTime: number = 900000; // Default 15 minutes (in milliseconds)
  isLoggedIn = false;
  subMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.showNavbar = !event.url.startsWith('/dashboard');
      }
    });
  }

  ngAfterViewInit(): void {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        mobileMenu.classList.toggle('hidden');

        this.setHeaderBackground();
      });
    }
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 640;
  }

  toggleMenu(): void {
    this.subMenuOpen = !this.subMenuOpen;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
        this.setHeaderBackground(); // Set background on route change
        window.scrollTo(0, 0); // Scroll to top on route change
      }
    });

    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.checkScroll();
    this.checkScreenSize();

    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
    this.setWeatherUpdateInterval(30); // Set interval to 30 minutes, example use case
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  setWeatherUpdateInterval(minutes: number): void {
    this.intervalTime = minutes * 60 * 1000; // Convert minutes to milliseconds
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  private checkScroll(): void {
    this.hasScrolled = window.pageYOffset > 50;
    this.setHeaderBackground();
  }

  private setHeaderBackground(): void {
    const navElement = document.querySelector('nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');

    if (this.isMobileMenuOpen || this.hasScrolled) {
      // Set background to white if mobile menu is open or scrolled
      navElement?.classList.add('bg-white', 'drop-shadow-md');
      mobileMenuButton?.classList.add('text-black'); // Change button color to black
    } else {
      // Remove background if not scrolled and menu is closed
      navElement?.classList.remove('bg-white', 'drop-shadow-md');
      mobileMenuButton?.classList.remove('text-black'); // Reset button color to default
    }
  }
}
