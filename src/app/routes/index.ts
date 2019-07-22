import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
// import { MsalGuard } from "@azure/msal-angular";

export const RouteComponents = [HomeComponent];

export const Routes: Route[] = [
  { path: "home", component: HomeComponent }, // , canActivate: [MsalGuard] },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
