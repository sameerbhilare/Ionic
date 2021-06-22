import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertCtr: AlertController
  ) {}

  ngOnInit() {
    console.log('RecipeDetailPage ngOnInit');
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // 'recipeId' is defined in the routing module
      if (!paramMap.has('recipeId')) {
        // redirect
        this.router.navigate(['/recipes']);
        return;
      }

      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  async onDeleteRecipe() {
    // define the alert
    const alert = await this.alertCtr.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete Cancelled!');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete Confirmed!');
            this.recipeService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
          },
        },
      ],
    });

    // present the alert
    await alert.present();
  }

  ionViewWillEnter() {
    console.log('RecipeDetailPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('RecipeDetailPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('RecipeDetailPage ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('RecipeDetailPage ionViewDidLeave');
  }

  ngOnDestroy() {
    // ngOnDestroy gets called when the topmost page is popped off the stack of pages.
    console.log('RecipeDetailPage ngOnDestroy');
  }
}
