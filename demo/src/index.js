import mirador from 'mirador/dist/es/src/index';
import manifestlistPlugins from '../../src';
import LocalStorageAdapter from "./adapter/LocalStorageAdapter";

const config = {
  adapter:(canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
    id: 'demo',
  catalog: [{
    manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
  }],
  windows: [{
      loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
  }],
  workspace: {
    isWorkspaceAddVisible: true,
    addCheckBox:true,
    removeResourceButton: true,
  }
};

mirador.viewer(config, [...manifestlistPlugins]);
