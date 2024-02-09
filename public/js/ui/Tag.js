export default function Tag(tag, searchMethods) {
  const div_TagContainer = document.createElement('div');
  const div_TagCloseContainer = document.createElement('div');

  const renderTag = () => {
    const img_TagContainer = document.createElement('div');
    const p_Tag = document.createElement('p');
    const img_Close = document.createElement('img');

    img_Close.setAttribute('src', `public/images/close-tag.svg`);
    p_Tag.textContent = tag;
    p_Tag.classList.add('overflow-ellipsis');

    div_TagContainer.classList.add('Tag');
    div_TagCloseContainer.classList.add('TagClose');

    div_TagContainer.appendChild(p_Tag);
    img_TagContainer.appendChild(img_Close);
    div_TagCloseContainer.appendChild(img_TagContainer);

    return div_TagCloseContainer;
  };

  const renderEventCloseTag = () => {
    div_TagCloseContainer.addEventListener('click', () => {
      div_TagContainer.remove();
      searchMethods.removeTag(tag);
    });
  };

  const renderContainer = () => {
    div_TagContainer.appendChild(renderTag());

    renderEventCloseTag();
    return div_TagContainer;
  };

  return renderContainer();
}
