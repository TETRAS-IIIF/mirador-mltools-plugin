import Mirador from 'mirador';
import manifestlistPlugins from '../../src';
import LocalStorageAdapter from "./adapter/LocalStorageAdapter";

const config = {
  annotation:{
    adapter:(canvasId,projectId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`, projectId),
  },
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
  },
  projectId:1,
};

Mirador.viewer(config, [...manifestlistPlugins]);
