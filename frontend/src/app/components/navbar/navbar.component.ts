import { NgClass, NgIf } from '@angular/common';
import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, WeatherComponent, NgIf],
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isHomePage: boolean = false;
  hasScrolled: boolean = false;
  isMobileMenuOpen: boolean = false; // Track if mobile menu is open
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        // Hide navbar for admin routes (adjust the path as necessary)
        this.showNavbar = !event.url.startsWith('/dashboard');
      }
    });
  }

  ngAfterViewInit(): void {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        this.isMobileMenuOpen = !this.isMobileMenuOpen; // Toggle the mobile menu state
        mobileMenu.classList.toggle('hidden');

        this.setHeaderBackground(); // Update header background based on menu state
      });
    }
  }

  ngOnInit(): void {
    // Listen for route changes to determine if we're on the homepage
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
        this.setHeaderBackground(); // Set background on route change
        window.scrollTo(0, 0); // Scroll to top on route change
      }
    });

    // Check the scroll position on page load
    this.checkScroll();
  }

  // Listen to scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  // Set the scroll flag when scrolled past 50px
  private checkScroll(): void {
    this.hasScrolled = window.pageYOffset > 50;
    this.setHeaderBackground(); // Update header background based on scroll
  }

  // Method to set the header background and button color
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
