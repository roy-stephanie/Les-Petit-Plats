export default function Recipe(recipe) {
  const renderHeader = () => {
    const div_HeaderContainer = document.createElement('div');
    const img_Header = document.createElement('img');
    const div_HeaderTimeContainer = document.createElement('div');
    const p_HeaderTime = document.createElement('p');

    p_HeaderTime.textContent = `${recipe.time}min`;

    img_Header.setAttribute('src', `public/images/recipes/${recipe.image}`);
    img_Header.setAttribute('alt', `${recipe.name}`);
    div_HeaderContainer.classList.add('RecipesHeader');
    div_HeaderTimeContainer.classList.add('RecipesHeaderTime');

    div_HeaderTimeContainer.appendChild(p_HeaderTime);
    div_HeaderContainer.appendChild(img_Header);
    div_HeaderContainer.appendChild(div_HeaderTimeContainer);
    return div_HeaderContainer;
  };

  const renderContentTitle = () => {
    const div_ContentTitleContainer = document.createElement('div');
    const p_ContentTitle = document.createElement('p');

    div_ContentTitleContainer.classList.add('RecipesContentTitle');
    p_ContentTitle.textContent = recipe.name;

    div_ContentTitleContainer.appendChild(p_ContentTitle);
    return div_ContentTitleContainer;
  };

  const renderContentDescription = () => {
    const div_ContentDescriptionContainer = document.createElement('div');
    const p_ContentDescriptionTitle = document.createElement('p');
    const p_ContentDescription = document.createElement('p');

    p_ContentDescriptionTitle.textContent = 'Recette'.toUpperCase();
    p_ContentDescriptionTitle.classList.add('RecetteContentDescriptionTitle');
    div_ContentDescriptionContainer.classList.add('RecetteContentDescription');

    p_ContentDescription.appendChild(truncateText(recipe.description, 140));
    div_ContentDescriptionContainer.appendChild(p_ContentDescriptionTitle);
    div_ContentDescriptionContainer.appendChild(p_ContentDescription);

    return div_ContentDescriptionContainer;
  };

  const renderContentIngredients = () => {
    const div_ContentIngredientsContainer = document.createElement('div');
    const div_ListIngredientsContainer = document.createElement('div');
    const p_ContentIngredientsTitle = document.createElement('p');

    p_ContentIngredientsTitle.textContent = 'Ingrédients'.toUpperCase();
    div_ContentIngredientsContainer.classList.add('RecetteContentIngredients');
    p_ContentIngredientsTitle.classList.add('RecetteContentIngredientsTitle');
    div_ListIngredientsContainer.classList.add('RecetteListIngredients');

    for (const ingredient of recipe.ingredients) {
      div_ListIngredientsContainer.appendChild(renderContentIngredientItem(ingredient));
    }

    div_ContentIngredientsContainer.appendChild(p_ContentIngredientsTitle);
    div_ContentIngredientsContainer.appendChild(div_ListIngredientsContainer);

    return div_ContentIngredientsContainer;
  };

  const renderContentIngredientItem = (ingredient) => {
    const div_ContentIngredientItemContainer = document.createElement('div');
    const p_ContentIngredientItem = document.createElement('p');
    const p_ContentIngredientItemQuantity = document.createElement('p');

    p_ContentIngredientItem.textContent = ingredient.ingredient;
    p_ContentIngredientItemQuantity.textContent = renderContentIngredientValues(ingredient);
    p_ContentIngredientItemQuantity.classList.add('IngredientItemQuantity');
    div_ContentIngredientItemContainer.classList.add('ContentIngredientItem');

    div_ContentIngredientItemContainer.appendChild(p_ContentIngredientItem);
    div_ContentIngredientItemContainer.appendChild(p_ContentIngredientItemQuantity);
    return div_ContentIngredientItemContainer;
  };

  const renderContentIngredientValues = (ingredient) => {
    let elementsContentIngredientValues = undefined;

    switch (true) {
      case 'quantity' in ingredient && !('unit' in ingredient):
        elementsContentIngredientValues = ingredient.quantity
        break;
      case 'quantity' in ingredient && 'unit' in ingredient:
        elementsContentIngredientValues = `${ingredient.quantity} ${ingredient.unit}`;
        break;
      default:
        elementsContentIngredientValues = ``;
    }

    return elementsContentIngredientValues;
  }

  const renderContent = () => {
    const div_ContentContainer = document.createElement('div');

    div_ContentContainer.classList.add('RecipesContent');

    div_ContentContainer.appendChild(renderContentTitle());
    div_ContentContainer.appendChild(renderContentDescription());
    div_ContentContainer.appendChild(renderContentIngredients());
    return div_ContentContainer;
  };

  const renderContainer = () => {
    const div_RecipeContainer = document.createElement('div');

    div_RecipeContainer.appendChild(renderHeader());
    div_RecipeContainer.appendChild(renderContent());

    return div_RecipeContainer;
  };

  return renderContainer();
}

function truncateText(text, maxLength) {
  const div_Container = document.createElement('div');

  if (text.length <= maxLength) {
    div_Container.textContent = text;
  } else {
    const truncatedText = text.substring(0, maxLength) + '...';
    const readMoreButton = document.createElement('span');

    readMoreButton.textContent = 'Lire la suite';
    readMoreButton.classList.add('RecipesContentDescriptionReadMore');

    readMoreButton.addEventListener('click', () => {
      div_Container.textContent = text;
    });

    div_Container.textContent = truncatedText;
    div_Container.appendChild(readMoreButton);
  }

  return div_Container;
}
