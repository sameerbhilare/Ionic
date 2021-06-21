import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
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

  ngOnInit() {}
}
