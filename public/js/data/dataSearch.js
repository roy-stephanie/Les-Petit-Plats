/**
 * Search recipes with multiple properties.
 *
 * @param {string} search - Words to search.
 * @param {Array} recipes - The recipes to search in.
 * @param {Function} getProperty - The function to get property from recipe.
 * @return {Array} result - The recipes that match the search words.
 */

export function searchByPropertyAlternativeFor(search, recipes, getProperty) {
  const searchWords = search.trim().toLowerCase().split(' ');
  const result = [];

  for (const recipe of recipes) {
    const property = getProperty(recipe).toLowerCase();
    if (searchWords.every(word => property.includes(word))) {
      result.push(recipe);
    }
  }

  return result;
}

/**
 * Search recipes by utensils.
 *
 * @param {string} search - Words to search.
 * @param {Array} recipes - The recipes to search in.
 * @return {Array} result - The recipes that match the search words.
 */

export function searchByUtensilsAlternativeFor(search, recipes) {
  const searchWords = search.trim().toLowerCase().split(' ');
  const result = [];

  for (const recipe of recipes) {
    for (const utensil of recipe.ustensils) {
      if (searchWords.every(word => utensil.toLowerCase().includes(word))) {
        result.push(recipe);
        break;
      }
    }
  }

  return result;
}

/**
 * Search recipes by ingredients.
 *
 * @param {string} search - Words to search.
 * @param {Array} recipes - The recipes to search in.
 * @return {Array} result - The recipes that match the search words.
 */

export function searchByIngredientsAlternativeFor(search, recipes) {
  const searchWords = search.trim().toLowerCase().split(' ');
  const result = [];

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (searchWords.every(word => ingredient.ingredient.toLowerCase().includes(word))) {
        result.push(recipe);
        break;
      }
    }
  }

  return result;
}

/**
 * Data search for recipes.
 *
 * @param {string} search - Words to search.
 * @param {Array} recipes - The recipes to search in.
 * @return {Array} result - The unique recipes that match the search words.
 */

export default function dataSearch(search, recipes) {
  const result = [
    ...searchByPropertyAlternativeFor(search, recipes, recipe => recipe.name),
    ...searchByPropertyAlternativeFor(search, recipes, recipe => recipe.description),
    ...searchByPropertyAlternativeFor(search, recipes, recipe => recipe.appliance),
    ...searchByUtensilsAlternativeFor(search, recipes),
    ...searchByIngredientsAlternativeFor(search, recipes),
  ];

  return [...new Set(result)];
}
