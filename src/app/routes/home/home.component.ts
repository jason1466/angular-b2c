import { Component, OnInit } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Subscription } from "rxjs";
import { GraphqlService } from "../../services";
import { RecipeCreateDto } from "../../models";

@Component({
  selector: "home-route",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  public userInfo: any = null;
  private subscription: Subscription;
  public isIframe: boolean;
  public newRecipe: RecipeCreateDto;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private gqlService: GraphqlService
  ) {
    //  This is to avoid reload during acquireTokenSilent() because of hidden iframe
    this.isIframe = window !== window.parent && !window.opener;
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngOnInit(): void {
    this.getRecipes();

    this.broadcastService.subscribe("msal:loginFailure", payload => {
      console.log("login failure " + JSON.stringify(payload));
      this.loggedIn = false;
    });

    this.broadcastService.subscribe("msal:loginSuccess", payload => {
      console.log("login success " + JSON.stringify(payload));
      this.loggedIn = true;
    });
  }

  getRecipes() {
    console.log("gqlService.getRecipes(): About to call API");
    this.gqlService.getRecipes().subscribe(() => {
      console.log("gqlService.getRecipes(): Back from API");
    });
    // this.newRecipe = {
    //   title: "string",
    //   description: "string string string string string string",
    //   ingredients: ["flower", "water"]
    // };
    // this.gqlService.createRecipe(this.newRecipe).subscribe(() => {
    //   console.log("new record id: ", this.gqlService.createdRecipe._id);
    // });
    // this.gqlService.getRecipe("5d27ae4c15031b139f6b0c0c").subscribe(() => {
    //   console.log(
    //     "current record date: ",
    //     new Date(this.gqlService.recipe.createdAt)
    //   );
    // });
    // this.gqlService
    //   .getRecipes()
    //   .pipe()
    //   .subscribe(x => {
    //     this.gqlService.recipes.forEach(recipe => {
    //       if (recipe.title === "string") {
    //         this.gqlService.deleteRecipe(recipe._id);
    //       }
    //     });
    //   });
  }

  login() {
    this.authService.loginPopup([
      // "https://TeamWiz.onmicrosoft.com/app/user.read",
      "https://TeamWiz.onmicrosoft.com/app/demo.read"
    ]);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
