import RenderClear from './RenderClear.js';
import Tag from '../ui/Tag.js';

export default function RenderTags(searchMethods) {
  const HTMLRenderTags = document.querySelector('#RenderTags');

  RenderClear(HTMLRenderTags, 'div');

  for (const tag of searchMethods.getTags()) {
    HTMLRenderTags.appendChild(Tag(tag, searchMethods));
  }
}
