import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MsalModule, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular'; // Import MsalInterceptor, MsalInterceptorConfiguration, and MsalGuardConfiguration
import { PublicClientApplication, InteractionType } from '@azure/msal-browser'; // Import InteractionType
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

 // MSAL Configuration
 const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

 const msalConfig = {
   auth: {
     clientId: "8f585a0d-6a06-4f48-881c-8fc8015683de", // Client ID of your registered application in Azure AD
     authority:"https://login.microsoftonline.com/f3211d0e-125b-42c3-86db-322b19a65a22/", // Tenant ID of your Azure AD
     redirectUri: "http://localhost:49789/" ,
   },
   cache: {
     cacheLocation: 'localStorage',
     storeAuthStateInCookie: isIE,
   },
 };
 
 const msalRequest = {
   scopes: ['openid', 'profile', 'user.read'],
 };

@NgModule({
  declarations: [
    AppComponent,
    RegisterEmployeeComponent,
    EmployeeDetailsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect,
        authRequest: msalRequest
      } as MsalGuardConfiguration,
      {} as MsalInterceptorConfiguration
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
