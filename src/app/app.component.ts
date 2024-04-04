import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataService],
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  title = 'inventory-app';

  buttonText!: string;

  mailId!: string;
  constructor(private route: ActivatedRoute, protected router: Router) { }

  isAuthenticated!: boolean;

  ngOnInit() {
    this.router.events.pipe().subscribe(() => {
      this.isAuthenticated =
        sessionStorage.getItem('authenticated') != undefined;
      this.buttonText =
        sessionStorage.getItem('authenticated')?.charAt(0).toUpperCase() || '';
      // why here?
      this.mailId = sessionStorage.getItem('authenticated') || '';
    });
  }

  logout() {
    // TODO: logout and how to actually logout?
    sessionStorage.removeItem('authenticated');
    this.router.navigate(['/login']);
  }
}
