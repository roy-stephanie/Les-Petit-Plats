import RenderClear from './RenderClear.js';
import Recipe from '../ui/Recipe.js';

export default function RenderRecipes(recipes, searchMethods) {
  const HTMLRenderRecipes = document.querySelector('#RenderRecipes');
  const HTMLRenderRecipesError = document.querySelector('#RenderRecipesError');

  RenderClear(HTMLRenderRecipes, 'article');

  if (recipes.length === 0) {
    const div_ErrorRecipes = document.createElement('div');

    div_ErrorRecipes.classList.add('ErrorView');
    div_ErrorRecipes.textContent = `Aucune recette ne contient « ${searchMethods.getSearch()} » vous pouvez chercher tarte aux pommes, poisson, etc.`;

    // Anti Spam Submit
    RenderClear(HTMLRenderRecipesError, 'div');
    HTMLRenderRecipesError.appendChild(div_ErrorRecipes);
  } else {
    RenderClear(HTMLRenderRecipesError, 'div');
  }

  for (const recipe of recipes.recipes) {
    const article_Recipes = document.createElement('article');

    article_Recipes.classList.add('Recipes');
    article_Recipes.appendChild(Recipe(recipe));
    HTMLRenderRecipes.appendChild(article_Recipes);
  }
}
