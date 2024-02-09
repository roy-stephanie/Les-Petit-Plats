import data from '../data/data.js';
import OptionsExtract from '../data/optionsExtract.js';

/**
 * Recipes factory function that creates an object containing recipes and related options.
 *
 * @param {Array} recipes - The array of recipes (optional, defaults to null).
 * @returns {Object} - An object containing recipes, recipe options, and length.
 */
const Recipes = (recipes = null) => ({
  recipes: recipes || data, // Set recipes to the provided array or use the default 'data'
  recipe_options: [{
    title: 'Ingrédients',
    data: OptionsExtract(recipes || data, 'ingredients', 'ingredient'),
  }, {
    title: 'Appareils',
    data: OptionsExtract(recipes || data, 'appliance'),
  }, {
    title: 'Ustensiles',
    data: OptionsExtract(recipes || data, 'ustensils'),
  }],
  length: (recipes || data).length, // Calculate the length of recipes
});

// Create a default set of recipes using the 'data' array
const saveRecipes = Recipes(data);

export default Recipes;
