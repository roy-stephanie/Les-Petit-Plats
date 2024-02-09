export default function RenderLength(length) {
  const HTMLRenderLength = document.querySelector('#RenderLength');
  const div_Container = document.createElement('div');
  const p_Length = document.createElement('p');

  const formattedLength = length.length <= 9 ? `0${length.length}` : length.length;

  p_Length.textContent = `${formattedLength} Recette${length.length !== 1 ? 's' : ''}`;

  div_Container.appendChild(p_Length);
  HTMLRenderLength.appendChild(div_Container);
}
