import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManifestListTools from '../src/components/ManifestListTools';

/** Renders the tools with spies for every action. */
function renderTools(props = {}) {
  const deleteAnnotations = vi.fn();
  const handlers = {
    adapter: vi.fn(() => ({ delete: deleteAnnotations })),
    addWindow: vi.fn(),
    onDismissClick: vi.fn(),
    removeWindow: vi.fn(),
    updateWorkspaceMosaicLayout: vi.fn(),
  };
  render(
    <ManifestListTools
      addCheckBox
      canvases={[{ id: 'canvas-1' }, { id: 'canvas-2' }]}
      manifestId="https://example.org/manifest.json"
      projectId={7}
      removeResourceButton
      t={(key) => key}
      {...handlers}
      {...props}
    />,
  );
  return { ...handlers, deleteAnnotations };
}

describe('ManifestListTools', () => {
  it('shows the add-to-workspace and delete buttons when both are enabled', () => {
    renderTools();
    expect(screen.getByRole('button', { name: 'window_add' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'manifest_remove' })).toBeInTheDocument();
  });

  it('hides each button when its option is off', () => {
    renderTools({ addCheckBox: false, removeResourceButton: false });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('opens the manifest in a new window', async () => {
    const { addWindow } = renderTools();
    await userEvent.click(screen.getByRole('button', { name: 'window_add' }));
    expect(addWindow).toHaveBeenCalledWith({ manifestId: 'https://example.org/manifest.json' });
  });

  it('closes the windows showing the manifest when it is already open', async () => {
    const { removeWindow, updateWorkspaceMosaicLayout } = renderTools({ active: true, activeWindows: ['w1', 'w2'] });
    await userEvent.click(screen.getByRole('button', { name: 'window_remove' }));
    expect(removeWindow.mock.calls).toEqual([['w1'], ['w2']]);
    expect(updateWorkspaceMosaicLayout).toHaveBeenCalled();
  });

  it('deletes the annotations of every canvas, closes its windows and removes the manifest', async () => {
    const { adapter, deleteAnnotations, onDismissClick, removeWindow } = renderTools({ activeWindows: ['w1'] });
    await userEvent.click(screen.getByRole('button', { name: 'manifest_remove' }));
    expect(adapter.mock.calls).toEqual([
      ['canvas-1', 7],
      ['canvas-2', 7],
    ]);
    expect(deleteAnnotations).toHaveBeenCalledTimes(2);
    expect(removeWindow).toHaveBeenCalledWith('w1');
    expect(onDismissClick).toHaveBeenCalledWith('https://example.org/manifest.json');
  });
});
