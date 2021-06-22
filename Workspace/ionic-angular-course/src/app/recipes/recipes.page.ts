import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[];
  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    console.log('RecipesPage ngOnInit');
  }

  ionViewWillEnter() {
    console.log('RecipesPage ionViewWillEnter');
    this.recipes = this.recipeService.getAllRecipes();
  }

  ionViewDidEnter() {
    console.log('RecipesPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('RecipesPage ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('RecipesPage ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('RecipesPage ngOnDestroy');
  }
}
