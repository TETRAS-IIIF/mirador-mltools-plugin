import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from 'mirador';
import {
  getWindowIds,
  getManifest,
  getWindowManifests,
  getCanvases,
} from 'mirador';
import ManifestListTools from '../components/ManifestListTools';

function mapStateToProps(state, { manifestId }) {
  const windowIds = getWindowIds(state);
  const activeWindowIds = [];

  windowIds.forEach((value) => {
    const manifest = getManifest(state, { windowId: value });
    if (manifest && manifest.id === manifestId) {
      activeWindowIds.push(value);
    }
  });

  return {
    active: getWindowManifests(state).includes(manifestId),
    activeWindows: activeWindowIds,
    adapter: state.config.annotation.adapter,
    addCheckBox: state.workspace.addCheckBox,
    canvases: getCanvases(state,{manifestId}),
    manifestId,
    projectId: state.config.projectId,
    removeResourceButton: state.workspace.removeResourceButton,
  };
}

const mapDispatchToProps = {
  addWindow: actions.addWindow,
  onDismissClick: actions.removeResource,
  removeWindow: actions.removeWindow,
  updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout,
};

const enhance = compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(ManifestListTools);
