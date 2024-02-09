import RenderClear from './RenderClear.js';
import Dropdown from '../ui/Dropdown.js';

export default function RenderOptions(recipe_options, searchMethods) {
  const HTMLRenderOptions = document.querySelector('#RenderOptions');

  RenderClear(HTMLRenderOptions, 'div');

  const div_Container = document.createElement('div');
  div_Container.classList.add('OptionsRecipes');

  for (const option of recipe_options.recipe_options) {
    div_Container.appendChild(Dropdown(option.title, option.data, searchMethods));
    HTMLRenderOptions.appendChild(div_Container);
  }
}
