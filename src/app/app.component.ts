import { Component } from '@angular/core';
import { DataService } from './data.service';
import {  ActivatedRoute, Router  } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataService],
})
export class AppComponent {
  title = 'inventory-app';

  buttonText!: string;

  mailId = sessionStorage.getItem('authenticated');
  constructor(private route: ActivatedRoute, protected router: Router) {}

  isAuthenticated!: boolean;

  ngOnInit(){

    this.router.events.pipe()
    .subscribe(() => {
      this.isAuthenticated = sessionStorage.getItem('authenticated') != undefined;
      this.buttonText = sessionStorage.getItem('authenticated')?.charAt(0).toUpperCase() || '';

      this.updateTitle();
    });

      this.updateTitle();

  }

  private updateTitle(){

    const currentRoute = this.route.firstChild?.snapshot;
    const pageTitle = currentRoute?.data?.['title'] || "" ;

    if(pageTitle){
      this.title = `${pageTitle}`;
    }
    else{
      this.title = "";
    }
}

logout(){
  sessionStorage.removeItem('authenticated');
  this.router.navigate(["/login"]);
}

}
