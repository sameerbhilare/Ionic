import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Chicken Burger',
      imageUrl:
        'https://media.istockphoto.com/photos/chicken-burger-picture-id172449461',
      ingredients: ['French Fries', 'Chicken', 'Cheese'],
    },
    {
      id: 'r2',
      title: 'French Fries',
      imageUrl:
        'https://static.toiimg.com/thumb/54659021.cms?imgsize=275086&width=509&height=340',
      ingredients: ['French Fries', 'Potato'],
    },
  ];

  constructor() {}

  getAllRecipes() {
    console.log('getAllRecipes', this.recipes);
    return [...this.recipes]; // return a copy of recipes
  }

  getRecipe(recipeId: string) {
    return { ...this.recipes.find((recipe) => recipe.id === recipeId) }; // return a copy of found recipe
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
    console.log('deleteRecipe', this.recipes);
  }
}
