import plugin from '../src';
import ManifestListItem from '../src/components/ManifestListItem';

vi.mock('../src/containers/ManifestListTools', () => ({ default: () => null }));

describe('plugin export', () => {
  it('wraps Mirador ManifestListItem, with its translations', () => {
    expect(plugin).toHaveLength(1);
    expect(plugin[0]).toMatchObject({ component: ManifestListItem, mode: 'wrap', target: 'ManifestListItem' });
    expect(Object.keys(plugin[0].config.translations)).toEqual(expect.arrayContaining(['en', 'fr']));
  });
});
