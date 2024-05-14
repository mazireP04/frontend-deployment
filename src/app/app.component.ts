import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import {ConfigurableFocusTrapFactory, FocusTrapFactory} from '@angular/cdk/a11y';
import { OnChanges } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // providers: [DataService],
  providers: [DataService, {provide: FocusTrapFactory, useClass: ConfigurableFocusTrapFactory}],
})
export class AppComponent {
  // @ViewChild('drawer') drawer!: MatDrawer;

  mode = new FormControl('over' as MatDrawerMode);
  hasBackdrop = new FormControl(null as null | boolean);
  position = new FormControl('start' as 'start' | 'end');

  title = 'inventory-app';

  buttonText!: string;

  mailId!: string;
  sidenav: any;
  // hideSidenav!: boolean;
// sidenav: any;
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

  // ngDoCheck() {
  //   this.isAuthenticated = sessionStorage.getItem('authenticated') !== null;
  //   // this.buttonText = this.isAuthenticated ? sessionStorage.getItem('authenticated')?.charAt(0).toUpperCase() : '';
  //   this.mailId = this.isAuthenticated ? sessionStorage.getItem('authenticated') || '' : '';
  // }

  // ngDoCheck(){
  //   // console.log(this.router.url);
  //   this.hideSidenav = this.router.url.includes("/login") || this.router.url.includes("/signup");
  //   console.log(this.hideSidenav);
    
  // }

  // for admin account management thing
  openDialog(){
    
  }

  logout() {
    // TODO: logout and how to actually logout?
    sessionStorage.removeItem('authenticated');
    this.router.navigate(['/login']);
  }
}
