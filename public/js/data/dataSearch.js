/**
 * Searches for recipes based on the given search term and a specified property.
 *
 * @param {string} search - The search term.
 * @param {Array} recipes - The array of recipes to search within.
 * @param {Function} getProperty - A function that takes a recipe and returns the property to search in.
 * @returns {Array} - An array of recipes that match the search criteria.
 */
export function searchByPropertyAlternative(search, recipes, getProperty) {
  const searchWords = search.trim().toLowerCase().split(' ');

  return recipes.filter(recipe =>
    searchWords.every(word =>
      getProperty(recipe).toLowerCase().includes(word),
    ),
  );
}

/**
 * Searches for recipes based on utensils.
 *
 * @param {string} search - The search term.
 * @param {Array} recipes - The array of recipes to search within.
 * @returns {Array} - An array of recipes that match the search criteria.
 */
export function searchByUtensilsAlternative(search, recipes) {
  const searchWords = search.trim().toLowerCase().split(' ');

  return recipes.filter(recipe =>
    recipe.ustensils.some(utensil =>
      searchWords.every(word => utensil.toLowerCase().includes(word)),
    ),
  );
}

/**
 * Searches for recipes based on ingredients.
 *
 * @param {string} search - The search term.
 * @param {Array} recipes - The array of recipes to search within.
 * @returns {Array} - An array of recipes that match the search criteria.
 */
export function searchByIngredientsAlternative(search, recipes) {
  const searchWords = search.trim().toLowerCase().split(' ');

  return recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      searchWords.every(word =>
        ingredient.ingredient.toLowerCase().includes(word),
      ),
    ),
  );
}

/**
 * Performs a comprehensive search on recipes based on multiple properties.
 *
 * @param {string} search - The search term.
 * @param {Array} recipes - The array of recipes to search within.
 * @returns {Array} - An array of unique recipes that match the search criteria.
 */
export default function dataSearch(search, recipes) {
  const result = [
    ...searchByPropertyAlternative(search, recipes, recipe => recipe.name),
    ...searchByPropertyAlternative(search, recipes, recipe => recipe.description),
    ...searchByPropertyAlternative(search, recipes, recipe => recipe.appliance),
    ...searchByUtensilsAlternative(search, recipes),
    ...searchByIngredientsAlternative(search, recipes),
  ];

  return [...new Set(result)];
}
