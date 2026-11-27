import { render } from '@testing-library/react';
import ManifestListItem from '../src/components/ManifestListItem';
import ManifestListTools from '../src/components/ManifestListTools';

vi.mock('../src/containers/ManifestListTools', () => ({
  default: () => <span data-testid="tools" />,
}));

// MUI 9 removed the layout props of Box (display, alignItems, gap, ...): they
// are no longer applied and reach the DOM as unknown attributes.
const LAYOUT_ATTRIBUTES = ['display', 'flexdirection', 'justifycontent', 'alignitems', 'gap', 'width'];

/** Lists the layout props that ended up as DOM attributes. */
function leakedAttributes(container) {
  return [...container.querySelectorAll('*')].flatMap((element) => (
    LAYOUT_ATTRIBUTES.filter((name) => element.hasAttribute(name))
      .map((name) => `${element.tagName.toLowerCase()}[${name}]`)
  ));
}

describe('layout under MUI 9', () => {
  it('ManifestListItem lays the item and its tools out in a row', () => {
    const { container } = render(
      <ManifestListItem TargetComponent={() => <span>manifest</span>} targetProps={{}} />,
    );
    expect(leakedAttributes(container)).toEqual([]);
    const style = getComputedStyle(container.firstChild);
    expect(style.display).toBe('flex');
    expect(style.flexDirection).toBe('row');
    expect(style.alignItems).toBe('center');
  });

  it('ManifestListTools stacks its buttons in a column', () => {
    const { container } = render(
      <ManifestListTools
        addCheckBox
        removeResourceButton
        adapter={vi.fn()}
        addWindow={vi.fn()}
        canvases={[]}
        manifestId="https://example.org/manifest.json"
        onDismissClick={vi.fn()}
        removeWindow={vi.fn()}
        t={(key) => key}
        updateWorkspaceMosaicLayout={vi.fn()}
      />,
    );
    expect(leakedAttributes(container)).toEqual([]);
    const style = getComputedStyle(container.firstChild);
    expect(style.display).toBe('flex');
    expect(style.flexDirection).toBe('column');
  });
});
