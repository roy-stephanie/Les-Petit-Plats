export default function EventSearch(searchMethods) {
  const HTMLHeaderSearchForm = document.querySelector('#HeaderSearchForm');
  const HTMLHeaderSearchFormInput = document.querySelector('#HeaderSearchFormInput');
  const HTMLHeaderSearchFormLabel = document.querySelector('#HeaderSearchFormLabel');

  HTMLHeaderSearchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    renderEventChangeImgStatusLabel();
    searchMethods.setSearch(HTMLHeaderSearchFormInput.value);
  });

  HTMLHeaderSearchFormLabel.addEventListener('click', (ev) => {
    renderEventChangeImgStatusLabel();
    searchMethods.setSearch(HTMLHeaderSearchFormInput.value);
  });

  HTMLHeaderSearchForm.addEventListener('input', (ev) => {
    if (HTMLHeaderSearchFormInput.value.length >= 3) {
      searchMethods.setSearch(HTMLHeaderSearchFormInput.value);
    }
  });

  const renderChangeImgStatusLabel = (state = false) => {
    const img_Search = document.createElement('img');

    if (state) img_Search.setAttribute('src', `public/images/label-active.svg`);
    if (!state) img_Search.setAttribute('src', `public/images/label-default.svg`);

    img_Search.setAttribute('alt', `Rechercher`);

    img_Search.classList.add('HeaderSearchLabelImg');
    HTMLHeaderSearchFormLabel.innerHTML = '';
    HTMLHeaderSearchFormLabel.appendChild(img_Search);
    return img_Search;
  };

  const renderEventChangeImgStatusLabel = () => {
    renderChangeImgStatusLabel(true);

    setTimeout(() => {
      renderChangeImgStatusLabel(false);
    }, 250);
  };

  HTMLHeaderSearchFormLabel.appendChild(renderChangeImgStatusLabel());
}
