import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { ServicesModule } from "./services.module";
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { AppComponent } from "./app.component";
import { ApolloModule } from "apollo-angular";
import { HttpLinkModule } from "apollo-angular-link-http";
import { Routes, RouteComponents } from "./routes";
import { Components } from "./components";
import { Dialogs } from "./dialogs";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LogLevel } from "msal";

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging: " + message);
}

export const protectedResourceMap: [string, string[]][] = [
  [
    "https://kk2go.sse.codesandbox.io/graphql",
    ["https://TeamWiz.onmicrosoft.com/api/demo.read"]
  ]
  // [
  //   "https://graph.microsoft.com/v1.0/me", 
  //   ["https://TeamWiz.onmicrosoft.com/api/user.read"]
  // ]
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MaterialModule,
    ServicesModule,
    RouterModule.forRoot(Routes),
    MsalModule.forRoot({
      clientID: "88567dbd-25f5-4652-bc27-d0718a269ad5",
      authority:
        "https://login.microsoftonline.com/tfp/TeamWiz.onmicrosoft.com/B2C_1_signupsignin1",
      redirectUri: "https://angular-b2c.stackblitz.io",
      validateAuthority: true,
      cacheLocation: "localStorage",
      // postLogoutRedirectUri: "https://angular-b2c.stackblitz.io",
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: [
        // "https://TeamWiz.onmicrosoft.com/api/user.read",
        "https://TeamWiz.onmicrosoft.com/api/demo.read"
      ],
      unprotectedResources: [
        "https://angular.io/"
        // "https://98h5l.sse.codesandbox.io/"
      ],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: "1234",
      level: LogLevel.Error,
      piiLoggingEnabled: false
    })
  ],
  declarations: [
    AppComponent,
    [...RouteComponents],
    [...Components],
    [...Dialogs]
  ],
  entryComponents: [[...Dialogs]],
  bootstrap: [AppComponent],
  providers: [
    // RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
