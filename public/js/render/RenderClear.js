export default function RenderClear(HTMLElement, HTMLTag) {
  const nodes = HTMLElement.getElementsByTagName(HTMLTag);
  // Clear all 'div' child nodes
  while (nodes[0]) {
    nodes[0].parentNode.removeChild(nodes[0]);
  }
}
