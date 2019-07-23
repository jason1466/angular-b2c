import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { Recipe, RecipeCreateDto, RecipeUpdateDto } from "../models";

@Injectable({
  providedIn: "root"
})
export class GraphqlService {
  public recipes: Recipe[];
  public recipe: Recipe;
  public createdRecipe: Recipe;
  public updatedRecipe: Recipe;

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: "https://98h5l.sse.codesandbox.io/graphql"
      }),
      cache: new InMemoryCache()
    });
  }

  public getRecipes = () => {
    const obs = this.apollo.query<any>({
      query: gql`
        query getRecipes {
          recipes {
            _id
            createdAt
            createdBy
            updatedAt
            updatedBy
            title
            description
            ingredients
          }
        }
      `
    });
    obs.subscribe(result => {
      this.recipes = result.data.recipes as Recipe[];
      console.log(this.recipes);
    });
    return obs;
  };

  public getRecipe = id => {
    const obs = this.apollo.query<any>({
      query: gql`
        query getRecipe($recipeID: String!) {
          recipe(id: $recipeID) {
            _id
            createdAt
            createdBy
            updatedAt
            updatedBy
            title
            description
            ingredients
          }
        }
      `,
      variables: { recipeID: id }
    });
    obs.subscribe(result => {
      this.recipe = result.data.recipe as Recipe;
      console.log(this.recipe);
    });
    return obs;
  };

  public createRecipe = (recipeToCreate: RecipeCreateDto) => {
    const obs = this.apollo.mutate({
      mutation: gql`
        mutation($recipe: NewRecipeInput!) {
          addRecipe(recipe: $recipe) {
            _id
            createdAt
            createdBy
            updatedAt
            updatedBy
            title
            description
            ingredients
          }
        }
      `,
      variables: { recipe: recipeToCreate }
    });
    obs.subscribe(result => {
      this.createdRecipe = result.data.addRecipe as Recipe;
    });
    return obs;
  };

  public updateRecipe = (recipeToUpdate: RecipeUpdateDto) => {
    const obs = this.apollo.mutate({
      mutation: gql`
        mutation($recipe: RecipeInput!) {
          updateRecipe(recipe: $recipe) {
            _id
            createdAt
            createdBy
            updatedAt
            updatedBy
            title
            description
            ingredients
          }
        }
      `,
      variables: { recipe: recipeToUpdate }
    });
    obs.subscribe(result => {
      this.updatedRecipe = result.data.updateRecipe as Recipe;
    });
    return obs;
  };

  public deleteRecipe = (id: string) => {
    const obs = this.apollo.mutate({
      mutation: gql`
        mutation($id: String!) {
          removeRecipe(id: $id)
        }
      `,
      variables: { id: id }
    });
    obs.subscribe(res => {
      console.log(res.data);
    });
    return obs;
  };
}
