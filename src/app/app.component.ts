import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser'; // Import AccountInfo if you're using TypeScript 4.1+


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  account: AccountInfo | null = null;

  constructor(private msalService: MsalService) {}

  title = 'Employee-app';
  ngOnInit() {
  // Check if user is logged in
    this.loggedIn = this.msalService.instance.getAllAccounts().length > 0;

    // Get the active account if user is logged in
    if (this.loggedIn) {
      this.account = this.msalService.instance.getActiveAccount();
    }
  }

  login() {
    // Call login method to initiate login process
    this.msalService.loginPopup().subscribe(() => {
      // Update login status and account info after successful login
      this.loggedIn = true;
      this.account = this.msalService.instance.getActiveAccount();
    });
  }

  logout() {
    // Call logout method to sign out the user
    this.msalService.logout();
    // Update login status and account info after logout
    this.loggedIn = false;
    this.account = null;
  }
}
