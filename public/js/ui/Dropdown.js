export default function Dropdown(title, options, searchMethods) {
  const div_OptionsContainer = document.createElement('div');
  const input_SearchOptions = document.createElement('input');
  const resetButton = document.createElement('span');

  const renderTitle = () => {
    const div_DropdownOptionContainer = document.createElement('div');
    const p_DropdownOption = document.createElement('p');
    const arrow = renderArrow();

    p_DropdownOption.textContent = title;
    p_DropdownOption.classList.add('DropdownTitle');

    div_DropdownOptionContainer.classList.add('Dropdown');
    div_DropdownOptionContainer.appendChild(p_DropdownOption);
    div_DropdownOptionContainer.appendChild(arrow);

    div_DropdownOptionContainer.addEventListener('click', () => {
      const optionsContainer = div_DropdownOptionContainer.nextElementSibling;
      arrow.classList.toggle('rotate');
      arrow.classList.toggle('rotate180');
      optionsContainer.classList.toggle('Hidden');
    });

    return div_DropdownOptionContainer;
  };

  const renderArrow = () => {
    const div_ArrowContainer = document.createElement('div');
    const img_Arrow = document.createElement('img');

    img_Arrow.setAttribute('src', `public/images/arrow.svg`);
    img_Arrow.setAttribute('alt', `dropdown`);

    div_ArrowContainer.classList.add('arrow');
    div_ArrowContainer.classList.add('rotate180');

    div_ArrowContainer.appendChild(img_Arrow);
    return div_ArrowContainer;
  };

  const renderOptions = () => {
    const div_OptionContainer = document.createElement('div');

    div_OptionContainer.classList.add('DropdownContent');
    div_OptionContainer.classList.add('Hidden');
    div_OptionContainer.appendChild(renderSearchOptions());

    return div_OptionContainer;
  };

  const renderSearchOptions = () => {
    const form_SearchOptions = document.createElement('form');
    const label_SearchOptions = document.createElement('label');
    const img_Label_SearchOptions = document.createElement('img');

    label_SearchOptions.setAttribute('for', `input-${title.toLowerCase()}`);
    input_SearchOptions.setAttribute('id', `input-${title.toLowerCase()}`);
    img_Label_SearchOptions.setAttribute('src', `public/images/search.svg`);
    img_Label_SearchOptions.setAttribute('alt', `Recherche`);

    div_OptionsContainer.classList.add('DropdownSearchOptions');
    label_SearchOptions.appendChild(img_Label_SearchOptions);
    form_SearchOptions.appendChild(input_SearchOptions);
    form_SearchOptions.appendChild(label_SearchOptions);
    div_OptionsContainer.appendChild(form_SearchOptions);
    div_OptionsContainer.appendChild(renderOption(options));

    renderEventSearchOptions(input_SearchOptions);
    return div_OptionsContainer;
  };

  const renderOption = (options) => {
    const div_OptionContainer = document.createElement('div');

    div_OptionContainer.classList.add('DropdownOption');

    for (const option of options) {
      const div_OptionValueContainer = document.createElement('div');
      const div_OptionValueSelectedContainer = document.createElement('div');
      const p_Option = document.createElement('p');
      const p_OptionSelected = document.createElement('p');

      div_OptionValueContainer.classList.add('DropdownOptionsItem');

      if (searchMethods.getTags().length > 0 && searchMethods.getTags().find(item => item === option)) {

        p_OptionSelected.textContent = option;
        div_OptionValueContainer.classList.add('OptionsSelected');

        div_OptionValueSelectedContainer.appendChild(p_OptionSelected);
        div_OptionValueContainer.appendChild(div_OptionValueSelectedContainer);
        renderEventRemoveSelectedOptions(div_OptionValueContainer);
      } else {
        p_Option.textContent = option;
        div_OptionValueContainer.appendChild(p_Option);
        renderEventSelectedOptions(div_OptionValueContainer);
      }

      div_OptionContainer.appendChild(div_OptionValueContainer);
    }
    return div_OptionContainer;
  };

  const renderCloseForRemoveItemInTag = () => {
    const div_CloseRemoveItemInTagContainer = document.createElement('div');
    const img_CloseRemoveItemInTag = document.createElement('img');

    img_CloseRemoveItemInTag.setAttribute('src', `public/images/close.svg`);
    img_CloseRemoveItemInTag.setAttribute('alt', `close`);
    div_CloseRemoveItemInTagContainer.classList.add('CloseRemoveItemInTag');
    div_CloseRemoveItemInTagContainer.appendChild(img_CloseRemoveItemInTag);

    renderEventCloseForRemoveItemInTag(img_CloseRemoveItemInTag);
    return div_CloseRemoveItemInTagContainer;
  };

  const renderEventRemoveSelectedOptions = (element) => {
    const el = element.children[0];

    element.addEventListener('mouseenter', () => {
      element.appendChild(renderCloseForRemoveItemInTag());
    });

    element.addEventListener('mouseleave', () => {
      const removeClose = Array.from(el.parentNode.getElementsByClassName('CloseRemoveItemInTag'));
      removeClose.forEach(close => close.remove());
    });
  };

  const renderEventSelectedOptions = (element) => {
    const el = element.children[0];

    element.addEventListener('click', (ev) => {
      searchMethods.setTags(el.textContent);
      ev.stopPropagation();
    });
  };

  const renderEventCloseForRemoveItemInTag = (element) => {
    element.addEventListener('click', (ev) => {
      const elements = ev.target.parentNode.parentNode;
      searchMethods.removeTag(elements.childNodes[0].textContent);
    });
  };

  const renderEventSearchOptions = (element) => {
    element.addEventListener('input', (e) => {
      element.parentNode.appendChild(renderEventSearchOptionsClose());
      removeOptions(div_OptionsContainer.childNodes);
      div_OptionsContainer.appendChild(renderOption(renderAllOptions(e.target.value)));
    });
  };

  const renderEventSearchOptionsClose = () => {
    resetButton.classList.add('reset-button');
    if (input_SearchOptions.value !== '') resetButton.textContent = 'X';

    resetButton.addEventListener('click', (ev) => {
      input_SearchOptions.focus();
      resetButton.remove();
      input_SearchOptions.value = '';
      removeOptions(div_OptionsContainer.childNodes);
      div_OptionsContainer.appendChild(renderOption(renderAllOptions()));
    });

    return resetButton;
  };

  const renderAllOptions = (search = undefined) => {
    if (search) return options.filter(item => item.toLowerCase().includes(search));
    return options;
  };

  const removeOptions = () => {
    const div_Nodes = Array.from(div_OptionsContainer.childNodes);
    const div_Elements = div_Nodes.filter(node => node.nodeType === 1 && node.tagName.toLowerCase() === 'div');

    div_Elements.forEach(div_Element => div_Element.remove());
  };

  const renderContainer = () => {
    const div_Container = document.createElement('div');

    div_Container.appendChild(renderTitle());
    div_Container.appendChild(renderOptions());

    return div_Container;
  };

  return renderContainer();
}
