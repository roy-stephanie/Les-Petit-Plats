import Recipes from '../entity/recipes.js';
import DataSearch from '../data/dataSearch.js';
import RenderOptions from './RenderOptions.js';
import RenderTags from './RenderTags.js';
import RenderLength from './RenderLength.js';
import RenderRecipes from './RenderRecipes.js';

/**
 * Render function that orchestrates the rendering of different components based on search criteria.
 *
 * @param {Object} searchMethods - An object with methods for managing search and tags.
 * @param {function} searchMethods.getSearch - A function to retrieve the current search string.
 * @param {function} searchMethods.setSearch - A function to set the search string.
 * @param {function} searchMethods.getTags - A function to retrieve the current array of tags.
 * @param {function} searchMethods.setTags - A function to set tags in the state.
 * @param {function} searchMethods.removeTag - A function to remove a tag from the state.
 */
export default function Render(searchMethods) {
  // Clone the initial recipes data
  let dataRecipes = [...Recipes().recipes];

  // Apply search if there is a search query
  if (!!searchMethods.getSearch()) {
    dataRecipes = DataSearch(searchMethods.getSearch(), dataRecipes);
  }

  // Apply search for each tag if there are tags
  if (searchMethods.getTags()) {
    for (const tag of searchMethods.getTags()) {
      dataRecipes = DataSearch(tag, dataRecipes);
    }
  }

  // Update recipes data with the filtered results
  dataRecipes = Recipes(dataRecipes);

  // Render different components
  RenderOptions(dataRecipes, searchMethods);
  RenderTags(searchMethods);
  RenderLength(dataRecipes);
  RenderRecipes(dataRecipes, searchMethods);
}
