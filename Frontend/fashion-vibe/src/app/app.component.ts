import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedInUserName: string = '';
  isBrowser: boolean;
  sidebarOpen = false;
  isMobileView = false;
  isAdmin: boolean = false;
  
  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isBrowser) {
          this.loggedInUserName = localStorage.getItem('userName') || 'User';
          this.isAdmin = this.isAdminUser(); 
        }
      });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loggedInUserName = localStorage.getItem('userName') || 'User';
      this.checkScreenSize();
      this.isAdmin = this.isAdminUser();

      window.addEventListener('resize', this.checkScreenSize.bind(this));
    }
  }
 
isAdminUser(): boolean {
  if (!this.isBrowser) return false;
  const email = localStorage.getItem('userEmail')?.toLowerCase();
  return email === 'admin@fashionvibe.com';
}

checkScreenSize() {
  this.isMobileView = window.innerWidth <= 768;
}

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
  document.body.style.overflow = this.sidebarOpen ? 'hidden' : 'auto';
}


  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    }
    this.router.navigate(['/auth']);
  }

  isLoginPage(): boolean {
    return this.router.url.startsWith('/auth') ||
          this.router.url.startsWith('/forgot-password') ||
          this.router.url.startsWith('/reset-password');
  }


 
}
